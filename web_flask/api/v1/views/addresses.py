""" Addresses Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.address import Address, AddressSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

address_schema = AddressSchema()


@app_views.route(
    '/<student_id>/address',
    methods=['POST'],
    strict_slashes=False
)
def create_address(student_id):
    """ POST /api/v1/:student_id/address """
    the_student = storage.get(Student, student_id)
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    if not the_student:
        return {
            "failed": True,
            "message": "unrecognized student"
        }, 400
    data = request.get_json()
    the_address = Address(**data)
    try:
        the_address.student_id = the_student.id
        the_address.save()
        address = address_schema.dump(the_address)
        return {
            "success": True,
            "message": "created successfully",
            "address": address
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_address.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/students/<student_id>/address',
    methods=['PUT'],
    strict_slashes=False
)
def update_address(student_id):
    """ PUT /api/v1/students/:student_id/address """
    the_student = storage.get(Student, student_id)
    if not the_student:
        return {
           "failed": True,
           "message": "data not found"
        }, 400
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    the_address = the_student.address
    if not the_address:
        return {
           "failed": True,
           "message": "data not found"
        }, 400
    ignore = ['id', 'created_at', 'updated_at', 'student_id']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_address, key, value)
    storage.save()
    address = address_schema.dump(the_address)
    return {
        "success": True,
        "message": "updated successfully",
        "address": address
    }, 200
