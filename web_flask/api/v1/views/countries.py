""" Countries Views-API endpoints """

from web_flask.models.country import Country, CountrySchema
from web_flask.models import storage
from web_flask.api.v1.views import app_views
from flask import request
from sqlalchemy.exc import *

countries_schema = CountrySchema(many=True, only=["id", "name"])
country_schema = CountrySchema()


@app_views.route(
    '/countries',
    methods=['GET'],
    strict_slashes=False
)
def get_countries():
    """ GET /api/v1/countries """
    all_countries = storage.all(Country).values()
    countries = countries_schema.dump(all_countries)
    return {
        "message": "data found",
        "countries": countries
    }


@app_views.route(
    '/countries/<country_id>',
    methods=['GET'],
    strict_slashes=False
)
def get_country(country_id):
    """ GET /api/v1/countries/:country_id """
    the_country = storage.get(Country, country_id)
    if not the_country:
        return {
            "failed": True,
            "message": "data not found"
        }, 400
    country = country_schema.dump(the_country)
    return {
        "message": "data found",
        "country": country
    }


@app_views.route(
    '/countries',
    methods=['POST'],
    strict_slashes=False
)
def create_country():
    """ POST /api/v1/countries """
    if not request.get_json():
        return {
            "failed": True,
            "message": "not a json"
        }, 400
    data = request.get_json()
    instance = Country(**data)
    try:
        instance.save()
        country = country_schema.dump(instance)
        return {
            "success": True,
            "message": "created successfully",
            "country": country
        }, 201
    except (IntegrityError, OperationalError) as error:
        instance.rollback()
        return {
           "failed": True,
           "message": error.orig.args[1]
        }, 400


@app_views.route(
    '/countries/<country_id>',
    methods=['DELETE'],
    strict_slashes=False
)
def delete_country(country_id):
    """ DELETE /api/v1/countries/:country_id """
    the_country = storage.get(Country, country_id)
    if not the_country:
        return {
           "failed": True,
           "message": "data not found"
        }, 400
    storage.delete(the_country)
    storage.save()
    return {
        "success": True,
        "message": "deleted successfully"
    }, 200


@app_views.route(
    '/countries/<country_id>',
    methods=['PUT'],
    strict_slashes=False
)
def update_country(country_id):
    """ PUT /api/v1/:country_id """
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
    ignore = ['id', 'created_at', 'updated_at']
    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(the_country, key, value)
    storage.save()
    country = country_schema.dump(the_country)
    return {
        "success": True,
        "message": "updated successfully",
        "country": country
    }, 200
