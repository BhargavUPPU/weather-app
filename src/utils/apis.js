import axios from "axios";

const API_KEY = "7ccd1310134c7365d63e52adc46507b8";
const BASE_URL = "https://api.openweathermap.org/data/2.5";



export const getWeatherByCity = async (city) => {
  const res = await axios.get(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  console.log(res.data);
  return res.data;
};

export const getForecastByCity = async (city) => {
  const res = await axios.get(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  console.log(res.data);
  return res.data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const res = await axios.get(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  return res.data;
};
