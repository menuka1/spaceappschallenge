// Mock IoT device data
export const iotDevices = {
  weatherStations: [
    {
      id: 'ws-001',
      name: 'WeatherStation Alpha',
      location: 'Research Lab A',
      status: 'online',
      metrics: {
        temperature: 22.5,
        humidity: 65,
        pressure: 1013.25,
        windSpeed: 12,
        rainfall: 0,
        solarRadiation: 850,
      },
      lastUpdate: new Date().toISOString(),
      accuracy: 98.5,
    },
    {
      id: 'ws-002',
      name: 'WeatherStation Beta',
      location: 'Research Lab B',
      status: 'online',
      metrics: {
        temperature: 23.1,
        humidity: 62,
        pressure: 1012.8,
        windSpeed: 8,
        rainfall: 0.2,
        solarRadiation: 750,
      },
      lastUpdate: new Date().toISOString(),
      accuracy: 97.8,
    }
  ],
  trafficLights: [
    {
      id: 'tl-001',
      name: 'Junction Alpha',
      location: 'Main Lab Entrance',
      status: 'online',
      currentState: 'green',
      metrics: {
        vehicleCount: 45,
        averageWaitTime: 25,
        congestionLevel: 'low',
        emergencyMode: false,
        peakHour: false,
      },
      lastUpdate: new Date().toISOString(),
      efficiency: 94.2,
    },
    {
      id: 'tl-002',
      name: 'Junction Beta',
      location: 'Research Complex',
      status: 'online',
      currentState: 'red',
      metrics: {
        vehicleCount: 78,
        averageWaitTime: 45,
        congestionLevel: 'medium',
        emergencyMode: false,
        peakHour: true,
      },
      lastUpdate: new Date().toISOString(),
      efficiency: 92.8,
    }
  ]
};

// Simulated real-time data updates
export const generateWeatherData = (baseMetrics) => {
  return {
    temperature: baseMetrics.temperature + (Math.random() * 2 - 1),
    humidity: Math.max(0, Math.min(100, baseMetrics.humidity + (Math.random() * 4 - 2))),
    pressure: baseMetrics.pressure + (Math.random() * 0.5 - 0.25),
    windSpeed: Math.max(0, baseMetrics.windSpeed + (Math.random() * 4 - 2)),
    rainfall: Math.max(0, baseMetrics.rainfall + (Math.random() * 0.2)),
    solarRadiation: Math.max(0, baseMetrics.solarRadiation + (Math.random() * 100 - 50)),
  };
};

export const generateTrafficData = (baseMetrics) => {
  const isPeak = isPeakHour();
  const vehicleCount = Math.max(0, baseMetrics.vehicleCount + 
    Math.floor(Math.random() * (isPeak ? 20 : 10) - (isPeak ? 5 : 5)));

  return {
    vehicleCount,
    averageWaitTime: Math.max(0, baseMetrics.averageWaitTime + (Math.random() * 10 - 5)),
    congestionLevel: calculateCongestionLevel(vehicleCount),
    emergencyMode: Math.random() < 0.05, // 5% chance of emergency mode
    peakHour: isPeak,
  };
};

const calculateCongestionLevel = (vehicleCount) => {
  if (vehicleCount < 50) return 'low';
  if (vehicleCount < 100) return 'medium';
  return 'high';
};

const isPeakHour = () => {
  const hour = new Date().getHours();
  // Morning peak: 7 AM to 9 AM
  // Evening peak: 4 PM to 6 PM
  return (hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18);
};