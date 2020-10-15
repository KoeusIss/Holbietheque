""" Education model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Boolean, Date
from marshmallow import Schema, fields, ValidationError, pre_load


class Education(BaseModel, Base):
    """
        school: (str) name of school
        degree: (str) name of degree
        major: (str) name of education major
        start_at: (date) starting date
        end_at: (date) end date
        is_finished: (bool) if still student
        grade: (str) the grade student get it
        description: (str) the description
        student_id: (str) a reference to education's student

    """
    __tablename__ = "educations"
    school = Column(
        String(128),
        nullable=False
    )
    degree = Column(
        String(128),
        nullable=False
    )
    major = Column(
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
    is_finished = Column(
        Boolean,
        default=False
    )
    grade = Column(
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


class EducationSchema(Schema):
    """ Education Schema """
    school = fields.Str()
    degree = fields.Str()
    major = fields.Str()
    start_at = fields.Date()
    end_at = fields.Date()
    is_finished = fields.Boolean()
    grade = fields.Str()
    description = fields.Str()
    student_id = fields.Str()
