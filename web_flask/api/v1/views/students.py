""" Students Views-API endpoints """

from web_flask.models.student import Student, StudentSchema, AddressSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import abort, make_response, request, jsonify
from sqlalchemy.exc import *


@app_views.route(
    '/students',
    methods=['GET'],
    strict_slashes=False
)
def get_students():
    """ GET /api/v1/students """
    all_students = storage.all(Student).values()
    students_schema = StudentSchema(
        many=True,
        only=["id", "first_name", "last_name"]
    )
    students = students_schema.dump(all_students)
    return {"students": students}


@app_views.route(
    '/students/<student_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_student(student_id):
    """ GET /api/v1/students/:student_id """
    student_schema = StudentSchema()
    the_student = storage.get(Student, student_id)
    if not the_student:
        abort(404)
    student = student_schema.dump(the_student)
    return jsonify({"student": student})


@app_views.route(
    '/students',
    methods=['POST'],
    strict_slashes=False
)
def create_student():
    """ POST /api/v1/students """
    if not request.get_json():
        make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'first_name' not in request.get_json():
        make_response(jsonify({"error": "Missing first name"}), 400)
    if 'last_name' not in request.get_json():
        make_response(jsonify({"error": "Missing last name"}), 400)
    if 'id_number' not in request.get_json():
        make_response(jsonify({"error": "Missing id number"}), 400)

    data = request.get_json()
    instance = Student(**data)
    try:
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    except (IntegrityError, OperationalError) as error:
        instance.rollback()
        return make_response(jsonify({"error": error.orig.args[1]}), 400)


@app_views.route(
    '/students/<student_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_student(student_id):
    """ DELETE /api/v1/students/:student_id """
    country = storage.get(Student, student_id)

    if not country:
        abort(404)

    storage.delete(country)
    storage.save()

    return make_response(jsonify({"message": "deleted successfully"}), 200)


@app_views.route(
    '/students/<student_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_student(student_id):
    """ PUT /api/v1/students/:student_id """
    student = storage.get(Student, student_id)

    if not student:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(student, key, value)
    storage.save()
    return make_response(jsonify(student.to_dict()), 200)
