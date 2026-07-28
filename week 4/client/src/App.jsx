import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />

      <Route
        path="/transactions"
        element={<TransactionsPage />}
      />
    </Routes>
  );
}

export default App;