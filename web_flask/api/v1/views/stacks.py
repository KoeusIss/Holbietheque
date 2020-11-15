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
    for each in data:
        instance = Stack(**each)
        instance.recruiter_id = the_recruiter.id
        instance.save()
    return {
        "success": True,
        "message": "Stacks added successfully",
    }, 201
