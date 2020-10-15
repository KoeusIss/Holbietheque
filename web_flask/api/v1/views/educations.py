""" Educations Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.education import Education, EducationSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

education_schema = EducationSchema()


@app_views.route(
    '/<student_id>/educations',
    methods=['POST'],
    strict_slashes=False
)
def create_education(student_id):
    """ POST /api/v1/students/:student_id/educations """
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
    the_education = Education(**data)
    try:
        the_education.student_id = the_student.id
        the_education.save()
        education = education_schema.dump(the_education)
        return {
            "success": True,
            "message": "created successfully",
            "education": education
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_education.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/educations/<education_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_education(education_id):
    """ PUT /api/v1/educations/:education_id """
    the_education = storage.get(Education, education_id)
    if not the_education:
        return {
           "failed": True,
           "message": "data not found"
        }, 400
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    ignore = ['id', 'created_at', 'updated_at', 'student_id']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_education, key, value)
    storage.save()
    education = education_schema.dump(the_education)
    return {
        "success": True,
        "message": "updated successfully",
        "education": education
    }, 200
