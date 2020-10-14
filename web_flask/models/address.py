""" Addresses model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


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
        ForeignKey('student.id')
    )
    student = relationship(
        'Student',
        backref='student'
    )
