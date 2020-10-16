""" User model """
from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from marshmallow import Schema, fields, ValidationError, pre_load


class User(BaseModel, Base):
    """
        email: (str) user email
        password: (str) user password
        password_confirmation: (str) user password confirmation
        role: (str) user role for authorization

    """
    __tablename__ = "users"
    email = Column(
        String(128),
        nullable=False
    )
    password = Column(
        String(128),
        nullable=False
    )
    password_confirmation = Column(
        String(128),
        nullable=False
    )
    role = Column(
        String(128),
        nullable=False
    )


class UserSchema(Schema):
    """ User Schema """
    id = fields.Str()
    email = fields.Str()
    role = fields.Str()
