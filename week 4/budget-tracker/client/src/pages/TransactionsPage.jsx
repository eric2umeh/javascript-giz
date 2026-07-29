import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/giz-logo.png";

import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
  getSummary,
} from "../api/transactionApi";

function TransactionsPage() {

  // Store all transactions
  const [transactions, setTransactions] = useState([]);

  // Store filtered transactions
  const [filter, setFilter] = useState("All");

  // Store summary
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  // Store editing id
  const [editingId, setEditingId] = useState(null);

  // Store edit form
  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    category: "",
    type: "",
  });

  // Load page
  useEffect(() => {
    loadData();
  }, []);

  // Load transactions and summary
  async function loadData() {

    const data = await getTransactions();
    setTransactions(data);

    const totals = await getSummary();
    setSummary(totals);

  }

  // Delete transaction
  async function handleDelete(id) {

    const answer = window.confirm(
      "Delete this transaction?"
    );

    if (!answer) return;

    await deleteTransaction(id);

    loadData();

  }

  // Start editing
  function startEdit(transaction) {

    setEditingId(transaction.id);

    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
    });

  }

  // Cancel edit
  function cancelEdit() {
    setEditingId(null);
  }

  // Handle edit input
  function handleEditChange(event) {

    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });

  }

  // Save edit
  async function saveEdit(id) {

    await updateTransaction(id, {
      ...editForm,
      amount: Number(editForm.amount),
    });

    setEditingId(null);

    loadData();

  }

  // Filter transactions
  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter(
          (item) => item.type === filter
        );

  return (
    <div className="page">

      <div className="container">
        <img
          src={logo}
          alt="GIZ Logo"
          className="logo"
        />
        <div className="page-header">

          <div>

            <p className="eyebrow">
              PERSONAL FINANCE
            </p>

            <h1>Transactions</h1>

            <p className="subtitle">
              View, edit and delete your transactions.
            </p>

          </div>

          <Link
            to="/"
            className="primary-button"
          >
            + Add Transaction
          </Link>

        </div>

        {/* Summary */}

        <div className="summary-grid">

          <div className="summary-card income">

            <h3>Total Income</h3>

            <h2>₦{summary.income}</h2>

          </div>

          <div className="summary-card expense">

            <h3>Total Expense</h3>

            <h2>₦{summary.expense}</h2>

          </div>

          <div className="summary-card balance">

            <h3>Balance</h3>

            <h2>₦{summary.balance}</h2>

          </div>

        </div>

        {/* Table Card */}

        <div className="card">

          <div className="section-header">

            <h2>Transaction List</h2>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(event.target.value)
              }
            >
              <option>All</option>
              <option>Income</option>
              <option>Expense</option>
            </select>

          </div>

          <table className="transaction-table">

            <thead>

              <tr>

                <th>Description</th>

                <th>Category</th>

                <th>Type</th>

                <th>Amount</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredTransactions.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="empty-table"
                  >
                    No transactions found.
                  </td>

                </tr>

              ) : (

                filteredTransactions.map((item) => (

                  editingId === item.id ?

                  <tr key={item.id}>

                    <td>

                      <input
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                      />

                    </td>

                    <td>

                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                      >

                        <option>Food</option>
                        <option>Salary</option>
                        <option>Transport</option>
                        <option>Shopping</option>
                        <option>Health</option>
                        <option>Bills</option>

                      </select>

                    </td>

                    <td>

                      <select
                        name="type"
                        value={editForm.type}
                        onChange={handleEditChange}
                      >

                        <option>Income</option>
                        <option>Expense</option>

                      </select>

                    </td>

                    <td>

                      <input
                        type="number"
                        name="amount"
                        value={editForm.amount}
                        onChange={handleEditChange}
                      />

                    </td>

                    <td>

                      <button
                        className="save-btn"
                        onClick={() =>
                          saveEdit(item.id)
                        }
                      >
                        Save
                      </button>

                      <button
                        className="cancel-btn"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>

                    </td>

                  </tr>

                  :

                  <tr key={item.id}>

                    <td>{item.description}</td>

                    <td>{item.category}</td>

                    <td>

                      <span
                        className={
                          item.type === "Income"
                            ? "badge income-badge"
                            : "badge expense-badge"
                        }
                      >
                        {item.type}
                      </span>

                    </td>

                    <td>

                      ₦{item.amount}

                    </td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          startEdit(item)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );

}

export default TransactionsPage;