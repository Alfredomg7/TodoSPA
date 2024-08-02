document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const inputField = document.getElementById('todo-input');
    const todolist = document.getElementById('todo-list');

    // function to add a new todo item
    function createTodoItem(text) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');

        const itemText = document.createElement('span');
        itemText.textContent = text;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            todolist.removeChild(listItem);
        });

        listItem.appendChild(itemText);
        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    // Event listener for the add button
    addButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) {
            const newTodo = createTodoItem(text);
            todolist.appendChild(newTodo);
            inputField.value = '';
        }
    });

    // Event listener for allow pressing enter to add a new todo item
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });
});