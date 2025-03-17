
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherData } from '@/services/weatherService';
import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, Wind, Droplets, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import HourlyForecast from '@/components/HourlyForecast';

const WeatherIcon = ({ condition }: { condition: string }) => {
  const iconProps = { className: "w-12 h-12 text-white" };
  switch (condition) {
    case 'sunny': return <Sun {...iconProps} className="sun-pulse" />;
    case 'cloudy': return <Cloud {...iconProps} className="cloud-float" />;
    case 'rainy': return <CloudRain {...iconProps} />;
    case 'stormy': return <CloudLightning {...iconProps} />;
    case 'snowy': return <Snowflake {...iconProps} />;
    default: return <Sun {...iconProps} />;
  }
};

const Index = () => {
  const isMobile = useIsMobile();
  const { data: weatherData, isLoading } = useQuery({
    queryKey: ['weather', 'New York'],
    queryFn: () => getWeatherData('New York'),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue flex items-center justify-center">
        <div className="animate-pulse text-white">Loading weather data...</div>
      </div>
    );
  }

  // Get current date and time
  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue">
      <div className="max-w-md mx-auto p-6 pb-24">
        <div className="text-white mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{weatherData?.location}</h1>
            <div className="text-right">
              <div className="text-sm opacity-80">{formattedDate}</div>
              <div className="text-sm opacity-80">{formattedTime}</div>
            </div>
          </div>
        </div>

        <Card className="weather-card animate-in p-6 bg-white/10 backdrop-blur-md border-white/20">
          <div className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-6xl font-light">{weatherData?.temperature}°</div>
                <div className="text-lg opacity-80 mt-1">
                  {weatherData?.condition.charAt(0).toUpperCase() + weatherData?.condition.slice(1)}
                </div>
              </div>
              <WeatherIcon condition={weatherData?.condition || 'sunny'} />
            </div>
            
            <div className="flex justify-between mt-8">
              <div className="flex items-center">
                <Wind className="w-5 h-5 mr-2" />
                <span>Wind: {weatherData?.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <Droplets className="w-5 h-5 mr-2" />
                <span>Humidity: {weatherData?.humidity}%</span>
              </div>
            </div>
          </div>
        </Card>

        {weatherData?.hourlyForecast && (
          <HourlyForecast hourlyForecast={weatherData.hourlyForecast} />
        )}

        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-5 gap-2">
            {weatherData?.forecast.map((day, index) => (
              <Card key={index} className="p-3 text-center bg-white/10 backdrop-blur-md">
                <div className="text-white">
                  <div className="text-sm font-medium mb-2">{day.day}</div>
                  <WeatherIcon condition={day.condition} />
                  <div className="mt-2 text-lg">{day.temperature}°</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {isMobile && <Navigation />}
    </div>
  );
};

export default Index;
