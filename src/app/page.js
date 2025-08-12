"use client";
import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  GET_WEATHER_BY_CITY,
  GET_FORECAST_BY_CITY,
  GET_WEATHER_BY_COORDS,
} from "../lib/quries";

export default function Home() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);

  const [getWeather, { data: weatherData, loading }] = useLazyQuery(GET_WEATHER_BY_CITY);
  const [getForecast] = useLazyQuery(GET_FORECAST_BY_CITY);
  const [getWeatherCoords] = useLazyQuery(GET_WEATHER_BY_COORDS);

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
        } catch (err) {
          console.error(err);
        }
      });
    }
  };

  const weather = weatherData?.weatherByCity;

  return (
    <div className="min-h-screen bg-blue-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Weather App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-grow border border-gray-300 rounded px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={detectLocation}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Use Location
          </button>
        </div>

        {loading ? (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        ) : weather ? (
          <div>
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <p className="text-gray-700">{weather.weather[0].description}</p>
              <p className="text-2xl">{weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">5-Day Forecast</h3>
              <div className="grid grid-cols-2 gap-4">
                {forecast.map((f, idx) => (
                  <div key={idx} className="bg-blue-50 p-2 rounded">
                    <p>{new Date(f.dt_txt).toLocaleString()}</p>
                    <p>Temp: {f.main.temp}°C</p>
                    <p>{f.weather[0].description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
