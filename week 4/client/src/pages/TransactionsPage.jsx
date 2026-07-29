import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
} from "../api/transactionApi";

import logo from "../assets/giz-logo.png";

// Transactions Page
function TransactionsPage() {
  // Store all transactions
  const [transactions, setTransactions] = useState([]);

  // Store summary
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Store current filter
  const [filter, setFilter] = useState("All");

  // Store loading state
  const [loading, setLoading] = useState(true);

  // Store edit id
  const [editId, setEditId] = useState(null);

  // Store edit form
  const [editData, setEditData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "Income",
  });

  // Load page
  useEffect(() => {
    loadTransactions();
    loadSummary();
  }, []);

  // Load Transactions
  async function loadTransactions() {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  // Load Summary
  async function loadSummary() {
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete Transaction
  async function handleDelete(id) {
    if (!window.confirm("Delete this transaction?")) return;

    await deleteTransaction(id);

    loadTransactions();
    loadSummary();
  }

  // Start Editing
  function handleEdit(transaction) {
    setEditId(transaction.id);

    setEditData({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    });
  }

  // Update Edit Form
  function handleChange(event) {
    setEditData({
      ...editData,
      [event.target.name]: event.target.value,
    });
  }

  // Save Edited Transaction
  async function handleSave(id) {
    await updateTransaction(id, editData);

    setEditId(null);

    loadTransactions();
    loadSummary();
  }

  // Cancel Edit
  function handleCancel() {
    setEditId(null);
  }

  // Filter Transactions
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((transaction) => transaction.type === filter);

  return (
    <div className="page">
      <div className="container">
        <img src={logo} alt="GIZ Logo" className="logo" />

        <h1>Transactions</h1>

        <p className="subtitle">View and manage your transactions.</p>

        {/* Summary */}

        <div className="summary">
          <div className="card income">
            <h3>Income</h3>
            <h2>₦{summary.income}</h2>
          </div>

          <div className="card expense">
            <h3>Expense</h3>
            <h2>₦{summary.expense}</h2>
          </div>

          <div className="card balance">
            <h3>Balance</h3>
            <h2>₦{summary.balance}</h2>
          </div>
        </div>

        {/* Filter Buttons */}

        <div className="filters">
          <button onClick={() => setFilter("All")}>All</button>

          <button onClick={() => setFilter("Income")}>Income</button>

          <button onClick={() => setFilter("Expense")}>Expense</button>
        </div>

        {/* Transaction List */}

        {loading ? (
          <p>Loading...</p>
        ) : filteredTransactions.length === 0 ? (
          <p>No Transactions Found.</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              {editId === transaction.id ? (
                <>
                  <input
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                  />

                  <input
                    type="number"
                    name="amount"
                    value={editData.amount}
                    onChange={handleChange}
                  />

                  <input
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                  />

                  <select
                    name="type"
                    value={editData.type}
                    onChange={handleChange}
                  >
                    <option>Income</option>
                    <option>Expense</option>
                  </select>

                  <div className="actions">
                    <button
                      className="save-btn"
                      onClick={() => handleSave(transaction.id)}
                    >
                      Save
                    </button>

                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3>{transaction.description}</h3>

                  <p>
                    <strong>Amount:</strong> ₦{transaction.amount}
                  </p>

                  <p>
                    <strong>Category:</strong> {transaction.category}
                  </p>

                  <p>
                    <strong>Type:</strong>{" "}
                    <span
                      className={
                        transaction.type === "Income"
                          ? "income-text"
                          : "expense-text"
                      }
                    >
                      {transaction.type}
                    </span>
                  </p>

                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(transaction)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}

        <Link to="/" className="link-button">
          ← Add New Transaction
        </Link>
      </div>
    </div>
  );
}

export default TransactionsPage;
