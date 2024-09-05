import { updateNoTasksMessage } from './dom.js';

export function createTodoItem(text, status = 'pending') {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');

    const itemText = document.createElement('span');
    itemText.textContent = text;

    if (status === 'completed') {
        itemText.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        itemText.classList.toggle('completed');
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        const newText = prompt('Edit todo:', itemText.textContent);
        if (newText && newText.trim()) {
            itemText.textContent = newText;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        listItem.remove();
        updateNoTasksMessage();
    });

    listItem.appendChild(itemText);
    listItem.appendChild(completeButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

export function getTodoData(todoList) {
    const rows = [];
    const items = todoList.querySelectorAll('li');

    items.forEach(item => {
        const span = item.querySelector('span');
        const text = span.textContent;
        const status = span.classList.contains('completed') ? 'Completed' : 'Pending';
        rows.push({ text, status });
    });

    return rows;
}
