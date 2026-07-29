import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createTransaction,
  getSummary,
} from "../api/transactionApi";

import logo from "../assets/giz-logo.png";

// Home Page
function AddTransaction() {
  // Form State
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "Income",
  });

  // Summary State
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Loading State
  const [loading, setLoading] = useState(false);

  // Load Summary
  useEffect(() => {
    loadSummary();
  }, []);

  // Get Summary From API
  async function loadSummary() {
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Update Input Fields
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // Add Transaction
  async function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.description.trim() === "" ||
      formData.amount === "" ||
      formData.category.trim() === ""
    ) {
      alert("Please complete all fields.");
      return;
    }

    setLoading(true);

    try {
      await createTransaction(formData);

      alert("Transaction Added Successfully!");

      setFormData({
        description: "",
        amount: "",
        category: "",
        type: "Income",
      });

      loadSummary();
    } catch (error) {
      alert("Unable to save transaction.");
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="page">

      <div className="container">

        <img
          src={logo}
          alt="GIZ Logo"
          className="logo"
        />

        <h1>Personal Budget Tracker</h1>

        <p className="subtitle">
          Track your income and expenses easily.
        </p>

        {/* Summary Cards */}

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

        {/* Transaction Form */}

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <label>Description</label>

          <input
            type="text"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />

          <label>Amount</label>

          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
          />

          <label>Category</label>

          <input
            type="text"
            name="category"
            placeholder="Food, Salary, Transport..."
            value={formData.category}
            onChange={handleChange}
          />

          <label>Transaction Type</label>

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Transaction"}
          </button>

        </form>

        <Link
          to="/transactions"
          className="link-button"
        >
          View Transactions →
        </Link>

      </div>

    </div>
  );
}

export default AddTransaction;