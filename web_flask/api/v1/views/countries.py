""" Countries Views-API endpoints """

from web_flask.models.country import Country
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import abort, make_response, request, jsonify
from sqlalchemy.exc import *


@app_views.route(
    '/countries',
    methods=['GET'],
    strict_slashes=False
)
def get_countries():
    """ GET /api/v1/countries """
    all_countries = storage.all(Country).values()
    list_countries = []
    for country in all_countries:
        list_countries.append(country.to_dict())
    return jsonify(list_countries)


@app_views.route(
    '/countries/<country_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_country(country_id):
    """ GET /api/v1/countries/:country_id """
    the_country = storage.get(Country, country_id)
    if not the_country:
        abort(404)
    return jsonify(the_country.to_dict())


@app_views.route(
    '/countries',
    methods=['POST'],
    strict_slashes=False
)
def create_country():
    """ POST /api/v1/countries """
    if not request.get_json():
        return make_response(jsonify({"error": "Not a JSON"}), 400)
    if 'iso' not in request.get_json():
        return make_response(jsonify({"error": "Missing iso"}), 400)
    if 'name' not in request.get_json():
        return make_response(jsonify({"error": "Missing name"}), 400)
    if 'phone_code' not in request.get_json():
        return make_response(jsonify({"error": "Missing phone code"}), 400)

    data = request.get_json()
    instance = Country(**data)
    try:
        instance.save()
        return make_response(jsonify(instance.to_dict()), 201)
    except (IntegrityError, OperationalError) as error:
        instance.rollback()
        return make_response(jsonify({"error": error.orig.args[1]}), 400)


@app_views.route(
    '/countries/<country_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_country(country_id):
    """ DELETE /api/v1/countries/:country_id """
    country = storage.get(Country, country_id)

    if not country:
        abort(404)

    storage.delete(country)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route(
    '/countries/<country_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_country(country_id):
    """ PUT /api/v1/countries/:country_id """
    country = storage.get(Country, country_id)

    if not country:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(country, key, value)
    storage.save()
    return make_response(jsonify(country.to_dict()), 200)
