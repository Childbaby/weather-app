export function processForecast(data) {
  const dailyTemps = {};
  
  data.list.forEach(item => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyTemps[date]) {
      dailyTemps[date] = [];
    }
    dailyTemps[date].push(item.main.temp);
  });
  
  const result = Object.keys(dailyTemps).map(date => {
    const temps = dailyTemps[date];
    const avgTemp = temps.reduce((a, b) => a + b) / temps.length;
    return { date, temp: Math.round(avgTemp) };
  });
  
  return result.slice(0, 7);
}

export function findBestDay(dailyForecast) {
  if (!dailyForecast || dailyForecast.length === 0) return null;
  let bestDay = dailyForecast[0];
  for (let day of dailyForecast) {
    if (day.temp > bestDay.temp) bestDay = day;
  }
  return bestDay;
}
