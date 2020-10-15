""" Projects Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.project import Project, ProjectSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

project_schema = ProjectSchema()


@app_views.route(
    '/<student_id>/projects',
    methods=['POST'],
    strict_slashes=False
)
def create_certificate(student_id):
    """ POST /api/v1/students/:student_id/projects """
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
    the_project = Project(**data)
    try:
        the_project.student_id = the_student.id
        the_project.save()
        experience = project_schema.dump(the_project)
        return {
            "success": True,
            "message": "created successfully",
            "experience": experience
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_project.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/projects/<project_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_certificate(project_id):
    """ PUT /api/v1/projects/:project_id """
    the_project = storage.get(Project, project_id)
    if not the_project:
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
            setattr(the_project, key, value)
    storage.save()
    project = project_schema.dump(the_project)
    return {
        "success": True,
        "message": "updated successfully",
        "project": project
    }, 200
