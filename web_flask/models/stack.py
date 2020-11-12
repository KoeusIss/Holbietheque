""" Stack model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from marshmallow import Schema, fields


class Stack(BaseModel, Base):
    """
        name: (str) name of state
        recruiter_id: (str) reference to recruiter

    """
    __tablename__ = "stacks"
    name = Column(
        String(128),
        nullable=False
    )
    recruiter_id = Column(
        String(60),
        ForeignKey("recruiters.id"),
        nullable=False
    )


class StackSchema(Schema):
    """ State Schema """
    name = fields.Str()
