""" Flask configuration file """
from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(base_dir, '.env'))


class Config:
    """ Configuration class """
    DEBUG = True
    FLASK_ENV = environ.get("FLASK_ENV")
    JSONIFY_PRETTYPRINT_REGULAR = True
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY")
