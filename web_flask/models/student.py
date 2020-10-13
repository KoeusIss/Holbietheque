#!/usr/bin/python3
"""[summary]
"""
from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class Student(BaseModel, Base):
    __tablename__ = "students"
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    middle_name = Column(String(128))
    id_number = Column(String(128), nullable=False)
    passport_number = Column(String(128), default=None)
    marital_status = Column(String(60), default="")
    addresses = relationship("Address", uselist=False, backref="student", cascade="all, delete")
