import React from 'react';
import { useBalance } from '../context.tsx';
import ExpenseLineChart from './expenseChart.tsx';

function Report() {
  const { data } = useBalance();

  const expenseData = data.filter(dat => dat.type === 'expense');
  const incomeData = data.filter(dat => dat.type === 'income');

  return (
    <div>
      <div className='flex gap-1 mb-5'>
        <div className="expense-tra shadow-md flex-1 p-2">
          <h3 className='text-red-400 p-1'>Expense</h3>
          {expenseData.map((item, index) => (
            <div key={index} className="tra-data flex justify-between m-1 bg-red-100 border border-red-400 rounded b p-2 items-center">
              <p>{item.description}</p>
              <p className='bg-red-400 rounded text-white p-1'>{item.specificType}</p>
              <p>${item.amount}</p>
            </div>
          ))}
        </div>
        <div className="income-tra shadow-md flex-1 p-2">
          <h3 className='text-red-400 p-1'>Income</h3>
          {incomeData.map((item, index) => (
            <div key={index} className="tra-data flex justify-between m-1 bg-blue-100 border border-blue-400 rounded p-2 items-center">
              <p>{item.description}</p>
              <p>${item.amount}</p>
            </div>
          ))}
        </div>
      </div>
      {expenseData.length > 0 && (
       <ExpenseLineChart/>
      )}
    </div>
  );
}

export default Report;
