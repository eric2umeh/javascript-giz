import { useEffect, useState } from "react";

import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../api/transactionApi";

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    description: "",
    amount: "",
    type: "",
    category: "",
  });

  async function loadTransactions() {
    const data = await getTransactions();
    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function handleDelete(id) {
    await deleteTransaction(id);
    loadTransactions();
  }

  function startEdit(transaction) {
    setEditingId(transaction.id);

    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
    });
  }

  async function saveEdit() {
    await updateTransaction(editingId, editForm);

    setEditingId(null);

    loadTransactions();
  }

  return (
    <div>
      <h1>Transactions</h1>

      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          style={{
            border: "1px solid gray",
            marginBottom: 15,
            padding: 10,
          }}
        >
          {editingId === transaction.id ? (
            <>
              <input
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="number"
                value={editForm.amount}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    amount: e.target.value,
                  })
                }
              />

              <select
                value={editForm.type}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    type: e.target.value,
                  })
                }
              >
                <option>Income</option>
                <option>Expense</option>
              </select>

              <input
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    category: e.target.value,
                  })
                }
              />

              <button onClick={saveEdit}>
                Save
              </button>

              <button onClick={() => setEditingId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3>{transaction.description}</h3>

              <p>₦{transaction.amount}</p>

              <p>{transaction.type}</p>

              <p>{transaction.category}</p>

              <button
                onClick={() => startEdit(transaction)}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(transaction.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TransactionsPage;