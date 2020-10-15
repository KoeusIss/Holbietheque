""" Students Views-API endpoints """

from web_flask.models.student import Student, StudentSchema, AddressSchema
from web_flask.models.certificate import CertificateSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

students_schema = StudentSchema(many=True)
student_schema = StudentSchema()
address_schema = AddressSchema()
certificates_schema = CertificateSchema(many=True, only=["name"])


@app_views.route(
    '/students',
    methods=['GET'],
    strict_slashes=False
)
def get_students():
    """ GET /api/v1/students """
    all_students = storage.all(Student).values()
    students = students_schema.dump(all_students)
    return {
        "success": True,
        "message": "data found",
        "students": students
    }


@app_views.route(
    '/students/<student_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_student(student_id):
    """ GET /api/v1/students/:student_id """
    the_student = storage.get(Student, student_id)
    if not the_student:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    student = student_schema.dump(the_student)
    return {
        "success": True,
        "message": "data found",
        "student": student
    }


@app_views.route(
    '/students',
    methods=['POST'],
    strict_slashes=False
)
def create_student():
    """ POST /api/v1/students """
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    data = request.get_json()
    the_student = Student(**data)
    try:
        the_student.save()
        student = student_schema.dump(the_student)
        return {
            "success": True,
            "message": "created successfully",
            "student": student
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_student.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/students/<student_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_student(student_id):
    """ DELETE /api/v1/students/:student_id """
    the_student = storage.get(Student, student_id)
    if not the_student:
        return {
           "failed": True,
           "message": "data not found"
        }, 400
    storage.delete(the_student)
    storage.save()
    return {
        "success": True,
        "message": "deleted successfully"
    }, 200


@app_views.route(
    '/students/<student_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_student(student_id):
    """ PUT /api/v1/students/:student_id """
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
    ignore = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_student, key, value)
    storage.save()
    student = student_schema.dump(the_student)
    return {
        "success": True,
        "message": "updated successfully",
        "student": student
    }, 200
