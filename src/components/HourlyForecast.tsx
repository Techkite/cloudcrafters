
import React from 'react';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { WeatherData } from '@/services/weatherService';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HourlyForecastProps {
  hourlyForecast: WeatherData['hourlyForecast'];
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconProps = { className: "w-7 h-7 text-white" };
  switch (condition) {
    case 'sunny': return <Sun {...iconProps} />;
    case 'cloudy': return <Cloud {...iconProps} />;
    case 'rainy': return <CloudRain {...iconProps} />;
    case 'stormy': return <CloudLightning {...iconProps} />;
    case 'snowy': return <Snowflake {...iconProps} />;
    default: return <Sun {...iconProps} />;
  }
};

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyForecast }) => {
  return (
    <div className="mt-6">
      <h2 className="text-white text-xl font-semibold mb-4">Hourly Forecast</h2>
      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          {hourlyForecast.map((hour, index) => (
            <Card 
              key={index} 
              className="min-w-20 p-3 text-center bg-white/10 backdrop-blur-md flex-shrink-0"
            >
              <div className="text-white">
                <div className="text-sm font-medium mb-2">{hour.hour}</div>
                <WeatherIcon condition={hour.condition} />
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
