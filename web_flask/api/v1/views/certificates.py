""" Certificates Views-API endpoints """

from web_flask.models.student import Student
from web_flask.models.certificate import Certificate, CertificateSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

certificate_schema = CertificateSchema()
certificates_schema = CertificateSchema(many=True)


@app_views.route(
    '/<student_id>/certificates',
    methods=['GET'],
    strict_slashes=False
)
def get_user_certificates(student_id):
    """ POST /api/v1/:student_id/certificates """
    the_student = storage.get(Student, student_id)
    if not the_student:
        return {
            "failed": True,
            "message": "Unrecognized student"
        }, 400
    certificates = certificates_schema.dump(the_student.certificates)
    return {
        "success": True,
        "count": len(the_student.certificates),
        "certificates": certificates
    }, 201


@app_views.route(
    '/<student_id>/certificates',
    methods=['POST'],
    strict_slashes=False
)
def create_certificate(student_id):
    """ POST /api/v1/students/:student_id/certificates """
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
    the_certificate = Certificate(**data)
    try:
        the_certificate.student_id = the_student.id
        the_certificate.save()
        certificate = certificate_schema.dump(the_certificate)
        return {
            "success": True,
            "message": "created successfully",
            "certificate": certificate
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_certificate.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/certificates/<certificate_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_certificate(certificate_id):
    """ PUT /api/v1/certificates/:certificate_id """
    the_certificate = storage.get(Certificate, certificate_id)
    if not the_certificate:
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
            setattr(the_certificate, key, value)
    storage.save()
    certificate = certificate_schema.dump(the_certificate)
    return {
        "success": True,
        "message": "updated successfully",
        "certificate": certificate
    }, 200
