#!/usr/bin/python3
"""[summary]
"""
from datetime import datetime
import sqlalchemy
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, DateTime
from models.state import State
from sqlalchemy.orm import relationship


class Country(BaseModel, Base):
    __tablename__ = "countries"
    iso = Column(String(16), nullable=False)
    name = Column(String(128), nullable=False)
    phone_code = Column(String(16))
    states = relationship("State", backref="country", cascade="all, delete")
