""" States Views-API endpoint """
from web_flask.models.state import State
from web_flask.models.country import Country, CountrySchema
from web_flask.models.state import State, StateSchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import abort, make_response, request, jsonify

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
    states = state_schema.dump(the_country.states)
    return {"country": country, "states": states}


@app_views.route(
    '/states/<state_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_state(state_id):
    """ GET /api/v1/states/:state_id """
    the_state = storage.get(State, state_id)
    if not the_state:
        abort(404)
    return {"state": state_schema.dump(the_state)}


@app_views.route(
    'countries/<country_id>/states',
    methods=['POST'],
    strict_slashes=False
)
def create_state(country_id):
    """ POST /api/v1/countries/:country_id/states """
    the_country = storage.get(Country, country_id)
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


@app_views.route(
    '/states/<state_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_state(state_id):
    """ DELETE /api/v1/states/:state_id"""
    the_state = storage.get(State, state_id)

    if not the_state:
        abort(404)
    storage.delete(the_state)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route(
    '/states/<state_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_state(state_id):
    """ PUT /api/v1/:stateId """
    the_state = storage.get(State, state_id)
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