""" Job Views-API endpoints """

from web_flask.models.recruiter import Recruiter, RecruiterSchema
from web_flask.models.job import Job, JobSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import IntegrityError, OperationalError

jobs_schema = JobSchema(many=True)
job_schema = JobSchema()
recruiter_schema = RecruiterSchema(only=["id", "name", "logo"])


@app_views.route(
    '/<recruiter_id>/jobs',
    methods=['POST'],
    strict_slashes=False
)
def create_job(recruiter_id):
    """ POST /api/v1/:recruiter_id/jobs """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json request"
        }, 400
    if not the_recruiter:
        return {
            "success": False,
            "message": "Recruiter not found"
        }, 400
    data = request.get_json()
    the_job = Job(**data)
    try:
        the_job.recruiter_id = the_recruiter.id
        the_job.save()
        return {
            "success": True,
            "message": "Job created successfully",
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_job.rollback()
        return {
           "success": False,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/jobs',
    methods=['GET'],
    strict_slashes=False
)
def get_all_jobs():
    """ GET /api/v1/jobs """
    all_jobs = storage.all(Job).values()
    jobs = jobs_schema.dump(all_jobs)
    return {
        "success": True,
        "jobs": jobs
    }, 200


@app_views.route(
    '/jobs/<job_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_job(job_id):
    """ GET /api/v1/jobs/:job_id """
    the_job = storage.get(Job, job_id)
    job = job_schema.dump(the_job)
    recruiter = recruiter_schema.dump(the_job.recruiter)
    return {
        "success": True,
        "job": job,
        "recruiter": recruiter
    }, 200


@app_views.route(
    '/<recruiter_id>/jobs',
    methods=['GET'],
    strict_slashes=False
)
def get_jobs(recruiter_id):
    """ GET /api/v1/jobs """
    the_recruiter = storage.get(Recruiter, recruiter_id)
    if not the_recruiter:
        return {
            "success": False,
            "message": "Recruiter not found"
        }, 400
    jobs = jobs_schema.dump(the_recruiter.jobs)
    return {
        "success": True,
        "recruiter": the_recruiter.id,
        "jobs": jobs
    }, 200
