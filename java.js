// Get elements from the DOM
// Get elements from the DOM
const expenseForm = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const priceAmount = document.getElementById('price');

// Initialize expenses array
let expenses = [];

// Load expenses from local storage
function loadExpenses() {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
        expenses = storedExpenses;
        expenses.forEach(expense => addExpenseToDOM(expense));
        updateTotal();
    }
}

// Add an expense
function addExpense(e) {
    e.preventDefault();
    
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const price = parseFloat(priceAmount.value);
    if (description === '' || isNaN(amount)||price=='') {
        alert("Please provide valid description and amount.");
        return;
    }

    const expense = { description, amount,price };
    expenses.push(expense);
    
    addExpenseToDOM(expense);
    updateTotal();
    
    // Save to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Clear inputs
    descriptionInput.value = '';
    amountInput.value = '';
    priceAmount.value = '';
}

// Add expense to DOM
function addExpenseToDOM(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${expense.description}: ${expense.amount.toFixed(2)}: $${expense.price}}
        <button class="edit" onclick="editExpense('${expense.description}', ${expense.amount}',${expense.price})">Edit</button>
        <button class="delete" onclick="deleteExpense('${expense.description}')">Delete</button>
    `;
    expenseList.appendChild(li);
}

// Update total amount
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + (expense.amount*expense.price), 0);
    totalAmount.innerText = total;
}

// Edit an expense
function editExpense(description, amount,price) {
    descriptionInput.value = description;
    amountInput.value = amount;
    price.value=price;
    deleteExpense(description);
}

// Delete an expense
function deleteExpense(description) {
    expenses = expenses.filter(expense => expense.description !== description);
    
    // Save to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Clear the list and reload
    expenseList.innerHTML = '';
    expenses.forEach(expense => addExpenseToDOM(expense));
    updateTotal();
}

// Event listeners
expenseForm.addEventListener('submit', addExpense);

// Load expenses on page load
window.onload = loadExpenses;
