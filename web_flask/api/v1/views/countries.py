#!/usr/bin/python3
""" objects that handles all default RestFul API actions for cities """
from models.country import Country
from models import storage
from api.v1.views import app_views
from flask import abort, make_response, request, jsonify


@app_views.route('/countries', methods=['GET'],
                 strict_slashes=False)
def get_countries():
    """ GET /api/v1/countries """
    all_countries = storage.all(Country).values()
    list_countries = []
    for country in all_countries:
        list_countries.append(country.to_dict())
    return jsonify(list_countries)

@app_views.route('/countries/<countryId>', methods=['GET'],
                 strict_slashes=False)
def get_country(countryId):
    """ GET /api/v1/countries/:countryId """
    the_country = storage.get(Country, countryId)
    if not the_country:
        abort(404)
    return jsonify(the_country.to_dict())

@app_views.route('/countries', methods=['POST'], strict_slashes=False)
def create_country():
    """ POST /api/v1/countries """
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'iso' not in request.get_json():
        abort(400, description="Missing iso")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = Country(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/countries/<countryId>', methods=['DELETE'],
                 strict_slashes=False)
def delete_country(countryId):
    """ DELETE /api/v1/countries/:countryId """

    country = storage.get(Country, countryId)

    if not country:
        abort(404)

    storage.delete(country)
    storage.save()

    return make_response(jsonify({}), 200)

@app_views.route('/countries/<countryId>', methods=['PUT'], strict_slashes=False)
def update_country(countryId):
    """ PUT /api/v1/countries/:countryId """
    country = storage.get(Country, countryId)

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