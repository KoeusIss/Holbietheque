""" States Views-API endpoint """
from web_flask.models.country import Country, CountrySchema
from web_flask.models.state import State, StateSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

country_schema = CountrySchema(only=["name"])
states_schema = StateSchema(many=True, only=["id", "name"])
state_schema = StateSchema()


@app_views.route(
    '/<country_id>/states',
    methods=['GET'],
    strict_slashes=False
)
def get_states(country_id):
    """ GET /api/v1/:country_id/states """
    the_country = storage.get(Country, country_id)
    country = country_schema.dump(the_country)
    states = states_schema.dump(the_country.states)
    return {
        "success": True,
        "message": "data found",
        "country": country,
        "states": states
    }


@app_views.route(
    '/states/<state_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_state(state_id):
    """ GET /api/v1/states/:state_id """
    the_state = storage.get(State, state_id)
    if not the_state:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    state = state_schema.dump(the_state)
    return {
        "success": True,
        "message": "data found",
        "state": state
    }


@app_views.route(
    'countries/<country_id>/states',
    methods=['POST'],
    strict_slashes=False
)
def create_state(country_id):
    """ POST /api/v1/countries/:country_id/states """
    the_country = storage.get(Country, country_id)
    if not the_country:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    data = request.get_json()
    the_state = State(**data)
    try:
        the_state.country_id = the_country.id
        the_state.save()
        state = state_schema.dump(the_state)
        return {
            "success": True,
            "message": "created successfully",
            "state": state
        }, 201
    except (IntegrityError, OperationalError) as error:
        the_state.rollback()
        return {
            "failed": True,
            "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/states/<state_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_state(state_id):
    """ DELETE /api/v1/states/:state_id"""
    the_state = storage.get(State, state_id)
    if not the_state:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    storage.delete(the_state)
    storage.save()
    return {
        "success": True,
        "message": "deleted successfully"
    }, 200


@app_views.route(
    '/states/<state_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_state(state_id):
    """ PUT /api/v1/:state_id """
    the_state = storage.get(State, state_id)
    if not the_state:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    ignore = ['id', 'country_id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_state, key, value)
    storage.save()
    state = state_schema.dump(the_state)
    return {
        "success": True,
        "message": "updated successfully",
        "state": state
    }, 200
