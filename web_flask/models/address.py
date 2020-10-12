#!/usr/bin/python3
"""[summary]
"""
from datetime import datetime
from models.base_model import BaseModel, Base
import sqlalchemy
from sqlalchemy import Column, String, ForeignKey, DateTime


class Address(BaseModel, Base):
    __tablename__ = "addresses"
    state_id = Column(String(60), ForeignKey("states.id"), nullable=False)