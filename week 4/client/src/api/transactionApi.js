const API_URL = "http://localhost:3001";

// Get All Transactions
export async function getTransactions() {
  const response = await fetch(`${API_URL}/transactions`);
  return response.json();
}

// Create Transaction
export async function createTransaction(transaction) {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  return response.json();
}

// Update Transaction
export async function updateTransaction(id, transaction) {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: "PUT",
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

// Get Summary
export async function getSummary() {
  const response = await fetch(`${API_URL}/summary`);
  return response.json();
}