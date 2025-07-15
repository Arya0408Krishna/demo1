let expenses = [];

// Function to switch tabs
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

// Function to add an expense
function addExpense(event) {
    event.preventDefault();
    
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;

    const expense = { name, amount, category, date: new Date() };
    expenses.push(expense);
    
    alert('Expense added successfully!');
    document.querySelector('form').reset();
    updateExpenseReport();
}

// Function to update the expense report
function updateExpenseReport() {
    const filter = document.getElementById('filter').value;
    const filteredExpenses = filter === 'all' ? expenses : expenses.filter(exp => exp.category === filter);
    
    displayExpenseHistory(filteredExpenses);
    displayExpenseChart(filteredExpenses);
}

// Function to display expense history
function displayExpenseHistory(expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    
    expenses.forEach(exp => {
        const listItem = document.createElement('li');
        listItem.textContent = `${exp.name} - ₹${exp.amount} (${exp.category}) on ${exp.date.toLocaleDateString()}`;
        expenseList.appendChild(listItem);
    });
}

// Function to display expense chart
function displayExpenseChart(expenses) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const categories = ['Food', 'Transport', 'Utilities'];
    const categoryTotals = categories.map(cat => 
        expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + exp.amount, 0)
    );

    if (window.expenseChart) window.expenseChart.destroy(); // Destroy the old chart if exists

    window.expenseChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Expense Amount',
                data: categoryTotals,
                backgroundColor: ['#f39c12', '#e74c3c', '#3498db'],
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
