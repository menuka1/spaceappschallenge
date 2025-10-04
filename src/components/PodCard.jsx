import { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { calculateBookingPrice } from '../data/localStorage';

export const PodCard = ({ pod, onBook }) => {
  const [selectedDuration, setSelectedDuration] = useState(pod.availableDurations[0]);
  
  return (
    <Card className="flex flex-col h-full">
      <div className="relative h-48 mb-4 -mx-6 -mt-6 rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{pod.title}</h3>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          {pod.type}
        </div>
        
        <p className="text-gray-600 mb-4">{pod.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Key Features:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {pod.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Duration:</label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value))}
              className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {pod.availableDurations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration} Months
                </option>
              ))}
            </select>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Total Price:</div>
            <div className="text-xl font-bold text-blue-600">
              ${(calculateBookingPrice(pod.pricePerMonth, selectedDuration) / 1000).toFixed(0)}k
            </div>
          </div>
        </div>
        
        <Button
          onClick={() => onBook({ ...pod, selectedDuration })}
          className="w-full"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};