""" Recruiter model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from web_flask.models.stack import StackSchema
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields
from web_flask.models.user import UserSchema


class Recruiter(BaseModel, Base):
    """
        name: (str) company name
        description: (str) description or slogan
        founded: (str) founded year
        web_site: (list) web site
        company_size: (str) company size
        logo: (str) reference to student's address
        headquarter: (str) headquarter location

    """
    __tablename__ = "recruiters"
    name = Column(
        String(128),
        nullable=False
    )
    description = Column(
        String(128)
    )
    founded = Column(
        String(128)
    )
    web_site = Column(
        String(128),
    )
    company_size = Column(
        String(16)
    )
    logo = Column(
        String(128)
    )
    headquarter = Column(
        String(60)
    )
    about = Column(
        String(1024)
    )
    our_mission = Column(
        String(1024)
    )
    core_values = Column(
        String(1024)
    )
    interview_process = Column(
        String(1024)
    )
    user_id = Column(
        String(60),
        ForeignKey('users.id')
    )
    user = relationship(
        'User',
        back_populates='recruiter'
    )
    stacks = relationship(
        "Stack",
        backref="recruiter",
        cascade="all, delete"
    )
    jobs = relationship(
        "Job",
        backref="recruiter",
        cascade="all, delete"
    )

 
class RecruiterSchema(Schema):
    """ Recruiter Schema """
    id = fields.Str()
    name = fields.Str()
    description = fields.Str()
    founded = fields.Str()
    company_size = fields.Str()
    web_site = fields.Str()
    headquarter = fields.Str()
    logo = fields.Str()
    about = fields.Str()
    our_mission = fields.Str()
    core_values = fields.Str()
    interview_process = fields.Str()
    user = fields.Nested(UserSchema(only=["id", "email"]))
