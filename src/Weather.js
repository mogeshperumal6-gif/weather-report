import { useState } from "react";
import axios from "axios";
import "./Weather.css";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (e) => {
    e.preventDefault();
    const query = city.trim();

    if (!query) {
      setWeather(null);
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Template literal builds the URL dynamically from user input
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        query
      )}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(url);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response?.status === 404) {
        setError(`City "${query}" not found. Check the spelling and try again.`);
      } else if (err.response?.status === 401) {
        setError("Invalid or not-yet-active API key. Check your .env file.");
      } else if (!err.response) {
        setError("Network error. Check your internet connection.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="weather">
      <form className="search-form" onSubmit={fetchWeather}>
        <input
          type="text"
          placeholder="Enter city name (e.g. Salem)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}

      {weather && (
        <article className="card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <div className="main-info">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="temp">{Math.round(weather.main.temp)}°C</p>
          </div>

          <p className="description">{weather.weather[0].description}</p>

          <div className="details">
            <div>
              <span>Feels like</span>
              <strong>{Math.round(weather.main.feels_like)}°C</strong>
            </div>
            <div>
              <span>Humidity</span>
              <strong>{weather.main.humidity}%</strong>
            </div>
            <div>
              <span>Wind</span>
              <strong>{weather.wind.speed} m/s</strong>
            </div>
            <div>
              <span>Pressure</span>
              <strong>{weather.main.pressure} hPa</strong>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default Weather;