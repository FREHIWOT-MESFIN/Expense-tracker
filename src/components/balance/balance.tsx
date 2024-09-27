import React from 'react'
import { useBalance} from '../context.tsx'
import ReportPieChart from './chart.tsx';

function Balance() {
const {income, expense, balance} = useBalance();

  return (
    <div className='flex justify-center gap-5 m-5'>
      <div className="expense">
        <div>Current Balance is <h1 className='inline font-bold'>$ {balance}</h1></div>
        <div className="income m-2">
          <h1 className='font-bold text-xl'>${income}</h1>
          <p>Total income</p>
        </div>
        <div className="expense m-2">
        <h1 className='font-bold text-xl'>${expense}</h1>
        <p>Total Expense</p>
        </div>
      </div>
      <ReportPieChart/>
    </div>
  )
}

export default Balance
