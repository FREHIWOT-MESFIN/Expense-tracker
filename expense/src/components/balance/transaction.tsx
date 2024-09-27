import React, { useState } from 'react';
import { useBalance } from '../context.tsx';

function Transaction() {
  const [registering, setRegistering] = useState(false);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [specificType, setSpecificType] = useState(''); // New state
  const { addTransaction } = useBalance();

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!description || !amount) return; 

    addTransaction(type, description, Number(amount), specificType); 
    setRegistering(false); 
    setDescription(''); 
    setAmount(''); 
    setSpecificType(''); // Reset specificType
  };

  return (
    <div>
      <button className='p-1 bg-blue-400' onClick={() => setRegistering(true)}>
        Add New Transaction
      </button>
      {registering && (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-green-500 flex items-center justify-center bg-black bg-opacity-70'>
          <form onSubmit={handleAddTransaction} className='bg-white p-5 rounded shadow-md flex flex-col w-96 gap-1'>
            <div className='flex justify-between items-center my-1'>
              <span className='text-xl'>Add New Transaction</span>
              <i className="ri-close-large-line text-xl cursor-pointer" onClick={() => setRegistering(false)}></i>
            </div>
            <label htmlFor="desc">Enter Description</label>
            <input 
              className='bg-grey border p-1 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none'
              type="text" 
              name="desc" 
              id="desc" 
              placeholder='Enter transaction description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="amount">Enter Amount</label>
            <input 
              className='bg-grey border p-1 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none'
              type="number" 
              name="amount" 
              id="amount" 
              placeholder='Enter transaction amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="type">Type</label>
            <select 
              className='bg-grey border p-1 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none'
              name="type" 
              id="type" 
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')} 
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {type === 'expense' && (
              <div>
                <label htmlFor="specificType">Specific Type</label>
                <select 
                  className='bg-grey border p-1 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none'
                  name="specificType" 
                  id="specificType"
                  value={specificType} // Set the value
                  onChange={(e) => setSpecificType(e.target.value)} // Update state on change
                >
                  <option value="" disabled>Select an option</option>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="bills">Bills</option>
                </select>
              </div>
            )}
            <div className="flex justify-end mt-3">
              <button className='bg-blue-400 rounded w-20 p-1 m-1' type="button" onClick={() => setRegistering(false)}>Cancel</button>
              <button className='bg-blue-400 rounded w-20 p-1 m-1' type="submit">Add</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Transaction;
