
// This is a mock service for demo purposes
// In a real application, this would make API calls to a weather service

export interface WeatherData {
  location: string;
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  }[];
  hourlyForecast: {
    hour: string;
    temperature: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
  }[];
}

const mockWeatherData: Record<string, WeatherData> = {
  'New York': {
    location: 'New York',
    temperature: 18,
    condition: 'cloudy',
    humidity: 65,
    windSpeed: 8,
    forecast: [
      { day: 'Mon', temperature: 19, condition: 'cloudy' },
      { day: 'Tue', temperature: 21, condition: 'sunny' },
      { day: 'Wed', temperature: 20, condition: 'rainy' },
      { day: 'Thu', temperature: 18, condition: 'cloudy' },
      { day: 'Fri', temperature: 22, condition: 'sunny' },
    ],
    hourlyForecast: [
      { hour: 'Now', temperature: 18, condition: 'cloudy' },
      { hour: '1 PM', temperature: 19, condition: 'cloudy' },
      { hour: '2 PM', temperature: 19, condition: 'cloudy' },
      { hour: '3 PM', temperature: 20, condition: 'sunny' },
      { hour: '4 PM', temperature: 21, condition: 'sunny' },
      { hour: '5 PM', temperature: 20, condition: 'cloudy' },
      { hour: '6 PM', temperature: 19, condition: 'cloudy' },
      { hour: '7 PM', temperature: 17, condition: 'rainy' },
      { hour: '8 PM', temperature: 16, condition: 'rainy' },
    ],
  },
};

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  if (mockWeatherData[location]) {
    return mockWeatherData[location];
  }
  
  // Generate random data for unknown locations
  const hourlyForecast = Array.from({ length: 9 }, (_, i) => {
    const hour = i === 0 ? 'Now' : `${i + (new Date()).getHours() % 12 || 12} ${i + (new Date()).getHours() >= 12 ? 'PM' : 'AM'}`;
    return {
      hour,
      temperature: Math.floor(Math.random() * 30),
      condition: ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy'][Math.floor(Math.random() * 5)] as WeatherData['condition'],
    };
  });
  
  return {
    location,
    temperature: Math.floor(Math.random() * 30),
    condition: ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy'][Math.floor(Math.random() * 5)] as WeatherData['condition'],
    humidity: Math.floor(Math.random() * 100),
    windSpeed: Math.floor(Math.random() * 20),
    forecast: Array.from({ length: 5 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
      temperature: Math.floor(Math.random() * 30),
      condition: ['sunny', 'cloudy', 'rainy', 'stormy', 'snowy'][Math.floor(Math.random() * 5)] as WeatherData['condition'],
    })),
    hourlyForecast,
  };
};
