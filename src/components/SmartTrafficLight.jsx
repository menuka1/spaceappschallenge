import { useState, useEffect } from 'react';
import { Card } from './Card';
import { generateTrafficData } from '../data/iotData';

export const SmartTrafficLight = ({ light }) => {
  const [metrics, setMetrics] = useState(light.metrics);
  const [currentState, setCurrentState] = useState(light.currentState);
  const [lastUpdate, setLastUpdate] = useState(light.lastUpdate);

  useEffect(() => {
    const interval = setInterval(() => {
      const newMetrics = generateTrafficData(metrics);
      setMetrics(newMetrics);
      // Change light state based on traffic conditions
      setCurrentState(getNextState(currentState, newMetrics));
      setLastUpdate(new Date().toISOString());
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [metrics, currentState]);

  const getNextState = (current, metrics) => {
    if (metrics.emergencyMode) return 'green';
    if (metrics.congestionLevel === 'high') {
      return current === 'green' ? 'yellow' : 'green';
    }
    // Normal cycle: green -> yellow -> red -> green
    switch (current) {
      case 'green':
        return 'yellow';
      case 'yellow':
        return 'red';
      case 'red':
        return 'green';
      default:
        return 'red';
    }
  };

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

  const getTrafficLightClass = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'green':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCongestionColor = (level) => {
    switch (level) {
      case 'low':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{light.name}</h3>
          <p className="text-gray-600">{light.location}</p>
        </div>
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full ${getStatusColor(light.status)} mr-2`}></span>
          <span className="text-sm text-gray-600">{light.status}</span>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
          <div className={`w-8 h-8 rounded-full ${currentState === 'red' ? 'bg-red-500' : 'bg-red-900'}`}></div>
          <div className={`w-8 h-8 rounded-full ${currentState === 'yellow' ? 'bg-yellow-500' : 'bg-yellow-900'}`}></div>
          <div className={`w-8 h-8 rounded-full ${currentState === 'green' ? 'bg-green-500' : 'bg-green-900'}`}></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Vehicle Count</p>
          <p className="text-xl font-semibold">{metrics.vehicleCount}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Average Wait</p>
          <p className="text-xl font-semibold">{metrics.averageWaitTime}s</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Congestion</p>
          <p className={`text-xl font-semibold ${getCongestionColor(metrics.congestionLevel)}`}>
            {metrics.congestionLevel.toUpperCase()}
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Mode</p>
          <p className="text-xl font-semibold text-blue-600">
            {metrics.emergencyMode ? 'EMERGENCY' : (metrics.peakHour ? 'PEAK' : 'NORMAL')}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <p>Efficiency: {light.efficiency}%</p>
        <p>Last Update: {new Date(lastUpdate).toLocaleTimeString()}</p>
      </div>
    </Card>
  );
};