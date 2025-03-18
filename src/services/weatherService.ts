import { toast } from "sonner";

// Weather API configuration
const API_KEY = "678178a451564131c56434c542a8fe43";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  windSpeed: number;
  sunrise: string;
  sunset: string;
  forecast: {
    day: string;
    temperature: number;
    condition: string;
    conditionIcon: string;
  }[];
  hourlyForecast: {
    hour: string;
    temperature: number;
    condition: string;
    conditionIcon: string;
  }[];
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    // Current weather data
    const currentResponse = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!currentResponse.ok) {
      throw new Error(
        `Failed to fetch weather: ${currentResponse.status} ${currentResponse.statusText}`
      );
    }
    
    const currentData = await currentResponse.json();
    
    // Forecast data (5 day / 3 hour)
    const forecastResponse = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!forecastResponse.ok) {
      throw new Error(
        `Failed to fetch forecast: ${forecastResponse.status} ${forecastResponse.statusText}`
      );
    }
    
    const forecastData = await forecastResponse.json();
    
    // Process current weather
    const weatherData: WeatherData = {
      location: currentData.name,
      temperature: Math.round(currentData.main.temp),
      feelsLike: Math.round(currentData.main.feels_like),
      condition: currentData.weather[0].main,
      conditionIcon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed),
      sunrise: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sunset: new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      forecast: [],
      hourlyForecast: [],
    };
    
    // Process 5-day forecast (taking only the data point at noon for each day)
    const processedDays = new Set<string>();
    weatherData.forecast = forecastData.list
      .filter((item: any) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString();
        const hour = date.getHours();
        
        // Take only one forecast per day (around noon)
        if (hour >= 11 && hour <= 13 && !processedDays.has(day)) {
          processedDays.add(day);
          return true;
        }
        return false;
      })
      .slice(0, 5)
      .map((item: any) => {
        const date = new Date(item.dt * 1000);
        return {
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].main,
          conditionIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        };
      });
    
    // Process hourly forecast for the next 24 hours
    weatherData.hourlyForecast = forecastData.list
      .slice(0, 8) // Next 24 hours (3-hour intervals)
      .map((item: any) => {
        const date = new Date(item.dt * 1000);
        return {
          hour: date.toLocaleTimeString([], { hour: '2-digit' }),
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].main,
          conditionIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        };
      });
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    toast.error("Failed to fetch weather data. Please try again.");
    throw error;
  }
};

// Function to suggest activities based on weather
export const suggestActivity = (weatherData: WeatherData): string => {
  const { condition, temperature } = weatherData;
  const lowercaseCondition = condition.toLowerCase();
  
  if (lowercaseCondition.includes('rain') || lowercaseCondition.includes('drizzle')) {
    return "Perfect weather for indoor activities! Visit a museum, read a book, or enjoy a cozy coffee shop.";
  } else if (lowercaseCondition.includes('snow')) {
    return "It's snowing! Build a snowman, go sledding, or enjoy hot chocolate by the window.";
  } else if (lowercaseCondition.includes('clear') && temperature > 22) {
    return "Gorgeous day! Perfect for a picnic, hiking, or visiting the beach.";
  } else if (lowercaseCondition.includes('clear') && temperature < 10) {
    return "Clear but chilly! Bundle up for a nature walk or enjoy the stars tonight.";
  } else if (lowercaseCondition.includes('cloud')) {
    return "Nice day for outdoor activities like walking, cycling, or visiting a park.";
  } else if (lowercaseCondition.includes('storm') || lowercaseCondition.includes('thunder')) {
    return "Stay indoors! Perfect time for movies, board games, or cooking a nice meal.";
  } else if (temperature > 28) {
    return "It's hot! Consider swimming, having ice cream, or finding shaded outdoor activities.";
  }
  
  return "Great day to explore the city, visit local attractions, or enjoy outdoor dining!";
};

// Save city to recent searches
export const saveToRecentSearches = (city: string) => {
  try {
    const recentSearches = getRecentSearches();
    
    // Remove if already exists (to move it to the top)
    const updatedSearches = recentSearches.filter((item) => item !== city);
    
    // Add to beginning of array
    updatedSearches.unshift(city);
    
    // Keep only the last 5 searches
    const limitedSearches = updatedSearches.slice(0, 5);
    
    localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
  } catch (error) {
    console.error("Error saving recent search:", error);
  }
};

// Get recent searches
export const getRecentSearches = (): string[] => {
  try {
    const searches = localStorage.getItem('recentSearches');
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error("Error getting recent searches:", error);
    return [];
  }
};

// Add city to favorites
export const addToFavorites = (city: string) => {
  try {
    const favorites = getFavorites();
    
    // Only add if not already in favorites
    if (!favorites.includes(city)) {
      favorites.push(city);
      localStorage.setItem('favoritesCities', JSON.stringify(favorites));
      toast.success(`${city} added to favorites`);
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    toast.error("Failed to add to favorites");
  }
};

// Remove city from favorites
export const removeFromFavorites = (city: string) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((item) => item !== city);
    localStorage.setItem('favoritesCities', JSON.stringify(updatedFavorites));
    toast.success(`${city} removed from favorites`);
  } catch (error) {
    console.error("Error removing from favorites:", error);
    toast.error("Failed to remove from favorites");
  }
};

// Get favorite cities
export const getFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem('favoritesCities');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

// Check if city is in favorites
export const isInFavorites = (city: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(city);
};
