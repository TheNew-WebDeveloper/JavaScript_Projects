let btn = document.querySelector("#btn");
let text = document.querySelector("#text");
let amount = document.querySelector("#amount");
let income = document.querySelector("#income");
let expense = document.querySelector("#expense");
let balance = document.querySelector("#balance");
let list = document.querySelector("#list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let transactionCount = transactions.length + 1;

updateUI();

btn.addEventListener("click", function(event) {
    event.preventDefault();

    let validate = document.querySelectorAll(".validate");

    if(text.value.trim() === '' || text.value.length < 3) {
        validate[0].style.display = 'initial';
        return;
    } else {
        validate[0].style.display = 'none';
    }

    if(amount.value.trim() === '') {
        validate[1].style.display = 'initial';
        return;
    } else {
        validate[1].style.display = 'none';
    }

    let newTransaction = {
        id : transactionCount++,
        text : text.value,
        amount : parseInt(amount.value)
    }

    transactions.push(newTransaction);

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateUI();
    
    text.value = "";
    amount.value = ""
});

function updateUI() {
    let totalIncome = 0;
    let totalExpense = 0;

    list.innerHTML = "";

    transactions.forEach(transaction => {
        if(transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        let li = document.createElement("li");
        li.classList.add(transaction.amount > 0 ? "plus" : "minus");

        li.innerHTML = `${transaction.text} <span>₹${transaction.amount}</span>
        <button class='delete-btn' onclick=deleteTransaction(${transaction.id})>X</button>`

        list.appendChild(li);
    });

    let totalBalance = totalIncome + totalExpense;

    income.textContent = `₹${totalIncome.toFixed(2)}`;
    expense.textContent = `₹${Math.abs(totalExpense).toFixed(2)}`;
    balance.textContent = `₹${totalBalance.toFixed(2)}`;
    
    balance.style.color = totalBalance < 0 ? "#e74c3c" : "#2ecc71";
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id != id);

    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateUI();
}