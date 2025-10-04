import { useState, useEffect } from 'react';
import { Card } from './Card';
import { generateWeatherData } from '../data/iotData';

export const WeatherStation = ({ station }) => {
  const [metrics, setMetrics] = useState(station.metrics);
  const [lastUpdate, setLastUpdate] = useState(station.lastUpdate);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMetrics = generateWeatherData(metrics);
      setMetrics(newMetrics);
      setLastUpdate(new Date().toISOString());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [metrics]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{station.name}</h3>
          <p className="text-gray-600">{station.location}</p>
        </div>
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full ${getStatusColor(station.status)} mr-2`}></span>
          <span className="text-sm text-gray-600">{station.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="text-xl font-semibold">{metrics.temperature.toFixed(1)}°C</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Humidity</p>
          <p className="text-xl font-semibold">{metrics.humidity.toFixed(1)}%</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Pressure</p>
          <p className="text-xl font-semibold">{metrics.pressure.toFixed(2)} hPa</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Wind Speed</p>
          <p className="text-xl font-semibold">{metrics.windSpeed.toFixed(1)} m/s</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Rainfall</p>
          <p className="text-xl font-semibold">{metrics.rainfall.toFixed(2)} mm</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Solar Radiation</p>
          <p className="text-xl font-semibold">{metrics.solarRadiation.toFixed(0)} W/m²</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>Accuracy: {station.accuracy}%</p>
        <p>Last Update: {new Date(lastUpdate).toLocaleTimeString()}</p>
      </div>
    </Card>
  );
};