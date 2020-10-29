""" Social Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.skill import Skill, SkillSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import IntegrityError, OperationalError

skills_schema = SkillSchema()


@app_views.route(
    '/<student_id>/skills',
    methods=['POST'],
    strict_slashes=False
)
def create_skill(student_id):
    """ POST /api/v1/:student_id/skills """
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
    the_skill = Skill(**data)
    try:
        the_skill.student_id = the_student.id
        the_skill.save()
        skill = skills_schema.dump(the_skill)
        return {
            "success": True,
            "message": "created successfully",
            "skill": skill
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_skill.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/skill/<skill_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_skill(skill_id):
    """ PUT /api/v1/skills/:skill_id """
    the_skill = storage.get(Skill, skill_id)
    if not the_skill:
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
            setattr(the_skill, key, value)
    storage.save()
    skill = skills_schema.dump(the_skill)
    return {
        "success": True,
        "message": "updated successfully",
        "skill": skill
    }, 200
