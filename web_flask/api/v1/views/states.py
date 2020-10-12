#!/usr/bin/python3
""" objects that handles all default RestFul API actions for cities """
from models.state import State
from models.country import Country
from models import storage
from api.v1.views import app_views
from flask import abort, make_response, request, jsonify


@app_views.route('/<countryId>/states', methods=['GET'],
                 strict_slashes=False)
def get_states(countryId):
    """ GET /api/v1/:countryId/states """
    the_country = storage.get(Country, countryId)
    list_states = []
    for state in the_country.states:
        list_states.append(state.to_dict())
    return jsonify(list_states)

@app_views.route('/states/<stateId>', methods=['GET'],
                 strict_slashes=False)
def get_state(stateId):
    """ GET /api/v1/states/:stateId """
    the_state = storage.get(State, stateId)
    if not the_state:
        abort(404)
    return jsonify(the_state.to_dict())

@app_views.route('countries/<countryId>/states', methods=['POST'], strict_slashes=False)
def create_state(countryId):
    """ POST /api/v1/countries/:countryId/states """
    the_country = storage.get(Country, countryId)
    if not the_country:
        abort(404)
    if not request.get_json():
        abort(400, description="Not a JSON")
    if 'name' not in request.get_json():
        abort(400, description="Missing name")

    data = request.get_json()
    instance = State(**data)
    instance.country_id = the_country.id
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app_views.route('/states/<stateId>', methods=['DELETE'], strict_slashes=False)
def delete_state(stateId):
    """ DELETE /api/v1/states/:stateId"""
    the_state = storage.get(State, stateId)

    if not the_state:
        abort(404)
    storage.delete(the_state)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/states/<stateId>', methods=['PUT'], strict_slashes=False)
def update_state(stateId):
    """ PUT /api/v1/:stateId """
    the_state = storage.get(State, stateId)
    if not the_state:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'country_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_state, key, value)
    storage.save()
    return make_response(jsonify(the_state.to_dict()), 200)