""" Recruiters Views-API endpoints """

from web_flask.models.recruiter import Recruiter, RecruiterSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *
from web_flask.api.v1.app import jwt
from flask_jwt_extended import (
    jwt_required, create_access_token,
    get_jwt_identity, get_jwt_claims, verify_jwt_in_request
)

recruiters_schema = RecruiterSchema(many=True)
recruiter_schema = RecruiterSchema()


@app_views.route(
    '/recruiters',
    methods=['GET'],
    strict_slashes=False
)
def get_recruiters():
    """ GET /api/v1/recruiters """
    all_recruiters = storage.all(Recruiter).values()
    recruiters = recruiters_schema.dump(all_recruiters)
    return {
        "success": True,
        "recruiters": recruiters
    }


@app_views.route(
    '/recruiters/<recruiter_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_recruiter(recruiter_id):
    """ GET /api/v1/recruiters/:recruiter_id """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not the_recruiter:
        return {
            "success": False,
            "message": "Recruiter not found"
        }, 400
    recruiter = recruiter_schema.dump(the_recruiter)
    return {
        "success": True,
        "recruiter": recruiter
    }


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {
        'role': user['role'],
        'profile': user['profile']
    }


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user['id']


@app_views.route(
    '/recruiters',
    methods=['POST'],
    strict_slashes=False
)
def create_recruiter():
    """ POST /api/v1/recruiters """
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json"
        }, 400
    data = request.get_json()
    the_recruiter = Recruiter(**data)
    try:
        the_recruiter.save()
        recruiter = recruiter_schema.dump(the_recruiter)
        user = {"id": the_recruiter.user.id, "role": "recruiter", "profile": the_recruiter.id}
        return {
            "success": True,
            "message": "Recruiter created successfully",
            "student": recruiter,
            "access_token": create_access_token(identity=user)
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_recruiter.rollback()
        return {
            "failed": True,
            "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/recruiters/<recruiter_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_recruiter(recruiter_id):
    """ DELETE /api/v1/recruiters/:recruiter_id """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not the_recruiter:
        return {
           "success": False,
           "message": "Recruiter not found"
        }, 400
    storage.delete(the_recruiter)
    storage.save()
    return {
        "success": True,
        "message": "deleted successfully"
    }, 200


@app_views.route(
    '/recruiters/<recruiter_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_recruiter(recruiter_id):
    """ PUT /api/v1/recruiters/:recruiter_id """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not the_recruiter:
        return {
           "success": False,
           "message": "Recruiter not found"
        }, 400
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json"
        }, 400
    ignore = ['id', 'created_at', 'updated_at', 'user_id']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_recruiter, key, value)
    storage.save()
    return {
        "success": True,
        "message": "Recruiter updated successfully"
    }, 200
