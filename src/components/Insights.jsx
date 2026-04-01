const Insights = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Find the day with the highest temperature for the "Best Day"
  const bestDayObj = data.reduce((prev, curr) => (prev.temp > curr.temp ? prev : curr), data[0]);
  
  // Convert date string to Day Name (e.g., "Friday")
  const dayName = new Date(bestDayObj.date).toLocaleDateString('en-US', { weekday: 'long' });
  
  let message = `Best day to go out: ${dayName} (${bestDayObj.temp}°C)`; // Matches [cite: 42]

  // Check for Requirement Warnings [cite: 48, 49]
  if (bestDayObj.temp > 35) {
    message = `Heat warning: ${dayName} expected to reach ${bestDayObj.temp}°C`;
  } else if (bestDayObj.temp < 5) {
    message = `Cold warning: ${dayName} expected to be ${bestDayObj.temp}°C`;
  }

  return (
    <div className="insight-box">
      <div className="insight-header">Insight:</div>
      <div className="insight-body">
        {message}
      </div>
    </div>
  );
};

export default Insights;