""" Social Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.language import Language, LanguageSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import IntegrityError, OperationalError

language_schema = LanguageSchema()


@app_views.route(
    '/<student_id>/languages',
    methods=['POST'],
    strict_slashes=False
)
def create_language(student_id):
    """ POST /api/v1/:student_id/languages """
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
    the_language = Language(**data)
    try:
        the_language.student_id = the_student.id
        the_language.save()
        language = language_schema.dump(the_language)
        return {
            "success": True,
            "message": "created successfully",
            "language": language
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_language.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/language/<language_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_language(language_id):
    """ PUT /api/v1/languages/:language_id """
    the_language = storage.get(Language, language_id)
    if not the_language:
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
            setattr(the_language, key, value)
    storage.save()
    language = language_schema.dump(the_language)
    return {
        "success": True,
        "message": "updated successfully",
        "language": language
    }, 200
