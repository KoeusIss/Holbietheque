""" Experience model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Boolean, Date
from marshmallow import Schema, fields, ValidationError, pre_load


class Experience(BaseModel, Base):
    """
        title: (str) the title of the job
        company: (str) the company name
        job_type: (str) the type of job
        start_at: (date) starting date
        end_at: (date) end date
        is_actual: (bool) if still work in it
        description: (str) the description
        student_id: (str) a reference to education's student

    """
    __tablename__ = "educations"
    title = Column(
        String(128),
        nullable=False
    )
    job_type = Column(
        String(128),
    )
    company = Column(
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
    is_actual = Column(
        Boolean,
        default=False
    )
    description = Column(
        String(255)
    )
    student_id = Column(
        String(60),
        ForeignKey('students.id'),
        nullable=False
    )


class ExperienceSchema(Schema):
    """ Experience Schema """
    title = fields.Str()
    job_type = fields.Str()
    company = fields.Str()
    start_at = fields.Date()
    end_at = fields.Date()
    is_actual = fields.Boolean()
    description = fields.Str()
    student_id = fields.Str()
