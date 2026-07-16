// Shopping Cart Data
const cart = [
  { item: "Rice", price: 2000, quantity: 2 },
  { item: "Beans", price: 1500, quantity: 3 },
  { item: "Milk", price: 2500, quantity: 1 },
  { item: "Bread", price: 1200, quantity: 4 },
  { item: "Eggs", price: 800, quantity: 2 },
];

// Task 1 - Display All Items
function printCart() {
  console.log("===== Shopping Cart =====");

  cart.forEach((product, index) => {
    console.log(
      `${index + 1}. ${product.item} | Price: ₦${product.price} | Quantity: ${product.quantity}`,
    );
  });
}

// ======================================
// Task 2 - Calculate Total Bill
// ======================================
function calculateTotal() {
  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;
  });

  console.log(`Total Bill: ₦${total}`);

  return total;
}

// Task 3 - Calculate Total Quantity
function totalQuantity() {
  let quantity = 0;

  cart.forEach((product) => {
    quantity += product.quantity;
  });

  console.log(`Total Quantity: ${quantity}`);

  return quantity;
}

// Task 4 - Display Items Above ₦2,000
function expensiveItems() {
  console.log("Items Above ₦2,000:");

  const expensive = cart.filter((product) => product.price > 2000);

  expensive.forEach((product) => {
    console.log(`${product.item} - ₦${product.price}`);
  });
}

// Bonus Challenge - Cart Summary
function cartSummary() {
  const totalProducts = cart.length;
  const totalQty = totalQuantity();
  const totalBill = calculateTotal();

  let mostExpensive = cart[0];

  cart.forEach((product) => {
    if (product.price > mostExpensive.price) {
      mostExpensive = product;
    }
  });

  console.log("\n===== Cart Summary =====");
  console.log(`Total Products: ${totalProducts}`);
  console.log(`Total Quantity: ${totalQty}`);
  console.log(`Total Bill: ₦${totalBill}`);
  console.log(
    `Most Expensive Item: ${mostExpensive.item} (₦${mostExpensive.price})`,
  );
}
