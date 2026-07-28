import { Routes, Route } from "react-router-dom";

import AddTransaction from "./pages/AddTransaction";
import TransactionsPage from "./pages/TransactionsPage";

// Main Application
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<AddTransaction />}
      />

      <Route
        path="/transactions"
        element={<TransactionsPage />}
      />
    </Routes>
  );
}

export default App;