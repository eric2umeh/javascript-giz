import { useState } from "react";

// Transaction Form Component
function TransactionForm({ onAdd }) {
  // Store form values
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "Income",
    category: "",
  });

  // Store validation message
  const [error, setError] = useState("");

  // Update form whenever the user types
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  // Submit the form
  async function handleSubmit(event) {
    event.preventDefault();

    // Simple validation
    if (
      formData.description.trim() === "" ||
      formData.amount === "" ||
      formData.category.trim() === ""
    ) {
      setError("Please complete all fields.");

      return;
    }

    // Send data to App.jsx
    await onAdd({
      description: formData.description,
      amount: Number(formData.amount),
      type: formData.type,
      category: formData.category,
    });

    // Clear validation message
    setError("");

    // Reset form
    setFormData({
      description: "",
      amount: "",
      type: "Income",
      category: "",
    });
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      {error && <p className="error">{error}</p>}

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

      <label>Type</label>

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
      >
        <option value="Income">Income</option>

        <option value="Expense">Expense</option>
      </select>

      <label>Category</label>

      <input
        type="text"
        name="category"
        placeholder="Example: Food"
        value={formData.category}
        onChange={handleChange}
      />

      <button type="submit">
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;