
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getWeatherData, suggestActivity, saveToRecentSearches } from '@/services/weatherService';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import HourlyForecast from '@/components/HourlyForecast';
import SearchBar from '@/components/SearchBar';
import { Wind, Droplets, Sunrise, Sunset } from 'lucide-react';
import ActivitySuggestion from '@/components/ActivitySuggestion';
import FavoriteButton from '@/components/FavoriteButton';
import { toast } from 'sonner';

const Index = () => {
  const isMobile = useIsMobile();
  const [city, setCity] = useState('London');

  // Get current date and time
  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);
  const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const { data: weatherData, isLoading, isError, refetch } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => getWeatherData(city),
    onError: () => {
      toast.error(`Could not find weather data for ${city}`);
    }
  });

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
  };

  useEffect(() => {
    if (city) {
      refetch();
    }
  }, [city, refetch]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue flex items-center justify-center">
        <div className="animate-pulse text-white">Loading weather data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue p-6">
        <SearchBar onSearch={handleSearch} initialValue={city} />
        <div className="text-white text-center mt-10">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>Could not find weather data for {city}. Please try another city.</p>
        </div>
        {isMobile && <Navigation />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue">
      <div className="max-w-md mx-auto p-6 pb-24">
        <div className="text-white mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">Weather</h1>
            <div className="text-right">
              <div className="text-sm opacity-80">{formattedDate}</div>
              <div className="text-sm opacity-80">{formattedTime}</div>
            </div>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} initialValue={city} />

        <Card className="weather-card relative p-6 bg-white/10 backdrop-blur-md border-white/20">
          <div className="text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-semibold mb-1">{weatherData?.location}</div>
                <div className="text-6xl font-light">{weatherData?.temperature}°</div>
                <div className="text-lg opacity-80 mt-1">
                  {weatherData?.condition}
                </div>
                <div className="text-sm opacity-70 mt-1">
                  Feels like {weatherData?.feelsLike}°
                </div>
              </div>
              <img 
                src={weatherData?.conditionIcon} 
                alt={weatherData?.condition} 
                className="w-24 h-24"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <Wind className="w-5 h-5 mr-2" />
                <span>{weatherData?.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <Droplets className="w-5 h-5 mr-2" />
                <span>{weatherData?.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Sunrise className="w-5 h-5 mr-2" />
                <span>{weatherData?.sunrise}</span>
              </div>
              <div className="flex items-center">
                <Sunset className="w-5 h-5 mr-2" />
                <span>{weatherData?.sunset}</span>
              </div>
            </div>
          </div>
          
          <FavoriteButton city={city} />
        </Card>

        {weatherData?.hourlyForecast && (
          <HourlyForecast hourlyForecast={weatherData.hourlyForecast} />
        )}

        <ActivitySuggestion activity={suggestActivity(weatherData!)} />

        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-5 gap-2">
            {weatherData?.forecast.map((day, index) => (
              <Card key={index} className="p-3 text-center bg-white/10 backdrop-blur-md border-white/20">
                <div className="text-white">
                  <div className="text-sm font-medium mb-2">{day.day}</div>
                  <img src={day.conditionIcon} alt={day.condition} className="w-8 h-8 mx-auto" />
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
