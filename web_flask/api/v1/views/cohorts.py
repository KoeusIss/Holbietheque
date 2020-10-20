""" Cohorts Views-API endpoints """

from web_flask.models.cohort import Cohort, CohortSchema
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

cohort_schema = CohortSchema()


@app_views.route(
    '/cohorts',
    methods=['POST'],
    strict_slashes=False
)
def create_cohort():
    """ POST /api/v1/cohorts """
    if not request.get_json():
        return {"message": "not a json"}, 400
    data = request.get_json()
    the_cohort = Cohort(**data)
    try:
        the_cohort.save()
        cohort = cohort_schema.dump(the_cohort)
        return {
            "success": True,
            "message": "created successfully",
            "cohort": cohort
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_cohort.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400
