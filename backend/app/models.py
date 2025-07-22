from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
from pydantic import BaseModel
import datetime

# SQLAlchemy Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Flight(Base):
    __tablename__ = "flights"
    id = Column(Integer, primary_key=True, index=True)
    airline = Column(String)
    from_city = Column(String)
    to_city = Column(String)
    depart_time = Column(String)
    arrive_time = Column(String)
    price = Column(Float)
    stops = Column(Integer)

class Hotel(Base):
    __tablename__ = "hotels"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    price_per_night = Column(Float)
    rating = Column(Float)

class Transport(Base):
    __tablename__ = "transports"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    provider = Column(String)
    pickup = Column(String)
    dropoff = Column(String)
    price = Column(Float)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    booking_type = Column(String)  # flight, hotel, transport
    item_id = Column(Integer)
    status = Column(String, default="confirmed")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user = relationship("User")

# Pydantic Schemas
class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserOut(BaseModel):
    id: int
    email: str
    name: str
    class Config:
        orm_mode = True

class FlightOut(BaseModel):
    id: int
    airline: str
    from_city: str
    to_city: str
    depart_time: str
    arrive_time: str
    price: float
    stops: int
    class Config:
        orm_mode = True

class HotelOut(BaseModel):
    id: int
    name: str
    location: str
    price_per_night: float
    rating: float
    class Config:
        orm_mode = True

class TransportOut(BaseModel):
    id: int
    type: str
    provider: str
    pickup: str
    dropoff: str
    price: float
    class Config:
        orm_mode = True

class BookingOut(BaseModel):
    id: int
    user_id: int
    booking_type: str
    item_id: int
    status: str
    created_at: datetime.datetime
    class Config:
        orm_mode = True 