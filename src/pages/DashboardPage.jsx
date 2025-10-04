import { useState } from 'react';
import { Card } from '../components/Card';
import { TimelineStatus } from '../components/TimelineStatus';
import { ExperimentResults } from '../components/ExperimentResults';
import { useBookings } from '../hooks/useBookings';
import { mockExperimentResults } from '../data/mockData';

export const DashboardPage = () => {
  const { bookings } = useBookings();
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  if (bookings.length === 0) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Mission Dashboard</h1>
        <Card>
          <p className="text-gray-500 mb-4">You haven't booked any research pods yet.</p>
          <a href="/pods" className="text-blue-600 hover:underline">Browse available pods</a>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mission Dashboard</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Missions</h2>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <button
                  key={booking.id}
                  onClick={() => setSelectedBooking(booking)}
                  className={`block w-full text-left p-4 rounded-lg transition-colors ${
                    selectedBooking?.id === booking.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{booking.podTitle}</div>
                  <div className="text-sm text-gray-500">{booking.experimentType}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {booking.duration} months • ${(booking.totalPrice / 1000).toFixed(0)}k
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedBooking ? (
            <div className="space-y-6">
              <Card>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBooking.podTitle}</h2>
                    <p className="text-gray-500">
                      {selectedBooking.experimentType} • {selectedBooking.duration} months
                    </p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {selectedBooking.status}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4">Mission Timeline</h3>
                  <TimelineStatus timeline={selectedBooking.timeline} />
                </div>
              </Card>

              <div>
                <h3 className="text-lg font-semibold mb-4">Experiment Results</h3>
                <ExperimentResults results={mockExperimentResults[selectedBooking.podId]} />
              </div>
            </div>
          ) : (
            <Card>
              <p className="text-gray-500 text-center">
                Select a mission to view its details and results
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};