import { useBookings } from '../hooks/useBookings';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

export const AdminPage = () => {
  const { bookings, updateStatus, updateTimeline } = useBookings();

  const calculateStats = () => {
    const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    const approvedMissions = bookings.filter(b => b.status === 'approved').length;
    const pendingMissions = bookings.filter(b => b.status === 'pending').length;
    const completedMissions = bookings.filter(b => {
      return b.timeline.every(t => t.completed);
    }).length;

    return {
      totalRevenue,
      approvedMissions,
      pendingMissions,
      completedMissions,
      totalMissions: bookings.length
    };
  };

  const stats = calculateStats();

  const handleApprove = (booking) => {
    updateStatus(booking.id, 'approved');
    // Move to "Launched" status
    updateTimeline(booking.id, 'Launched');
  };

  const handleReject = (booking) => {
    updateStatus(booking.id, 'rejected');
  };

  const handleUpdateStatus = (booking, newStatus) => {
    updateTimeline(booking.id, newStatus);
  };

  return (
    <div className="container mx-auto min-h-full py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase">Total Revenue</p>
            <p className="text-3xl font-bold text-blue-600">
              ${(stats.totalRevenue / 1000000).toFixed(1)}M
            </p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase">Total Missions</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalMissions}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase">Pending Approval</p>
            <p className="text-3xl font-bold text-blue-600">{stats.pendingMissions}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase">Completed</p>
            <p className="text-3xl font-bold text-blue-600">{stats.completedMissions}</p>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Mission Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.podTitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.experimentType} • {booking.duration} months
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{booking.name}</div>
                    <div className="text-sm text-gray-500">{booking.organization}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${booking.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        booking.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    ${(booking.totalPrice / 1000).toFixed(0)}k
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleApprove(booking)}
                          className="text-xs"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleReject(booking)}
                          className="text-xs"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {booking.status === 'approved' && !booking.timeline.find(t => t.status === 'Deorbited').completed && (
                      <select
                        className="block w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleUpdateStatus(booking, e.target.value)}
                        value={booking.timeline.find(t => !t.completed)?.status || 'Deorbited'}
                      >
                        {booking.timeline.map(t => (
                          <option key={t.status} value={t.status}>
                            Move to: {t.status}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};