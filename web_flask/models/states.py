#!/usr/bin/python3
"""[summary]
"""
from datetime import datetime
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, DateTime
import uuid


class State(BaseModel, Base):
    __tablename__ = "states"
    name = Column(String(128), nullable=False)
    country_id = Column(String(60), ForeignKey("countries.id"), nullable=False)
