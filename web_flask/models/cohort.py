""" Cohort model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields


class Cohort(BaseModel, Base):
    """
        name: (str) cohort name/number
        start_at: (date) starting date

    """
    __tablename__ = "cohorts"
    name = Column(
        String(128),
        nullable=False
    )
    start_at = Column(
        DateTime()
    )
    students = relationship(
        "Student",
        backref="cohort"
    )


class CohortSchema(Schema):
    """ State Schema """
    id = fields.Str()
    name = fields.Str()
    start_at = fields.Str()
