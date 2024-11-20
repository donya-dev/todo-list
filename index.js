// Get DOM elements
const inputField = document.getElementById("todo-input");
const todoList = document.querySelector(".todo-items");
const itemLeft = document.querySelector(".item-left");
const allBtn = document.querySelector(".item-statuses span:first-child");
const activeBtn = document.querySelector(".item-statuses span:nth-child(2)");
const completedBtn = document.querySelector(".item-statuses span:nth-child(3)");
const clearCompleted = document.querySelector(".items-clear");

// Array to hold the todos
let todos = [];

// Load todos from localStorage
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
  renderTodos(); // Render loaded todos
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos() {
  // Clear the list first
  todoList.innerHTML = "";

  // Render each todo item
  todos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.setAttribute("data-index", index);

    const checkDiv = document.createElement("div");
    checkDiv.classList.add("check");

    const checkDoneDiv = document.createElement("div");
    checkDoneDiv.classList.add("check-done");
    if (todo.completed) {
      checkDoneDiv.classList.add("check-completed");
    }

    // Add event listener to toggle completion status
    checkDoneDiv.addEventListener("click", (e) => toggleCompleted(e));

    checkDiv.appendChild(checkDoneDiv);

    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("todo-text");
    todoTextDiv.textContent = todo.text;

    // Append check and text to the todo div
    todoDiv.appendChild(checkDiv);
    todoDiv.appendChild(todoTextDiv);

    // Append todo item to the todo list container
    todoList.appendChild(todoDiv);
  });

  // Update remaining items count
  itemLeft.textContent = `${
    todos.filter((todo) => !todo.completed).length
  } items left`;
}

// Toggle Task Completion
function toggleCompleted(e) {
  const todoDiv = e.target.closest(".todo-item"); // Get the closest .todo-item div
  const todoIndex = todoDiv.getAttribute("data-index"); // Get the index from the data attribute
  const todo = todos[todoIndex]; // Access the todo item

  // Toggle the completed status of the todo
  todo.completed = !todo.completed;

  // Update the check icon's appearance
  const checkDoneDiv = todoDiv.querySelector(".check-done");
  const todoTextDiv = todoDiv.querySelector(".todo-text");

  if (todo.completed) {
    checkDoneDiv.classList.add("check-completed");
    todoTextDiv.classList.add("line-through"); // Add line-through class to the text
  } else {
    checkDoneDiv.classList.remove("check-completed");
    todoTextDiv.classList.remove("line-through"); // Remove line-through class from the text
  }

  saveTodos(); // Save updated todos to localStorage
  renderTodos(); // Re-render the list
}

// Add a new todo
function addTodo() {
  const taskText = inputField.value.trim();
  if (taskText !== "") {
    const newTodo = {
      text: taskText,
      completed: false,
    };
    todos.push(newTodo);
    inputField.value = ""; // Clear the input field
    saveTodos(); // Save updated todos to localStorage
    renderTodos(); // Re-render the list
  }
}

// Clear completed todos
function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

// Filter Todos based on the status (All, Active, Completed)
function filterTodos(status) {
  let filteredTodos;
  if (status === "active") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  } else if (status === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else {
    filteredTodos = todos; // Show all todos
  }

  // Clear the list and render filtered todos
  todoList.innerHTML = "";
  filteredTodos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.setAttribute("data-index", index);

    const checkDiv = document.createElement("div");
    checkDiv.classList.add("check");

    const checkDoneDiv = document.createElement("div");
    checkDoneDiv.classList.add("check-done");
    if (todo.completed) {
      checkDoneDiv.classList.add("check-completed");
    }

    checkDiv.appendChild(checkDoneDiv);

    const todoTextDiv = document.createElement("div");
    todoTextDiv.classList.add("todo-text");
    todoTextDiv.textContent = todo.text;

    todoDiv.appendChild(checkDiv);
    todoDiv.appendChild(todoTextDiv);
    todoList.appendChild(todoDiv);
  });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", loadTodos); // Load todos when the page is loaded
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo(); // Add todo when the enter key is pressed
});

clearCompleted.addEventListener("click", clearCompletedTodos); // Clear completed todos

// Filters
allBtn.addEventListener("click", () => filterTodos("all"));
activeBtn.addEventListener("click", () => filterTodos("active"));
completedBtn.addEventListener("click", () => filterTodos("completed"));
