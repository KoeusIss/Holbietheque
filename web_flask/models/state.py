""" State model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields


class State(BaseModel, Base):
    """
        name: (str) name of state
        country_id: (str) reference to state's country

    """
    __tablename__ = "states"
    name = Column(
        String(128),
        nullable=False
    )
    country_id = Column(
        String(60),
        ForeignKey("countries.id"),
        nullable=False
    )
    addresses = relationship(
        "Address",
        backref="state",
        cascade="all, delete"
    )


class StateSchema(Schema):
    """ State Schema """
    id = fields.Str()
    name = fields.Str()
