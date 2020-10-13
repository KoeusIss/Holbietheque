""" Country model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Country(BaseModel, Base):
    """
        iso: (str) iso code for country
        name: (str) the name of the country
        phone_code: (str) the phone code of country
        states: (list) list of country's states

    """
    __tablename__ = "countries"
    iso = Column(
        String(16),
        nullable=False,
        unique=True
    )
    name = Column(
        String(128),
        nullable=False,
        unique=True
    )
    phone_code = Column(
        String(16),
        nullable=False,
        unique=True
    )
    states = relationship(
        "State",
        backref="country",
        cascade="all, delete"
    )
