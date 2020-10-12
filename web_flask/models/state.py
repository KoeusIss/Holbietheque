#!/usr/bin/python3
"""[summary]
"""
from datetime import datetime
from models.base_model import BaseModel, Base
from models.address import Address
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import uuid


class State(BaseModel, Base):
    __tablename__ = "states"
    name = Column(String(128), nullable=False)
    country_id = Column(String(60), ForeignKey("countries.id"), nullable=False)
    addresses = relationship("Address", backref="state", cascade="all, delete")