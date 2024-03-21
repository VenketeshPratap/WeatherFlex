import axios from 'axios';

const API_KEY = 'GVS5jzXwB3FbgwS6mSijf87muCXshFkU';

export const fetchCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${latitude},${longitude}&fields=temperature,weatherCode&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    throw Error('Failed to fetch current weather data');
  }
}
