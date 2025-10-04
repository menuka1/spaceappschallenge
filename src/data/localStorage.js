const STORAGE_KEYS = {
  BOOKINGS: 'orbitlab_bookings',
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  bookings.push({
    ...booking,
    id: `booking-${Date.now()}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    timeline: [
      {
        status: 'Planned',
        date: new Date().toISOString(),
        completed: true
      },
      {
        status: 'Launched',
        date: null,
        completed: false
      },
      {
        status: 'In-Orbit',
        date: null,
        completed: false
      },
      {
        status: 'Data Delivered',
        date: null,
        completed: false
      },
      {
        status: 'Deorbited',
        date: null,
        completed: false
      }
    ]
  });
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookings;
};

export const getBookings = () => {
  const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookings ? JSON.parse(bookings) : [];
};

export const updateBookingStatus = (bookingId, newStatus) => {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex((b) => b.id === bookingId);
  
  if (bookingIndex === -1) return null;
  
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    status: newStatus
  };
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookings[bookingIndex];
};

export const updateBookingTimeline = (bookingId, status) => {
  const bookings = getBookings();
  const bookingIndex = bookings.findIndex((b) => b.id === bookingId);
  
  if (bookingIndex === -1) return null;
  
  const timeline = bookings[bookingIndex].timeline;
  const statusIndex = timeline.findIndex((t) => t.status === status);
  
  if (statusIndex === -1) return null;
  
  // Update current status and all previous statuses
  for (let i = 0; i <= statusIndex; i++) {
    timeline[i] = {
      ...timeline[i],
      date: timeline[i].date || new Date().toISOString(),
      completed: true
    };
  }
  
  bookings[bookingIndex] = {
    ...bookings[bookingIndex],
    timeline
  };
  
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return bookings[bookingIndex];
};

// Helper function to calculate booking price
export const calculateBookingPrice = (podPricePerMonth, durationMonths) => {
  return podPricePerMonth * durationMonths;
};