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
            "success": False,
            "message": "Student not found"
        }, 400
    certificates = certificates_schema.dump(the_student.certificates)
    return {
        "success": True,
        "count": len(the_student.certificates),
        "certificates": certificates
    }, 201


@app_views.route(
    '/certificates/<certificate_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_certificate(certificate_id):
    """ GET /api/v1/projects/:project_id """
    the_certificate = storage.get(Certificate, certificate_id)
    if not the_certificate:
        return {
            "success": False,
            "message": "Certificate not found"
        }, 400
    certificate = certificate_schema.dump(the_certificate)
    return {
        "success": True,
        "certificate": certificate
    }, 201


@app_views.route(
    '/<student_id>/certificates',
    methods=['POST'],
    strict_slashes=False
)
def create_certificate(student_id):
    """ POST /api/v1/:student_id/certificates """
    the_student = storage.get(Student, student_id)
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json request"
        }, 400
    if not the_student:
        return {
            "success": False,
            "message": "Student not found"
        }, 400
    data = request.get_json()
    the_certificate = Certificate(**data)
    try:
        the_certificate.student_id = the_student.id
        the_certificate.save()
        certificate = certificate_schema.dump(the_certificate)
        return {
            "success": True,
            "message": "Certificate created successfully"
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_certificate.rollback()
        return {
           "success": False,
           "message": "Something goes wrong with provided data"
        }, 400


@app_views.route(
    '/certificates/<certificate_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_certificate(certificate_id):
    """ PUT /api/v1/certificates/:certificate_id """
    the_certificate = storage.get(Certificate, certificate_id)
    if not request.get_json():
        return {
            "success": False,
            "message": "Not a json request"
        }, 400
    if not the_certificate:
        return {
           "success": False,
           "message": "Certificate not found"
        }, 400
    ignore = ['id', 'created_at', 'updated_at', 'student_id']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_certificate, key, value)
    storage.save()
    return {
        "success": True,
        "message": "Certificate updated successfully"
    }, 200


@app_views.route(
    '/projects/<certificate_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_certificate(certificate_id):
    """ DELETE /api/v1/certificates/:certificate_id """
    the_certificate = storage.get(Certificate, certificate_id)
    if not certificate_id:
        return {
           "success": False,
           "message": "Certificate not found"
        }, 400
    storage.delete(the_certificate)
    storage.save()
    return {
        "success": True,
        "message": "Certificate deleted successfully"
    }, 200
