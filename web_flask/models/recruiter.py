""" Recruiter model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields


class Recruiter(BaseModel, Base):
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
    __tablename__ = "recruiters"
    first_name = Column(
        String(128),
        nullable=False
    )
    last_name = Column(
        String(128),
        nullable=False
    )
    company_name = Column(
        String(128)
    )
    phone_number = Column(
        String(128),
    )
    mobile_number = Column(
        String(128),
    )
    company_size = Column(
        String(16)
    )
    specialization = Column(
        String(255)
    )
    address_id = Column(
        String(60),
        ForeignKey('addresses.id')
    )
    address = relationship(
        'Address',
        back_populates='recruiter'
    )
    user_id = Column(
        String(60),
        ForeignKey('users.id')
    )
    user = relationship(
        'User',
        back_populates='recruiter'
    )

 
class RecruiterSchema(Schema):
    """ Recruiter Schema """

    id = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    full_name = fields.Method('format_name', dump_only=True)
    company_name = fields.Str()
    company_size = fields.Str()
    phone_number = fields.Str()
    mobile_number = fields.Str()
    specialization = fields.Str()

    def format_name(self, recruiter):
        return '{} {}'.format(recruiter.first_name, recruiter.last_name)
