// Store all transactions in an array
const entries = [];

// Get HTML Elements
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const type = document.getElementById("type");

const add = document.getElementById("add");
const filter = document.getElementById("filter");

const list = document.getElementById("list");

const income = document.getElementById("income");
const expense = document.getElementById("expense");
const balance = document.getElementById("balance");

const categories = document.getElementById("categories");

// Display Transactions
function render() {
  list.innerHTML = "";

  // Empty List

  if (entries.length === 0) {
    list.innerHTML = "<li>No transactions yet.</li>";

    income.textContent = "Income : ₦0";
    expense.textContent = "Expense : ₦0";
    balance.textContent = "Balance : ₦0";

    categories.innerHTML = "";

    return;
  }

  // Filter Transactions i.e. Shows All/Income/Expense.

  const view =
    filter.value === "All"
      ? entries
      : entries.filter((entry) => entry.type === filter.value);

  // Display Each Transaction or Loops through transactions.

  view.forEach((entry, index) => {
    // Builds list items.
    const li = document.createElement("li");

    li.className = entry.type;

    li.innerHTML = `
            ${entry.desc} -
            ₦${entry.amount}
            (${entry.type})
            <br>
            Category: ${entry.category}

            <button data-index="${index}">
                Delete
            </button>
        `;

    list.appendChild(li);
  });

  summary();

  categoryBreakdown();
}

// Calculate Income, Expense & Balance
function summary() {
  const totalIncome = entries

    .filter((entry) => entry.type === "Income")
// Calculates income, expense and balance.
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpense = entries

    .filter((entry) => entry.type === "Expense")

    .reduce((sum, entry) => sum + entry.amount, 0);

  income.textContent = `Income : ₦${totalIncome}`;

  expense.textContent = `Expense : ₦${totalExpense}`;

  balance.textContent = `Balance : ₦${totalIncome - totalExpense}`;
}

// Display Category Breakdown 0r Groups totals by category.
function categoryBreakdown() {
  categories.innerHTML = "";

  const totals = {};

  entries.forEach((entry) => {
    if (!totals[entry.category]) {
      totals[entry.category] = 0;
    }

    totals[entry.category] += entry.amount;
  });

  for (let item in totals) {
    const p = document.createElement("p");

    p.textContent = `${item} : ₦${totals[item]}`;

    categories.appendChild(p);
  }
}

// Add Transaction
add.onclick = () => {
  if (!desc.value || !amount.value) {
    alert("Please fill all fields.");

    return;
  }
// Adds a transaction.
  entries.push({
    desc: desc.value,

    amount: Number(amount.value),

    category: category.value,

    type: type.value,
  });

  desc.value = "";

  amount.value = "";

  render();
};

// Filter Transactions
filter.onchange = render;

// Delete Transaction

list.onclick = (event) => {
  if (event.target.tagName === "BUTTON") {
    // Deletes a transaction.
    entries.splice(event.target.dataset.index, 1);

    render();
  }
};

// Initial Display or Refreshes the page.

render();
