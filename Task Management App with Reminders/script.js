// 💡 What you can implement in JS

// Since you said you’ll handle JS, here’s what this structure supports:

// Add task with text + date/time
// Validate inputs (errors already placed)
// Mark task as complete (.completed class)
// Delete task
// Filter tasks (all / completed / pending)
// Show counts (total, completed, pending)
// Add reminder logic (e.g., setTimeout or notifications)

let form = document.querySelector("#task-form");
let task = document.querySelector("#task-input");
let date = document.querySelector("#task-date");
let list = document.querySelector("#task-list");
let total = document.querySelector("#total");
let completed = document.querySelector("#completed");
let pending = document.querySelector("#pending");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

tasks.forEach(task => {
    if (!task.completed) {
        setReminder(task);
    }
});

updateUI(tasks);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let textError = document.querySelector("#text-error");
    let dateError = document.querySelector("#date-error");

    if(task.value.trim() === '' || task.value.length < 3) {
        textError.style.display = 'initial';
        return;
    } else {
        textError.style.display = 'none';
    }

    if(date.value.trim() === '') {
        dateError.style.display = 'initial';
        return;
    } else {
        dateError.style.display = 'none';
    }

    let newTask = {
        id : Date.now(),
        text : task.value,
        dateAndTime : date.value,
        completed : false,
    }

    tasks.push(newTask);
    setReminder(newTask);
    saveTasks();
    updateUI(tasks);

    console.log(tasks);
    
    task.value = "";
    date.value = '';
});

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateUI(data) {

    list.innerHTML = "";

    data.forEach(task => {
        let li = document.createElement("li");
        li.setAttribute("id", task.id);

        if (task.completed) li.classList.add("completed");
        let date = new Date(task.dateAndTime);
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        
        li.innerHTML = `
            ${task.text}
            <span>${date.getDate()} - ${date.getMonth() + 1} - ${date.getFullYear()}</span>
            <span>${hours} : ${minutes}</span>
            ${task.completed ? 
                `<button class="actions" onclick="deleteTask(${task.id})">Delete</button>`
                : `<button class="actions" onclick="completeTask(${task.id})">Mark as complete</button>`
            }`;
        list.appendChild(li);
    });

    let totalCount = tasks.length;
    let completedCount = tasks.filter(t => t.completed).length;
    let pendingCount = totalCount - completedCount;

    total.textContent = totalCount;
    completed.textContent = completedCount;
    pending.textContent = pendingCount;
}

function completeTask(id) {
    tasks.forEach(task => {
        if(task.id === id) task.completed = true;
    })

    saveTasks();
    updateUI(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    updateUI(tasks);
}

function setReminder(task) {
    let now = new Date();
    let taskTime = new Date(task.dateAndTime);
    let delay = taskTime - now;

    if (delay > 0) {
        setTimeout(() => {
            if (Notification.permission === "granted") {
                new Notification("Task Reminder", {
                    body: task.text
                });
            }
        }, delay);
    }
}

document.querySelector("#comp").addEventListener("click", function() {
    let comTasks = tasks.filter(t => t.completed);
    
    updateUI(comTasks);
})

document.querySelector("#pend").addEventListener("click", function() {
    let penTasks = tasks.filter(t => !t.completed);
    
    updateUI(penTasks);
})

document.querySelector("#all").addEventListener("click", function() {

    updateUI(tasks);
})
