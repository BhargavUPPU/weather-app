"use client";
export default function ForecastCard({ forecast }) {
  if (!forecast?.length) return null;

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">5-Day Forecast</h3>
      <div className="grid grid-cols-2 gap-4">
        {forecast.map((f, idx) => (
          <div key={idx} className="bg-blue-50 p-2 rounded shadow">
            <p>{new Date(f.dt_txt).toLocaleString()}</p>
            <p>Temp: {f.main.temp}°C</p>
            <p>{f.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
