import { useState } from 'react';
import { WeatherStation } from '../components/WeatherStation';
import { SmartTrafficLight } from '../components/SmartTrafficLight';
import { Card } from '../components/Card';
import { iotDevices } from '../data/iotData';

export const IoTProductsPage = () => {
  const [activeTab, setActiveTab] = useState('weather');

  return (
    <div className="container mx-auto min-h-full py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">IoT Lab Integration</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect your IoT devices to our orbital research lab for enhanced data accuracy and real-time monitoring.
          Experience our demo systems in action.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="border border-gray-200 rounded-lg p-1 flex">
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'weather'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('weather')}
          >
            Weather Stations
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === 'traffic'
                ? 'bg-blue-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('traffic')}
          >
            Traffic Lights
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {activeTab === 'weather' ? (
          <>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Weather Station Integration</h2>
              <p className="text-gray-600 mb-4">
                Our weather stations provide highly accurate atmospheric data by cross-referencing
                with orbital measurements. This integration enables:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Enhanced weather prediction accuracy</li>
                <li>Real-time atmospheric condition monitoring</li>
                <li>Precise climate data for research</li>
                <li>Integration with orbital experiments</li>
              </ul>
            </Card>
            <div className="relative h-64 md:h-auto">
              <img
                src="/weather-station.jpg"
                alt="Weather Station"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Weather+Station';
                }}
              />
            </div>
          </>
        ) : (
          <>
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Smart Traffic Management</h2>
              <p className="text-gray-600 mb-4">
                Our smart traffic light system uses orbital data to optimize traffic flow and
                reduce congestion. Key features include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Real-time traffic monitoring</li>
                <li>Adaptive signal timing</li>
                <li>Emergency vehicle prioritization</li>
                <li>Congestion prediction and prevention</li>
              </ul>
            </Card>
            <div className="relative h-64 md:h-auto">
              <img
                src="/traffic-light.jpg"
                alt="Smart Traffic Light"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600?text=Smart+Traffic+Light';
                }}
              />
            </div>
          </>
        )}
      </div>

      {/* Live Demo Section */}
      <h2 className="text-2xl font-bold mb-6">Live Demo Devices</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {activeTab === 'weather'
          ? iotDevices.weatherStations.map(station => (
              <WeatherStation key={station.id} station={station} />
            ))
          : iotDevices.trafficLights.map(light => (
              <SmartTrafficLight key={light.id} light={light} />
            ))}
      </div>
    </div>
  );
};