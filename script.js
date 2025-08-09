document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('filter-input').addEventListener('input', filterTasks);

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask(e) {
    e.preventDefault();
    const taskInput = document.getElementById('task-input');
    const dateInput = document.getElementById('date-input');

    const task = {
        id: Date.now(),
        name: taskInput.value,
        date: dateInput.value
    };

    tasks.push(task);
    taskInput.value = '';
    dateInput.value = '';
    saveTasks();
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.name} - ${task.date} 
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>`;
        taskList.appendChild(li);
    });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    document.getElementById('task-input').value = task.name;
    document.getElementById('date-input').value = task.date;
    deleteTask(id);
}

function filterTasks() {
    const filterInput = document.getElementById('filter-input').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(filterInput));
    
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.name} - ${task.date} 
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button class="delete" onclick="deleteTask(${task.id})">Delete</button>`;
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Display tasks on initial load
displayTasks();
