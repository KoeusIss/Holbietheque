""" Specializations Views-API endpoints """

from web_flask.models.specialization import Specialization, SpecializationSchema
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

specialization_schema = SpecializationSchema()


@app_views.route(
    '/specializations',
    methods=['POST'],
    strict_slashes=False
)
def create_spec():
    """ POST /api/v1/specializations """
    if not request.get_json():
        return {"message": "not a json"}, 400
    data = request.get_json()
    the_specialization = Specialization(**data)
    try:
        the_specialization.save()
        specialization = specialization_schema.dump(the_specialization)
        return {
            "success": True,
            "message": "created successfully",
            "specialization": specialization
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_specialization.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400
