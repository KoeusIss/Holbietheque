""" Experiences Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.experience import Experience, ExperienceSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

experience_schema = ExperienceSchema()
experiences_schema = ExperienceSchema(many=True)


@app_views.route(
    '/<student_id>/experiences',
    methods=['GET'],
    strict_slashes=False
)
def get_user_experience(student_id):
    """ POST /api/v1/:student_id/experiences """
    the_student = storage.get(Student, student_id)
    if not the_student:
        return {
                   "success": False,
                   "message": "Index not found"
               }, 400
    experiences = experiences_schema.dump(the_student.experiences)
    return {
               "success": True,
               "count": len(the_student.experiences),
               "experiences": experiences
           }, 201


@app_views.route(
    '/experiences/<experience_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_experience(experience_id):
    """ GET /api/v1/projects/:project_id """
    the_experience = storage.get(Experience, experience_id)
    if not the_experience:
        return {
                   "success": False,
                   "message": "Experience not found"
               }, 400
    experiences = experience_schema.dump(the_experience)
    return {
               "success": True,
               "experiences": experiences
           }, 201


@app_views.route(
    '/<student_id>/experiences',
    methods=['POST'],
    strict_slashes=False
)
def create_experience(student_id):
    """ POST /api/v1/:student_id/experiences """
    the_student = storage.get(Student, student_id)
    if not request.get_json():
        return {
                   "success": False,
                   "message": "Not a json request"
               }, 400
    if not the_student:
        return {
                   "success": False,
                   "message": "Index not found"
               }, 400
    data = request.get_json()
    the_experience = Experience(**data)
    try:
        the_experience.student_id = the_student.id
        the_experience.save()
        return {
                   "success": True,
                   "message": "Experience created successfully"
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
    if not request.get_json():
        return {
                   "success": False,
                   "message": "Not a json request"
               }, 400
    if not the_experience:
        return {
                   "success": False,
                   "message": "Experience not found"
               }, 400

    ignore = ['id', 'created_at', 'updated_at', 'student_id']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_experience, key, value)
    storage.save()
    return {
               "success": True,
               "message": "Experience updated successfully"
           }, 200


@app_views.route(
    '/experiences/<experience_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_experience(experience_id):
    """ DELETE /api/v1/experiences/:experience_id """
    the_experience = storage.get(Experience, experience_id)
    if not the_experience:
        return {
                   "success": False,
                   "message": "Experience not found"
               }, 400
    storage.delete(the_experience)
    storage.save()
    return {
               "success": True,
               "message": "Experience deleted successfully"
           }, 200
