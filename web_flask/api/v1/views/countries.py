#!/usr/bin/python3
""" objects that handles all default RestFul API actions for cities """
from models.country import Country
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request


@app_views.route('/countries', methods=['GET'],
                 strict_slashes=False)
def get_countries():
    """
    Retrieves the list of all cities objects
    of a specific Country, or a specific city
    """
    all_countries = storage.all(Country).values()
    list_countries = []
    for country in all_countries:
        list_countries.append(country.to_dict())
    return jsonify(list_countries)
