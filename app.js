document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const exportButton = document.getElementById('export-btn');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const noTasksMessage = document.getElementById('no-tasks-message');

    // function to add a new todo item
    function createTodoItem(text) {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');
        
        const itemText = document.createElement('span');
        itemText.textContent = text;

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
            todoList.removeChild(listItem);
        });

        listItem.appendChild(itemText);
        listItem.appendChild(completeButton);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    // Function tu update the visibility of the 'No tasks' message
    function updateNoTasksMessage() {
        if (todoList.children.length === 0) {
            noTasksMessage.style.display = 'block';
        } else {
            noTasksMessage.style.display = 'none';
        }
    }

    // Function to export tasks as csv file
    function exportToCSV() {
        const rows = [];
        const items = todoList.querySelectorAll('li');

        rows.push(['Task', 'Status']);

        items.forEach(item => {
            const text  = item.querySelector('span').textContent;
            const status = item.classList.contains('completed') ? 'Completed' : 'Pending';
            rows.push([text, status]);
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
        
        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', 'todo-list.csv');
        document.body.appendChild(link);
        link.click();
    }

    // Event listener for the add button
    addButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (text) {
            const newTodo = createTodoItem(text);
            todoList.appendChild(newTodo);
            inputField.value = '';
            updateNoTasksMessage();
        }
    });

    // Event listener for allow pressing enter to add a new todo item
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addButton.click();
        }
    });

    // Event listener for the export button
    exportButton.addEventListener('click', () => {
        exportToCSV();
    });

    // Initiallize updating of 'No tasks' message visibility
    updateNoTasksMessage();
});