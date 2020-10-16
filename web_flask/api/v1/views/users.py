""" Students Views-API endpoints """

from web_flask.models.user import User, UserSchema
from web_flask.api.v1.app import jwt
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import (IntegrityError, OperationalError)
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, get_jwt_claims
)

users_schema = UserSchema(many=True)
user_schema = UserSchema()


@app_views.route(
    '/users',
    methods=['GET'],
    strict_slashes=False
)
@jwt_required
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
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    data = request.get_json()
    the_user = User(**data)
    try:
        the_user.save()
        user = user_schema.dump(the_user)
        return {
            "success": True,
            "message": "signup successfully",
            "user": user
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_user.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


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
    the_user = storage.get_user_by_email(data.get("email", None))
    if the_user and the_user.password == data.get("password"):
        user = {"id": the_user.id, "role": the_user.role}
        return {
            "success": True,
            "message": "login successfully",
            "access_token": create_access_token(identity=user)
        }, 200
    else:
        return {
            "failed": True,
            "message": "login failed"
        }, 401
