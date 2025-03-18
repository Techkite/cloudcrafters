
import React from 'react';
import { Card } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HourlyForecastProps {
  hourlyForecast: WeatherData['hourlyForecast'];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyForecast }) => {
  return (
    <div className="mt-6">
      <h2 className="text-white text-xl font-semibold mb-4">Hourly Forecast</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          {hourlyForecast.map((hour, index) => (
            <Card 
              key={index} 
              className="min-w-20 p-3 text-center bg-white/10 backdrop-blur-md flex-shrink-0 border-white/20"
            >
              <div className="text-white">
                <div className="text-sm font-medium mb-2">{hour.hour}</div>
                <img src={hour.conditionIcon} alt={hour.condition} className="w-12 h-12 mx-auto" />
                <div className="mt-2 text-lg">{hour.temperature}°</div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default HourlyForecast;
