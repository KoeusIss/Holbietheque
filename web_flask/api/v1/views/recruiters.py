""" Recruiters Views-API endpoints """

from web_flask.models.recruiter import Recruiter, RecruiterSchema
from web_flask.models.address import Address, AddressSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

recruiters_schema = RecruiterSchema(many=True)
recruiter_schema = RecruiterSchema()
address_schema = AddressSchema()


@app_views.route(
    '/recruiters',
    methods=['GET'],
    strict_slashes=False
)
def get_recruiters():
    """ GET /api/v1/students """
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
    address = address_schema.dump(the_recruiter.address)
    if not the_recruiter:
        return {
            "success": False,
            "message": "Recruiter not found"
        }, 400
    recruiter = recruiter_schema.dump(the_recruiter)
    return {
        "success": True,
        "address": address,
        "recruiter": recruiter
    }


@app_views.route(
    '/recruiters',
    methods=['POST'],
    strict_slashes=False
)
def create_recruiter():
    """ POST /api/v1/recruiters """
    if not request.get_json():
        return {
            "failed": True,
            "message": "Not a json"
        }, 400
    data = request.get_json()
    the_recruiter = Recruiter(**data)
    try:
        the_recruiter.save()
        recruiter = recruiter_schema.dump(the_recruiter)
        return {
            "success": True,
            "message": "Recruiter created successfully",
            "recruiter": recruiter
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_recruiter.rollback()
        return {
           "success": False,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/recruiters/<recruiter_id>/address',
    methods=['POST'],
    strict_slashes=False
)
def add_recruiters_address(recruiter_id):
    """ POST /api/v1/recruiters/:recruiter_id/address """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not the_recruiter:
        return {
            "success": False,
            "message": "Recruiter not found"
        }, 400
    if not request.get_json():
        return {
            "success": False,
            "message": "not a json"
        }, 400
    data = request.get_json()
    the_address = Address(**data)
    setattr(the_recruiter, "address_id", the_address.id)
    try:
        the_address.save()
        the_recruiter.save()
        return {
            "success": True,
            "message": "Address added successfully"
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_recruiter.rollback()
        return {
           "success": False,
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
    ignore = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_recruiter, key, value)
    storage.save()
    recruiter = recruiter_schema.dump(the_recruiter)
    return {
        "success": True,
        "message": "Recruiter updated successfully"
    }, 200


@app_views.route(
    '/recruiters/<recruiter_id>/address',
    methods=['PUT'],
    strict_slashes=False
)
def update_recruiter_address(recruiter_id):
    """ PUT /api/v1/recruiters/:recruiter_id/address """
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
    ignore = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    the_address = the_recruiter.address
    for key, value in data.items():
        if key not in ignore:
            setattr(the_address, key, value)
    storage.save()
    return {
        "success": True,
        "message": "Address updated successfully"
    }, 200
