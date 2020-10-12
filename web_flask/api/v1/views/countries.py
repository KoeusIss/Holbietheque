#!/usr/bin/python3
""" objects that handles all default RestFul API actions for cities """
from models.country import Country
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
# from flasgger.utils import swag_from


@app_views.route('/countries, methods=['GET'],
                 strict_slashes=False)
# @swag_from('documentation/city/cities_by_state.yml', methods=['GET'])
def get_countries():
    """
    Retrieves the list of all cities objects
    of a specific State, or a specific city
    """
    return storage.all(Country)
