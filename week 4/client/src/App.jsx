import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AddTodoForm from "./pages/AddTodoForm";
import TodoList from "./pages/TodoList";

import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "./api/transactionApi";

export default function App() {
  // Store all transactions
  const [transactions, setTransactions] = useState([]);

  // Load transactions when the application starts
  useEffect(() => {
    loadTransactions();
  }, []);

  // Get all transactions from the backend
  async function loadTransactions() {
    const data = await getTransactions();

    setTransactions(data);
  }

  // Add a new transaction
  async function handleAddTransaction(transaction) {
    await addTransaction(transaction);

    // Refresh the transaction list
    loadTransactions();
  }

  // Delete a transaction
  async function handleDelete(id) {
    await deleteTransaction(id);

    // Refresh the transaction list
    loadTransactions();
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TodoList
            transactions={transactions}
            onDelete={handleDelete}
          />
        }
      />

      <Route
        path="/add"
        element={
          <AddTodoForm
            onAdd={handleAddTransaction}
          />
        }
      />
    </Routes>
  );
}