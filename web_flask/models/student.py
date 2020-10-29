""" Student model """
from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime
from web_flask.models.address import AddressSchema
from web_flask.models.social import SocialSchema
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields
from web_flask.models.specialization import SpecializationSchema
from web_flask.models.cohort import CohortSchema
from hashlib import md5
from web_flask.models.user import UserSchema
from web_flask.models.language import LanguageSchema
from web_flask.models.skill import SkillSchema



class Student(BaseModel, Base):
    """
        first_name: (str) student first name
        last_name: (str) student last name
        middle_name: (str) middle name
        id_number: (list) identity number
        passport_number: (str) passport number
        marital_status: (str) marital status
        address: (str) reference to student's address
        certificates: (str) student's certificates

    """
    __tablename__ = "students"
    first_name = Column(
        String(128),
        nullable=False
    )
    last_name = Column(
        String(128),
        nullable=False
    )
    middle_name = Column(
        String(128)
    )
    cin_number = Column(
        String(128),
        nullable=False
    )
    passport_number = Column(
        String(128),
        default=None
    )
    school_id = Column(
        String(16),
        nullable=False
    )
    date_of_birth = Column(
        DateTime()
    )
    gender = Column(
        String(128)
    )
    about_me = Column(
        String(512)
    )
    address_id = Column(
        String(60),
        ForeignKey('addresses.id')
    )
    address = relationship(
        'Address',
        back_populates='student'
    )
    certificates = relationship(
        "Certificate",
        backref="student",
        cascade="all, delete"
    )
    educations = relationship(
        "Education",
        backref="student",
        cascade="all, delete"
    )
    experiences = relationship(
        "Experience",
        backref="student",
        cascade="all, delete"
    )
    projects = relationship(
        "Project",
        backref="student",
        cascade="all, delete"
    )
    social = relationship(
        "Social",
        uselist=False,
        back_populates="student",
        cascade="all, delete"
    )
    language = relationship(
        "Language",
        backref="student",
        cascade="all, delete"
    )
    skills = relationship(
        "Skill",
        backref="student",
        cascade="all, delete"
    )
    user_id = Column(
        String(60),
        ForeignKey('users.id')
    )
    user = relationship(
        'User',
        back_populates='student'
    )
    cohort_id = Column(
        String(60),
        ForeignKey('cohorts.id')
    )
    specialization_id = Column(
        String(60),
        ForeignKey('specializations.id')
    )


 
class StudentSchema(Schema):
    """ Student Schema """
    id = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    full_name = fields.Method('format_name', dump_only=True)
    born_at = fields.DateTime()
    middle_name = fields.Str()
    id_number = fields.Str()
    passport_number = fields.Str()
    marital_status = fields.Str()
    school_id = fields.Str()
    about_me = fields.Str()
    languages = fields.Nested(LanguageSchema(many=True, only=["name", "level"]))
    skills = fields.Nested(SkillSchema(many=True, only=["name", "level"]))
    specialization = fields.Nested(SpecializationSchema(only=["name"]))
    cohort = fields.Nested(CohortSchema(only=["name"]))
    image = fields.Method('avatar', dump_only=True)
    user = fields.Nested(UserSchema(only=["id", "email"]))

    def format_name(self, student):
        return '{} {}'.format(student.first_name, student.last_name)

    def avatar(self, student):
        digest = md5(student.user.email.lower().encode('utf-8')).hexdigest()
        return 'https://www.gravatar.com/avatar/{}?d=mp'.format(digest)

