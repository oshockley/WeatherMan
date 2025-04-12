import axios from 'axios';

const WEATHER_API_URL = process.env.API_BASE_URL;
const API_KEY = process.env.API_KEY;

interface WeatherData {
  lat: number;
  lon: number;
}

export const getWeatherData = async (city: string) => {
  try {
    // Make the API request
    const response = await axios.get(`${WEATHER_API_URL}/data/2.5/forecast`, {
      params: { q: city, appid: API_KEY },
    });

    // Type checking
    const data = response.data as { list: WeatherData[] };

    if (!data.list || !data.list.length) throw new Error('City not found');

    const { lat, lon } = data.list[0];  // Accessing the first item from list

    return { lat, lon };  // Return lat, lon or more data as needed
  } catch (error: any) {  // Use `any` to handle the error properly
    throw new Error(`Error fetching weather data for ${city}: ${error.message}`);
  }
};
