import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/giz-logo.png";

import {
  createTransaction,
  getTransactions,
  getSummary,
} from "../api/transactionApi";

function AddTransaction() {
  // Store form values
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
    type: "Income",
  });

  // Store transactions
  const [transactions, setTransactions] = useState([]);

  // Store summary
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Load everything
  useEffect(() => {
    loadData();
  }, []);

  // Get transactions and summary
  async function loadData() {
    const list = await getTransactions();
    setTransactions(list);

    const totals = await getSummary();
    setSummary(totals);
  }

  // Handle typing
  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  // Add transaction
  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.description || !form.amount) {
      alert("Please complete all fields.");
      return;
    }

    await createTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      description: "",
      amount: "",
      category: "Food",
      type: "Income",
    });

    loadData();
  }

  // Category Breakdown
  const categoryTotals = {};

  transactions.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + item.amount;
  });

  return (
    <div className="page">
      <div className="container">
        <img src={logo} alt="GIZ Logo" className="logo" />
        <p className="eyebrow">PERSONAL FINANCE</p>

        <h1>Budget Tracker</h1>

        <p className="subtitle">
          Keep an eye on what comes in, what goes out, and where it goes.
        </p>

        {/* Form Card */}

        <div className="card">
          <h2>Add a transaction</h2>

          <form className="transaction-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              placeholder="e.g. Grocery Shopping"
              value={form.description}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Salary</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Health</option>
              <option>Bills</option>
            </select>

            <select name="type" value={form.type} onChange={handleChange}>
              <option>Income</option>
              <option>Expense</option>
            </select>

            <button>Add Transaction</button>
          </form>
        </div>

        {/* Summary */}

        <div className="summary-grid">
          <div className="summary-card income">
            <h3>Income</h3>

            <h2>₦{summary.income}</h2>
          </div>

          <div className="summary-card expense">
            <h3>Expense</h3>

            <h2>₦{summary.expense}</h2>
          </div>

          <div className="summary-card balance">
            <h3>Balance</h3>

            <h2>₦{summary.balance}</h2>
          </div>
        </div>

        {/* Bottom Section */}

        <div className="bottom-grid">
          <div className="card">
            <h2>Category Breakdown</h2>

            {Object.keys(categoryTotals).length === 0 ? (
              <p>No data yet.</p>
            ) : (
              Object.entries(categoryTotals).map(([category, total]) => (
                <div key={category} className="category-row">
                  <span>{category}</span>

                  <strong>₦{total}</strong>
                </div>
              ))
            )}
          </div>

          <div className="card">
            <div className="section-header">
              <h2>Recent Transactions</h2>

              <Link to="/transactions" className="view-link">
                View All →
              </Link>
            </div>

            {transactions.length === 0 ? (
              <p className="empty">No transactions yet.</p>
            ) : (
              transactions
                .slice(-5)
                .reverse()
                .map((item) => (
                  <div key={item.id} className="recent-item">
                    <div>
                      <strong>{item.description}</strong>

                      <p>{item.category}</p>
                    </div>

                    <strong>₦{item.amount}</strong>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTransaction;
