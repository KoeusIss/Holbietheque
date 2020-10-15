""" Social Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.social import Social, SocialSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import IntegrityError, OperationalError

social_schema = SocialSchema()


@app_views.route(
    '/<student_id>/socials',
    methods=['POST'],
    strict_slashes=False
)
def create_social(student_id):
    """ POST /api/v1/:student_id/socials """
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
    the_social = Social(**data)
    try:
        the_social.student_id = the_student.id
        the_social.save()
        social = social_schema.dump(the_social)
        return {
            "success": True,
            "message": "created successfully",
            "social": social
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_social.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/social/<social_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_social(social_id):
    """ PUT /api/v1/socials/:social_id """
    the_social = storage.get(Social, social_id)
    if not the_social:
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
            setattr(the_social, key, value)
    storage.save()
    social = social_schema.dump(the_social)
    return {
        "success": True,
        "message": "updated successfully",
        "social": social
    }, 200
