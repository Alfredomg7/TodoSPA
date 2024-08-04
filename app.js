document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-btn');
    const exportButton = document.getElementById('export-btn');
    const importButton = document.getElementById('import-btn');
    const importFileInput = document.getElementById('import-file');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const noTasksMessage = document.getElementById('no-tasks-message');

    // function to add a new todo item
    function createTodoItem(text, status = 'pending') {
        const listItem = document.createElement('li');
        listItem.classList.add('todo-item');

        const itemText = document.createElement('span');
        itemText.textContent = text;

        const completeButton = document.createElement('button');
        
        if (status === 'completed') {
            itemText.classList.add('completed');
        }

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
            updateNoTasksMessage();
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
            const span = item.querySelector('span');
            const text  = span.textContent;
            const status = span.classList.contains('completed') ? 'Completed' : 'Pending';
            rows.push([text, status]);
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
        
        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', 'todo-list.csv');
        document.body.appendChild(link);
        link.click();
    }

    // function to import tasks from csv file
    function importFromCSV(file) {
        const reader = new FileReader();

        reader.onload = function(event) {
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
        };

        reader.readAsText(file);
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

    // Event listener for the import button
    importButton.addEventListener('click', () => {
        importFileInput.click();
    });

    // Event listener for the import file input
    importFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        
        console.log('file loaded', file);
        importFromCSV(file);
        console.log('import completed');
        importFileInput.value = '';
    }); 

    // Initiallize updating of 'No tasks' message visibility
    updateNoTasksMessage();
});