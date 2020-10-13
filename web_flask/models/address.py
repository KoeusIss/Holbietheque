""" Addresses model """

from web_flask.models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey


class Address(BaseModel, Base):
    __tablename__ = "addresses"
    state_id = Column(String(60), ForeignKey("states.id"), nullable=False)
    first_line = Column(String(128), nullable=False)
    second_line = Column(String(128), default=None)
    city = Column(String(128), nullable=False)
    zip_code = Column(String(60), nullable=False)
