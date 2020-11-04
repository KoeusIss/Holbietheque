""" Projects Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.project import Project, ProjectSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)


@app_views.route(
    '/<student_id>/projects',
    methods=['GET'],
    strict_slashes=False
)
def get_student_projects(student_id):
    """ POST /api/v1/:student_id/projects """
    the_student = storage.get(Student, student_id)
    if not the_student:
        return {
            "success": False,
            "message": "Index not found"
        }, 400
    projects = projects_schema.dump(the_student.projects)
    return {
        "success": True,
        "count": len(the_student.projects),
        "projects": projects
    }, 201


@app_views.route(
    '/projects/<project_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_project(project_id):
    """ GET /api/v1/projects/:project_id """
    the_project = storage.get(Project, project_id)
    if not the_project:
        return {
            "success": False,
            "message": "Project not found"
        }, 400
    project = project_schema.dump(the_project)
    return {
        "success": True,
        "project": project
    }, 201


@app_views.route(
    '/<student_id>/projects',
    methods=['POST'],
    strict_slashes=False
)
def add_student_project(student_id):
    """ POST /api/v1/:student_id/projects """
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
    the_project = Project(**data)
    try:
        the_project.student_id = the_student.id
        the_project.save()
        return {
            "success": True,
            "message": "Project added successfully"
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_project.rollback()
        return {
           "success": False,
           "message": "Something goes wrong with provided data"
        }, 400


@app_views.route(
    '/projects/<project_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_project(project_id):
    """ PUT /api/v1/projects/:project_id """
    the_project = storage.get(Project, project_id)
    if not the_project:
        return {
           "success": False,
           "message": "Project not found"
        }, 400
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json request"
        }, 400
    ignore = ['id', 'created_at', 'updated_at', 'student_id']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_project, key, value)
    storage.save()
    return {
        "success": True,
        "message": "Project updated successfully"
    }, 200


@app_views.route(
    '/projects/<project_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_project(project_id):
    """ DELETE /api/v1/projects/:project_id """
    the_project = storage.get(Project, project_id)
    if not project_id:
        return {
           "success": False,
           "message": "Project not found"
        }, 400
    storage.delete(the_project)
    storage.save()
    return {
        "success": True,
        "message": "Project deleted successfully"
    }, 200
