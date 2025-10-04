import { useState, useEffect } from 'react';
import { getBookings, saveBooking, updateBookingStatus, updateBookingTimeline } from '../data/localStorage';

export const useBookings = () => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    setBookings(getBookings());
  }, []);
  
  const addBooking = (booking) => {
    const updatedBookings = saveBooking(booking);
    setBookings(updatedBookings);
  };
  
  const updateStatus = (bookingId, newStatus) => {
    const updatedBooking = updateBookingStatus(bookingId, newStatus);
    if (updatedBooking) {
      setBookings(getBookings());
    }
  };
  
  const updateTimeline = (bookingId, status) => {
    const updatedBooking = updateBookingTimeline(bookingId, status);
    if (updatedBooking) {
      setBookings(getBookings());
    }
  };
  
  return {
    bookings,
    addBooking,
    updateStatus,
    updateTimeline
  };
};