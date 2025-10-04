import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PodCard } from '../components/PodCard';
import { BookingModal } from '../components/BookingModal';
import { useBookings } from '../hooks/useBookings';
import { mockPods } from '../data/mockData';

export const PodsPage = () => {
  const [selectedPod, setSelectedPod] = useState(null);
  const { addBooking } = useBookings();
  const navigate = useNavigate();

  const handleBook = (pod) => {
    setSelectedPod(pod);
  };

  const handleCloseModal = () => {
    setSelectedPod(null);
  };

  const handleSubmitBooking = (bookingData) => {
    addBooking(bookingData);
    setSelectedPod(null);
    navigate('/dashboard');
  };

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Browse Research Pods</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select from our state-of-the-art research pods designed for various scientific disciplines in Low Earth Orbit.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPods.map((pod) => (
          <PodCard
            key={pod.id}
            pod={pod}
            onBook={handleBook}
          />
        ))}
      </div>

      {selectedPod && (
        <BookingModal
          pod={selectedPod}
          onClose={handleCloseModal}
          onSubmit={handleSubmitBooking}
        />
      )}
    </div>
  );
};