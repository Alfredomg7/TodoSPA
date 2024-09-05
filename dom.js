import { createTodoItem, getTodoData } from './todoList.js';
import { saveToLocalStorage, loadFromLocalStorage } from './storage.js';

const addButton = document.getElementById('add-btn');
const exportButton = document.getElementById('export-btn');
const importButton = document.getElementById('import-btn');
const importFileInput = document.getElementById('import-file');
const inputField = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const noTasksMessage = document.getElementById('no-tasks-message');

export function initializeApp() {
    updateNoTasksMessage();
    loadTodos();

    addButton.addEventListener('click', addTodo);
    inputField.addEventListener('keypress', handleEnter);
    exportButton.addEventListener('click', exportToCSV);
    importButton.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleImport);
}

function addTodo() {
    const text = inputField.value.trim();
    if (text) {
        const newTodo = createTodoItem(text);
        todoList.appendChild(newTodo);
        inputField.value = '';
        updateNoTasksMessage();
        saveToLocalStorage(getTodoData(todoList));
    }
}

export function updateNoTasksMessage() {
    if (todoList.children.length === 0) {
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none';
    }
}

function exportToCSV() {
    const todos = getTodoData(todoList);
    const csvContent = 'data:text/csv;charset=utf-8,Task,Status\n' +
        todos.map(e => `${e.text},${e.status}`).join('\n');

    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'todo-list.csv');
    document.body.appendChild(link);
    link.click();
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result;
        const rows = content.split('\n').slice(1);

        todoList.innerHTML = '';

        rows.forEach(row => {
            const [text, status] = row.split(',');
            if (text && status) {
                const completed = status.trim().toLowerCase() === 'completed';
                const newTodo = createTodoItem(text, completed ? 'completed' : 'pending');
                todoList.appendChild(newTodo);
            }
        });

        updateNoTasksMessage();
        saveToLocalStorage(getTodoData(todoList));
    };

    reader.readAsText(file);
    importFileInput.value = '';
}

function loadTodos() {
    const todos = loadFromLocalStorage();
    todos.forEach(todo => {
        const newTodo = createTodoItem(todo.text, todo.status);
        todoList.appendChild(newTodo);
    });
}

function handleEnter(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}
