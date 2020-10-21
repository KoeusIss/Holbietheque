""" Students Views-API endpoints """

from web_flask.models.student import Student, StudentSchema
from web_flask.models.address import Address, AddressSchema
from web_flask.models.certificate import CertificateSchema
from web_flask.models.education import EducationSchema
from web_flask.models.experience import ExperienceSchema
from web_flask.models.project import ProjectSchema
from web_flask.models.user import User, UserSchema
from web_flask.models.social import SocialSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

students_schema = StudentSchema(many=True)
student_schema = StudentSchema()
address_schema = AddressSchema()
certificates_schema = CertificateSchema(many=True)
educations_schema = EducationSchema(many=True)
experiences_schema = ExperienceSchema(many=True)
projects_schema = ProjectSchema(many=True)
social_schema = SocialSchema()
user_schema = UserSchema(only=['id', 'email'])


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
    address = address_schema.dump(the_student.address)
    certificates = certificates_schema.dump(the_student.certificates)
    educations = educations_schema.dump(the_student.educations)
    experiences = experiences_schema.dump(the_student.experiences)
    projects = projects_schema.dump(the_student.projects)
    social = social_schema.dump(the_student.social)
    user = user_schema.dump(the_student.user)
    if not the_student:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    student = student_schema.dump(the_student)
    return {
        "success": True,
        "message": "data found",
        "student": student,
        "address": address,
        "certificates": certificates,
        "education": educations,
        "experiences": experiences,
        "projects": projects,
        "social": social,
        "user": user
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
            "success": False,
            "message": "Not a json"
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
    '/students/<student_id>/address',
    methods=['POST'],
    strict_slashes=False
)
def add_student_address(student_id):
    """ POST /api/v1/students/:student_id/address """
    the_student = storage.get(Student, student_id)
    if not the_student:
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
    setattr(the_student, "address_id", the_address.id)
    try:
        the_address.save()
        the_student.save()
        return {
            "success": True,
            "message": "Address added successfully"
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_student.rollback()
        return {
           "success": False,
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


@app_views.route(
    '/students/<student_id>/address',
    methods=['PUT'],
    strict_slashes=False
)
def update_student_address(student_id):
    """ PUT /api/v1/students/:student_id/address """
    the_student = storage.get(Student, student_id)
    if not the_student:
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
    the_address = the_student.address
    for key, value in data.items():
        if key not in ignore:
            setattr(the_address, key, value)
    storage.save()
    return {
        "success": True,
        "message": "Address updated successfully"
    }, 200
