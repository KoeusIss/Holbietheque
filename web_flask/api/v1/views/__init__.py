""" Blueprint for API """
from flask import Blueprint

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from web_flask.api.v1.views.index import *
from web_flask.api.v1.views.countries import *
from web_flask.api.v1.views.states import *
from web_flask.api.v1.views.students import *
from web_flask.api.v1.views.addresses import *
