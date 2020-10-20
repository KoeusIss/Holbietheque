""" Flask Application """
from web_flask.models import storage

from flask import Flask, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger
from flask_jwt_extended import JWTManager
from flask_mail import Mail

app = Flask(__name__)
app.config.from_object('web_flask.config.Config')
jwt = JWTManager(app)
mail = Mail(app)
from web_flask.api.v1.views import app_views

app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    """ Abort 404 """
    return make_response(jsonify({'error': "Not found"}), 404)


app.config['SWAGGER'] = {
    'title': 'Holbietheque Restful API',
    'uiversion': 3
}

Swagger(app)


def create_app():
    """ Main Function """
    return app
