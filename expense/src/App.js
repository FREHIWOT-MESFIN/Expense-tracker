import Balance from "./components/balance/balance.tsx";
import Transaction from "./components/balance/transaction.tsx";
import Report from "./components/report/report.tsx";
import { BalanceProvider} from './components/context.tsx'

function App() {
  return (
    <BalanceProvider>
      <div className="h-screen grid grid-cols-1 gap-1">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-3xl font-bold underline">Expense.io</h1>
          <Transaction />
        </div>
        <Balance />
        <div className="align-self-end bg-grey-">
          <Report />
        </div>
      </div>
    </BalanceProvider>
  );
}

export default App;
