const STORAGE_KEY = 'todoList';

export function saveToLocalStorage(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function loadFromLocalStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}
