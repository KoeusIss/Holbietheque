""" Social Views-API endpoints """

from web_flask.models.recruiter import Recruiter
from web_flask.models.stack import Stack
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request


@app_views.route(
    '/<recruiter_id>/stacks',
    methods=['POST'],
    strict_slashes=False
)
def create_stacks(recruiter_id):
    """ POST /api/v1/:recruiter_id/stacks """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json"
        }, 400
    if not the_recruiter:
        return {
            "success": False,
            "message": "Recruiter not found"
        }, 400
    data = request.get_json()
    for each in data.stacks:
        instance = Stack(**each)
        instance.recruiter_id = instance.id
        instance.save()
    return {
        "success": True,
        "message": "Stacks added successfully",
    }, 201

#
# @app_views.route(
#     '/skill/<skill_id>',
#     methods=['PUT'],
#     strict_slashes=False
# )
# def update_skill(skill_id):
#     """ PUT /api/v1/skills/:skill_id """
#     the_skill = storage.get(Skill, skill_id)
#     if not the_skill:
#         return {
#            "failed": True,
#            "message": "data not found"
#         }, 400
#     if not request.get_json():
#         return {
#             "failed": True,
#             "message": "not a json"
#         }, 400
#     ignore = ['id', 'created_at', 'updated_at', 'student_id']
#     data = request.get_json()
#     for key, value in data.items():
#         if key not in ignore:
#             setattr(the_skill, key, value)
#     storage.save()
#     skill = skills_schema.dump(the_skill)
#     return {
#         "success": True,
#         "message": "updated successfully",
#         "skill": skill
#     }, 200
