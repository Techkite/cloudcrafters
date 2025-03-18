
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart, MapPin, Trash2 } from 'lucide-react';
import { getFavorites, removeFromFavorites, getWeatherData } from '@/services/weatherService';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FavoriteWeather {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

const Favorites = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [favoriteWeather, setFavoriteWeather] = useState<FavoriteWeather[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const favCities = getFavorites();
      setFavorites(favCities);
    };
    loadFavorites();
  }, []);

  // Fetch weather data for favorites
  useEffect(() => {
    const fetchFavoritesWeather = async () => {
      if (favorites.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const weatherPromises = favorites.map(async (city) => {
          try {
            const data = await getWeatherData(city);
            return {
              city,
              temperature: data.temperature,
              condition: data.condition,
              icon: data.conditionIcon
            };
          } catch (error) {
            console.error(`Error fetching weather for ${city}:`, error);
            return { 
              city, 
              temperature: 0, 
              condition: 'Unknown',
              icon: '' 
            };
          }
        });

        const weatherData = await Promise.all(weatherPromises);
        setFavoriteWeather(weatherData);
      } catch (error) {
        console.error("Error fetching favorites weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesWeather();
  }, [favorites]);

  const handleRemoveFavorite = (city: string) => {
    removeFromFavorites(city);
    setFavorites(prev => prev.filter(c => c !== city));
    setFavoriteWeather(prev => prev.filter(w => w.city !== city));
  };

  const handleCityClick = (city: string) => {
    navigate('/', { state: { city } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue to-weather-light-blue p-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-8">
          <Heart className="w-8 h-8 text-white mr-3" />
          <h1 className="text-3xl font-bold text-white">Favorites</h1>
        </div>

        {loading ? (
          <div className="flex justify-center mt-12">
            <div className="animate-pulse text-white">Loading favorites...</div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center text-white mt-12">
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="opacity-70 mb-4">
              Add cities to your favorites to quickly access their weather information.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-md"
            >
              Go to Search
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteWeather.map((item) => (
              <Card 
                key={item.city} 
                className="p-4 bg-white/10 backdrop-blur-md border-white/20 relative"
              >
                <div 
                  className="flex items-center justify-between text-white cursor-pointer"
                  onClick={() => handleCityClick(item.city)}
                >
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-white/80" />
                    <span className="font-medium">{item.city}</span>
                  </div>
                  <div className="flex items-center">
                    <img src={item.icon} alt={item.condition} className="w-9 h-9 mr-1" />
                    <span className="text-xl font-semibold">{item.temperature}°</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(item.city);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-white/70 hover:text-white/100" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {isMobile && <Navigation />}
    </div>
  );
};

export default Favorites;
