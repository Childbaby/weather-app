const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) throw new Error("City not found");
  return await response.json();
};