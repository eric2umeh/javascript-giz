import { Link } from "react-router-dom";

import TransactionForm from "../components/TransactionForm";

import { addTransaction } from "../api/transactionApi";

// Add Transaction Page
function AddTransaction() {
  // Add a new transaction
  async function handleAdd(transaction) {
    await addTransaction(transaction);

    alert("Transaction added successfully.");
  }

  return (
    <div className="page">
      <h1>Personal Budget Tracker</h1>

      <p>
        Manage your income and expenses easily.
      </p>

      <TransactionForm onAdd={handleAdd} />

      <br />

      <Link to="/transactions">
        View Transactions
      </Link>
    </div>
  );
}

export default AddTransaction;