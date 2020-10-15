""" Experiences Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.experience import Experience, ExperienceSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

experience_schema = ExperienceSchema()


@app_views.route(
    '/<student_id>/experiences',
    methods=['POST'],
    strict_slashes=False
)
def create_experience(student_id):
    """ POST /api/v1/students/:student_id/experiences """
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
    the_experience = Experience(**data)
    try:
        the_experience.student_id = the_student.id
        the_experience.save()
        experience = experience_schema.dump(the_experience)
        return {
            "success": True,
            "message": "created successfully",
            "experience": experience
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_experience.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/experiences/<experience_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_experience(experience_id):
    """ PUT /api/v1/experiences/:experience_id """
    the_experience = storage.get(Experience, experience_id)
    if not the_experience:
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
            setattr(the_experience, key, value)
    storage.save()
    experience = experience_schema.dump(the_experience)
    return {
        "success": True,
        "message": "updated successfully",
        "experience": experience
    }, 200
