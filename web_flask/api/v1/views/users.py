""" Students Views-API endpoints """

import datetime
from web_flask.models.user import User, UserSchema
from web_flask.api.v1.app import jwt
from web_flask.api.v1.app import mail
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from flask_mail import *
from random import *
from sqlalchemy.exc import (IntegrityError, OperationalError)
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, get_jwt_claims, verify_jwt_in_request
)
from functools import wraps
from hashlib import md5

users_schema = UserSchema(many=True)
user_schema = UserSchema()


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if claims['role'] != 'admin':
            return {
                       "failed": True,
                       "message": "admin only"
                   }, 403
        else:
            return fn(*args, **kwargs)

    return wrapper


@app_views.route(
    '/users',
    methods=['GET'],
    strict_slashes=False
)
@admin_required
def get_users():
    """ GET /api/v1/users """
    all_users = storage.all(User).values()
    users = users_schema.dump(all_users)
    return {
        "success": True,
        "message": "data found",
        "users": users
    }


@app_views.route(
    '/users/<user_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_user(user_id):
    """ GET /api/v1/users/:user_id """
    the_user = storage.get(User, user_id)
    if not the_user:
        return {
                   "failed": True,
                   "message": "data not found"
               }, 400
    user = user_schema.dump(the_user)
    return {
        "success": True,
        "message": "data found",
        "user": user
    }


@app_views.route(
    '/signup',
    methods=['POST'],
    strict_slashes=False
)
def signup_user():
    """ POST /api/v1/signup """
    if not request.get_json():
        return {"message": "not a json"}, 400
    data = request.get_json()
    otp = randint(000000, 999999)
    data['otp'] = str(otp)
    data['otp_expired_at'] = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    the_user = User(**data)
    try:
        msg = Message(
            'Mail confirmation from holbie.tech',
            sender='no_reply@holbie.tech',
            recipients=the_user.email.split()
        )
        msg.body = str(otp)
        mail.send(msg)
        the_user.save()
        return {"message": "Signup Successful", "id": the_user.id}, 201
    except (IntegrityError, OperationalError) as error:
        the_user.rollback()
        return {"message": error.orig.args[1]}, 400


@app_views.route(
    '/verification',
    methods=['POST'],
    strict_slashes=False
)
def verify_mail():
    """ POST /api/v1/verifcation """
    if not request.get_json():
        return {"message": "not a json"}, 400
    data = request.get_json()
    if not data['id']:
        return {"message": "Account verification failed"}, 400
    the_user = storage.get(User, data['id'])
    if not the_user:
        return {"message": "Unrecognized user id"}, 400
    if the_user.otp == data['otp'] and the_user.otp_expired_at > datetime.datetime.utcnow():
        setattr(the_user, 'active', True)
        storage.save()
        return {"message": "Account activated successfully"}, 200
    else:
        return {"message": "Code has expired"}, 400


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {
        'role': user['role']
    }


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user['id']


@app_views.route(
    '/login',
    methods=['POST'],
    strict_slashes=False
)
def login_user():
    """ POST /api/v1/login """
    if not request.get_json():
        return {
                   "failed": True,
                   "message": "not a json"
               }, 400
    data = request.get_json()
    hashed = md5(data.get("password").encode()).hexdigest()
    the_user = storage.get_user_by_email(data.get("email", None))
    if the_user and the_user.password == hashed:
        user = {"id": the_user.id, "role": the_user.role}
        return {
                   "success": True,
                   "message": "Login Successful",
                   "access_token": create_access_token(identity=user)
               }, 200
    else:
        return {
                   "failed": True,
                   "message": "Login Failed"
               }, 401
