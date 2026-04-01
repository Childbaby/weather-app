const CurrentWeather = ({ data }) => (
  <div className="weather-card">
    <div className="city-header">{data.name}</div>
    <div className="weather-details">
      <p>Current Temperature: {data.temp}°C</p>
      <p>Condition: {data.condition}</p>
    </div>
  </div>
);
export default CurrentWeather;