""" Job model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Text
from web_flask.models.recruiter import RecruiterSchema
from marshmallow import Schema, fields


class Job(BaseModel, Base):
    """
        title: (str) the title of the job
        type: (str) full_time part_time ...
        summary: (str) short summary of job
        description: (str) description of duty
        salary: (str) proposed salary range
        level: (str) required level
        location: (str) location of work

    """
    __tablename__ = "jobs"
    title = Column(
        String(128),
        nullable=False
    )
    type = Column(
        String(128),
        nullable=False
    )
    description = Column(
        Text()
    )
    salary = Column(
        String(128),
        default="Not mention"
    )
    level = Column(
        String(128),
        nullable=False
    )
    location = Column(
        String(128),
        nullable=False
    )
    recruiter_id = Column(
        String(60),
        ForeignKey('recruiters.id'),
        nullable=False
    )


class JobSchema(Schema):
    """ Job Schema """
    id = fields.Str()
    title = fields.Str()
    type = fields.Str()
    description = fields.Str()
    salary = fields.Str()
    level = fields.Str()
    location = fields.Str()
    recruiter = fields.Nested(RecruiterSchema(only=["id", "name", "logo"]))
    created_at = fields.DateTime()
