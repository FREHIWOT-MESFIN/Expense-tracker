import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the transaction
type Transaction = {
  type: 'income' | 'expense';
  description: string;
  amount: number;
  specificType?: string; 
};

// Define the shape of the context value
interface BalanceContextType {
  income: number;
  expense: number;
  balance: number;
  data: Transaction[];
  setIncome: React.Dispatch<React.SetStateAction<number>>;
  setExpense: React.Dispatch<React.SetStateAction<number>>;
  addTransaction: (type: 'income' | 'expense', description: string, amount: number, specificType?: string) => void;
}

// Create the context
const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

// Define the provider component
export const BalanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [income, setIncome] = useState<number>(0);
  const [expense, setExpense] = useState<number>(0);
  const [data, setData] = useState<Transaction[]>([]);

  const balance = income - expense;

  const addTransaction = (type: 'income' | 'expense', description: string, amount: number, specificType?: string) => {
    const transaction: Transaction = { type, description, amount, specificType }; 
    setData((prevData) => [...prevData, transaction]);
  
    if (type === 'income') {
      setIncome((prev) => prev + amount);
    } else {
      setExpense((prev) => prev + amount);
    }
  };
  

  return (
    <BalanceContext.Provider value={{ income, setIncome, expense, setExpense, balance, data, addTransaction }}>
      {children}
    </BalanceContext.Provider>
  );
};

// Custom hook to use the Balance context
export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalance must be used within a BalanceProvider');
  }
  return context;
};

export default BalanceContext;
