import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherChart from './components/WeatherChart';
import Insights from './components/Insights';
import { fetchWeather } from './services/weatherAPI';
import './App.css';

function App() {
  const [current, setCurrent] = useState(null);
  const [dailyData, setDailyData] = useState([]);

  const processForecast = (data) => {
    const dailyTemps = {};
    data.list.forEach(item => {
      // Split date and time to group by date
      const date = item.dt_txt.split(" ")[0]; 
      if (!dailyTemps[date]) dailyTemps[date] = [];
      dailyTemps[date].push(item.main.temp); 
    });

    // Calculate daily averages as required
    return Object.keys(dailyTemps).map(date => ({
      date,
      temp: Math.round(dailyTemps[date].reduce((a, b) => a + b) / dailyTemps[date].length) 
    }));
  };

  const handleSearch = async (city) => {
    try {
      const data = await fetchWeather(city); 
      const processed = processForecast(data); 
      setCurrent({
        name: data.city.name, 
        temp: Math.round(data.list[0].main.temp), 
        condition: data.list[0].weather[0].main 
      });
      setDailyData(processed);
    } catch (err) {
      alert("City not found. Please try again."); 
    }
  };

  return (
    <div className="app-wrapper">
      <h1 className="main-title">Weather Trend Planner</h1> 
      <div className="browser-window">
        <SearchBar onSearch={handleSearch} /> 
        {current && (
          <div className="main-content">
            <CurrentWeather data={current} /> 
            <div className="chart-section">
              <h3 className="section-label">Temperature Trend</h3> 
              <WeatherChart data={dailyData} /> 
            </div>
            <Insights data={dailyData} /> 
          </div>
        )}
      </div>
    </div>
  );
}
export default App;