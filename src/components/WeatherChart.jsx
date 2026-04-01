import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ data }) => {
  // Map dates to Day Names (Mon, Tue, etc.)
  const labels = data.map(d => {
    const date = new Date(d.date);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const chartConfig = {
    labels: labels, // X-axis: Days of the week [cite: 33]
    datasets: [{
      label: 'Temperature',
      data: data.map(d => d.temp),
      borderColor: '#333',
      backgroundColor: '#333',
      borderWidth: 2,
      pointRadius: 4,
      tension: 0.1
    }]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false } // Hide legend to match wireframe
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)', // Y-axis title 
          font: { weight: 'bold' }
        },
        min: 15, // Matches the wireframe starting point
        max: 30
      }
    }
  };

  return (
    <div style={{ height: '250px', marginTop: '20px' }}>
      <Line data={chartConfig} options={options} />
    </div>
  );
};

export default WeatherChart;