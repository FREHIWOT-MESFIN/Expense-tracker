import React from 'react';
import { Line } from 'react-chartjs-2';
import { useBalance } from '../context.tsx';

const ExpenseLineChart: React.FC = () => {
  const { data } = useBalance();


    // Color mapping for each specific type
    const colorMap = {
        food: 'rgba(255, 99, 132, 1)',      // Red
        transport: 'rgba(54, 162, 235, 1)', // Blue
        bills: 'rgba(75, 192, 192, 1)',     // Teal
      };

      
  // Create a mapping for amounts by specific type
  const amountsByType: { [key: string]: number[] } = {
    food: [],
    transport: [],
    bills: [],
  };

  // Populate amounts by specific type
  data.forEach(transaction => {
    if (transaction.type === 'expense' && transaction.specificType) {
      amountsByType[transaction.specificType].push(transaction.amount);
    }
  });

  const labels = data.map(transaction => transaction.description); // Use descriptions as labels

  const datasets = Object.keys(amountsByType).map(type => ({
    label: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize the type
    data: amountsByType[type],
    fill: false,
    backgroundColor: colorMap[type],
    borderColor: colorMap[type],
    tension: 0.1,
  }));

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='w-[50rem] m-auto'> 
      <h2>Expense Trends</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ExpenseLineChart;
