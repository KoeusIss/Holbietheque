""" Skill model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Boolean, Date
from marshmallow import Schema, fields, ValidationError, pre_load
from sqlalchemy.orm import relationship

class Skill(BaseModel, Base):
    """
        name: (str)
        level: (str)
    """
    __tablename__ = "skills"
    name = Column(
        String(128)
    )
    level = Column(
        String(128)
    )
    student_id = Column(
        String(60),
        ForeignKey("students.id"),
        nullable=False
    )


class SkillSchema(Schema):
    """ Skill Schema """
    id = fields.Str()
    name = fields.Str()
    level = fields.Str()
    student_id = fields.Str()
