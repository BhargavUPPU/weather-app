"use client";
export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="text-center mb-4">
      <h2 className="text-xl font-semibold">{weather.name}</h2>
      <p className="text-gray-700">{weather.weather[0].description}</p>
      <p className="text-2xl">{weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}
