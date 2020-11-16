""" Project model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Boolean, Date
from marshmallow import Schema, fields, ValidationError, pre_load


class Project(BaseModel, Base):
    """
        name: (str) the title of the job
        start_at: (date) starting date
        end_at: (date) end date
        status: (str) status of the project
        url: (str) the project url
        github_link: (str) the github link of the project
        is_actual: (bool) if still work in it
        description: (str) the description
        student_id: (str) a reference to education's student

    """
    __tablename__ = "projects"
    name = Column(
        String(128),
        nullable=False
    )
    start_at = Column(
        Date,
        nullable=False
    )
    end_at = Column(
        Date,
        default=None
    )
    url = Column(
        String(128),
    )
    github_link = Column(
        String(128),
        nullable=False
    )
    status = Column(
        String(128)
    )
    description = Column(
        String(255)
    )
    student_id = Column(
        String(60),
        ForeignKey('students.id'),
        nullable=False
    )


class ProjectSchema(Schema):
    """ Education Schema """
    id = fields.Str()
    name = fields.Str()
    start_at = fields.Str()
    end_at = fields.Str()
    status = fields.Str()
    url = fields.Str()
    github_link = fields.Str()
    description = fields.Str()
    student_id = fields.Str()
