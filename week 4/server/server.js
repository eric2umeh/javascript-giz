const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

// In-memory storage
let transactions = [];

// Get All Transactions
app.get("/transactions", (req, res) => {
  res.json(transactions);
});

// Add Transaction
app.post("/transactions", (req, res) => {
  const { description, amount, type, category } = req.body;

  if (!description || !amount || !type) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  const transaction = {
    id: Date.now(),
    description,
    amount: Number(amount),
    type,
    category,
  };

  transactions.push(transaction);

  res.status(201).json(transaction);
});

// Update Transaction
app.put("/transactions/:id", (req, res) => {
  const id = Number(req.params.id);

  const transaction = transactions.find((item) => item.id === id);

  if (!transaction) {
    return res.status(404).json({
      message: "Transaction not found",
    });
  }

  transaction.description = req.body.description;
  transaction.amount = Number(req.body.amount);
  transaction.type = req.body.type;
  transaction.category = req.body.category;

  res.json(transaction);
});

// Delete Transaction
app.delete("/transactions/:id", (req, res) => {
  const id = Number(req.params.id);

  transactions = transactions.filter((item) => item.id !== id);

  res.json({
    message: "Transaction deleted",
  });
});

// Get Summary
app.get("/summary", (req, res) => {
  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((total, item) => total + item.amount, 0);

  res.json({
    income,
    expense,
    balance: income - expense,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});