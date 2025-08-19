"use client";

import { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_WEATHER_BY_CITY,
  GET_FORECAST_BY_CITY,
  GET_WEATHER_BY_COORDS,
} from "../lib/quries";

import WeatherForm from "../components/WeatherForm";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import Loader from "../components/Loader";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const [getWeather, { data: weatherData, loading }] =
    useLazyQuery(GET_WEATHER_BY_CITY);
  const [getForecast] = useLazyQuery(GET_FORECAST_BY_CITY);
  const [getWeatherCoords] = useLazyQuery(GET_WEATHER_BY_COORDS);

  // 🔹 Fetch weather by city
  const handleSearch = async () => {
    try {
      const weatherRes = await getWeather({ variables: { city } });
      const forecastRes = await getForecast({ variables: { city } });
      setForecast(forecastRes.data.forecastByCity.list.slice(0, 5));
    } catch (err) {
      console.error(err);
      alert("City not found!");
    }
  };

  // 🔹 Detect user location and fetch weather automatically
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const coordsRes = await getWeatherCoords({
            variables: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
          });

          const cityName = coordsRes.data.weatherByCoords.name;
          setCity(cityName);

          const forecastRes = await getForecast({ variables: { city: cityName } });
          setForecast(forecastRes.data.forecastByCity.list.slice(0, 5));

          await getWeather({ variables: { city: cityName } });
        } catch (err) {
          console.error(err);
        }
      });
    }
  };

  // 🔹 Run location detection automatically on first load
  useEffect(() => {
    detectLocation();
  }, []);

  const weather = weatherData?.weatherByCity;

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>

        <WeatherForm city={city} setCity={setCity} onSearch={handleSearch} onDetect={detectLocation} />

        {loading ? (
          <Loader />
        ) : weather ? (
          <>
            <WeatherCard weather={weather} />
            <ForecastCard forecast={forecast} />
          </>
        ) : (
          <p className="text-center text-gray-500">Search for a city to see weather updates</p>
        )}
      </div>
    </div>
  );
}
