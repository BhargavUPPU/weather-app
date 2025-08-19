"use client";
import { useState } from "react";

export default function WeatherForm({ city, setCity, onSearch, onDetect }) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-grow border border-gray-300 rounded px-4 py-2"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      <button
        onClick={onDetect}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Use Location
      </button>
    </div>
  );
}
