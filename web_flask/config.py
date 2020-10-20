""" Flask configuration file """
from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(base_dir, '.env'))


class Config:
    """ Configuration class """

    # General configuration
    DEBUG = True
    FLASK_ENV = environ.get("FLASK_ENV")
    JSONIFY_PRETTYPRINT_REGULAR = True
    JWT_SECRET_KEY = environ.get("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = 86400

    # Mail configuration
    MAIL_SERVER = 'smtp.holbie.tech'
    MAIL_PORT = 587
    MAIL_USERNAME = 'no_reply@holbie.tech'
    MAIL_PASSWORD = 'xE*bNEr2'
    DEFAULT_MAIL_SENDER = 'no_reply@holbie.tech'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_DEBUG = True
    MAIL_SUPPRESS_SEND = False
