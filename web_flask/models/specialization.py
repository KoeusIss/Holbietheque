""" Specialization model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields


class Specialization(BaseModel, Base):
    """
        name: (str) specialization name/number
    """
    __tablename__ = "specializations"
    name = Column(
        String(128),
        nullable=False
    )
    students = relationship(
        "Student",
        backref="specialization"
    )


class SpecializationSchema(Schema):
    """ Specialization Schema """
    id = fields.Str()
    name = fields.Str()
    start_at = fields.Str()
