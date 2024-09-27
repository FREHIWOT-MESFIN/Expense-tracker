import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useBalance } from '../context.tsx';

// Register necessary components
Chart.register(...registerables);

const ReportPieChart = () => {
  const { data } = useBalance();

  // Calculate total income and total expenses
  const expenseTotal = data
    .filter(dat => dat.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const incomeTotal = data
    .filter(dat => dat.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Chart data
  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount',
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 215, 0, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 215, 0, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'as const,
      },
    },
  };

  return (
    <div className="m-5">
      <h3 className="text-center">Income vs Expense</h3>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default ReportPieChart;
