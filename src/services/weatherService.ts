
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
  },
};

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return mockWeatherData[location] || {
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
  };
};
