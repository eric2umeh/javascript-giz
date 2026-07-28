const API_URL = "http://localhost:3001";

// Get All Transactions
export async function getTransactions() {
  const response = await fetch(`${API_URL}/transactions`);

  return response.json();
}

// Add Transaction
export async function addTransaction(transaction) {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(transaction),
  });

  return response.json();
}

// Delete Transaction
export async function deleteTransaction(id) {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
  });

  return response.json();
}