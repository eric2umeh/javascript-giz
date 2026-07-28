const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory database
let transactions = [];

// GET ALL TRANSACTIONS

app.get("/transactions", (req, res) => {
  console.log("GET /transactions");
  res.json(transactions);
});

// ADD TRANSACTION

app.post("/transactions", (req, res) => {
  console.log("POST /transactions");
  console.log(req.body);

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

// DELETE TRANSACTION

app.delete("/transactions/:id", (req, res) => {
  const id = Number(req.params.id);

  transactions = transactions.filter((t) => t.id !== id);

  res.json({
    message: "Deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});