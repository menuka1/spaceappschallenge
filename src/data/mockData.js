export const mockPods = [
  {
    id: 'pod-1',
    title: 'BioLab Alpha',
    type: 'Pharma',
    description: 'Advanced pharmaceutical research pod with microgravity crystallization capabilities',
    pricePerMonth: 85000,
    availableDurations: [3, 6, 12],
    features: ['Temperature Control', 'Automated Sample Processing', 'Real-time Data Transfer'],
    image: '/images/pod-pharma.jpg'
  },
  {
    id: 'pod-2',
    title: 'MatSci Beta',
    type: 'Materials',
    description: 'Materials science research pod specialized in metal alloy formation in microgravity',
    pricePerMonth: 95000,
    availableDurations: [3, 6, 12],
    features: ['Vacuum Chamber', 'Thermal Processing Unit', 'High-Resolution Imaging'],
    image: '/images/pod-materials.jpg'
  },
  {
    id: 'pod-3',
    title: 'AgroSpace One',
    type: 'Agriculture',
    description: 'Plant growth and agricultural research pod with controlled environment',
    pricePerMonth: 75000,
    availableDurations: [3, 6, 12],
    features: ['LED Growth Lights', 'Nutrient Delivery System', 'Environmental Monitoring'],
    image: '/images/pod-agro.jpg'
  },
  {
    id: 'pod-4',
    title: 'MicroG Lab',
    type: 'Physics',
    description: 'Physics research pod for fluid dynamics and particle behavior studies',
    pricePerMonth: 90000,
    availableDurations: [3, 6, 12],
    features: ['High-Speed Cameras', 'Particle Tracking', 'Fluid Management System'],
    image: '/images/pod-physics.jpg'
  },
  {
    id: 'pod-5',
    title: 'BioTech Prime',
    type: 'Biotech',
    description: 'Biotechnology research pod for protein crystallization and cell culture',
    pricePerMonth: 88000,
    availableDurations: [3, 6, 12],
    features: ['Incubation Chamber', 'Microscopy Unit', 'Bio-sample Storage'],
    image: '/images/pod-biotech.jpg'
  },
  {
    id: 'pod-6',
    title: 'ChemLab X',
    type: 'Chemistry',
    description: 'Chemical research pod with advanced separation and analysis capabilities',
    pricePerMonth: 92000,
    availableDurations: [3, 6, 12],
    features: ['Chemical Storage', 'Spectroscopy Unit', 'Waste Management'],
    image: '/images/pod-chemistry.jpg'
  }
];

export const mockExperimentResults = {
  'pod-1': {
    graphs: [
      {
        title: 'Crystal Growth Rate',
        type: 'line',
        data: Array.from({ length: 10 }, (_, i) => ({
          day: i + 1,
          growth: Math.random() * 5 + 2
        }))
      },
      {
        title: 'Temperature Stability',
        type: 'area',
        data: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          temp: 20 + Math.sin(i * 0.5) + Math.random()
        }))
      }
    ],
    metrics: {
      successRate: '94%',
      samplesProcessed: 127,
      dataPoints: 15420
    }
  }
  // Add more mock results for other pods as needed
};