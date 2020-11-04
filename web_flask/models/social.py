""" Social model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Boolean, Date
from marshmallow import Schema, fields, ValidationError, pre_load
from sqlalchemy.orm import relationship


class Social(BaseModel, Base):
    """
        info: (str)
        github: (str)
        linkedin: (str)
        medium: (str)
        twitter: (str)
        stackoverflow: (str)
        reddit: (str)
        facebook: (str)
        other: (str)
        student_id: (str)
    """
    __tablename__ = "socials"
    info = Column(
        String(128)
    )
    github = Column(
        String(128)
    )
    linkedin = Column(
        String(128)
    )
    medium = Column(
        String(128)
    )
    twitter = Column(
        String(128)
    )
    stackoverflow = Column(
        String(128)
    )
    description = Column(
        String(255)
    )
    reddit = Column(
        String(128)
    )
    facebook = Column(
        String(128)
    )
    other = Column(
        String(128)
    )
    student_id = Column(
        String(60),
        ForeignKey("students.id"),
        nullable=False
    )
    student = relationship(
        'Student',
        back_populates='social'
    )


class SocialSchema(Schema):
    """ Experience Schema """
    id = fields.Str()
    info = fields.Str()
    github = fields.Str()
    linkedin = fields.Str()
    medium = fields.Str()
    twitter = fields.Str()
    stackoverflow = fields.Str()
    reddit = fields.Str()
    facebook = fields.Str()
    other = fields.Str()
    student_id = fields.Str()
