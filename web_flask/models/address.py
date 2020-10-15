""" Addresses model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from marshmallow import Schema, fields


class Address(BaseModel, Base):
    """
        first_line: (str) address first line
        second_line: (str) address second line
        city: (str) the city
        zip_code: (list) zip_code
        state_id: (str) a reference to address's state

    """
    __tablename__ = "addresses"
    state_id = Column(
        String(60),
        ForeignKey("states.id"),
        nullable=False
    )
    first_line = Column(
        String(128),
        nullable=False
    )
    second_line = Column(
        String(128),
        default=None
    )
    city = Column(
        String(128),
        nullable=False
    )
    zip_code = Column(
        String(60),
        nullable=False
    )
    student_id = Column(
        String(60),
        ForeignKey('students.id')
    )
    student = relationship(
        'Student',
        back_populates='address'
    )


class AddressSchema(Schema):
    """ Address Schema """
    first_line = fields.Str()
    second_line = fields.Str()
    city = fields.Str()
    zip_code = fields.Str()
