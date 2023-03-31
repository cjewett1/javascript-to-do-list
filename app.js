//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterToDo);

//Functions
function addToDo(event) {
  event.preventDefault();

  //making the todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create the li
  const newTodo = document.createElement("li");

  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");

  //Adding the new todo item to the existing list
  todoDiv.appendChild(newTodo);

  //Add todo to local storage

  saveLocalTodos(todoInput.value);

  //Check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //Trash mark button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to list in HTML
  todoList.appendChild(todoDiv);

  //clean input value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterToDo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    if (todo.nodeType == Node.ELEMENT_NODE) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (todo.classList.contains("completed")) {
            todo.style.display = "none";
          } else {
            todo.style.display = "flex";
          }
          break;
      }
    }
  });
}

function saveLocalTodos(todo) {
  //Are there any todos in local storage?
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; //if we dont have todos, an empty array will be created.
  } else {
    //If we do have things in there, we are going to get back an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //if we do have an array, a new item gets pushed to it.
  todos.push(todo);

  //set it back into the local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; //if we dont have todos, an empty array will be created.
  } else {
    //If we do have things in there, we are going to get back an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create the li
    const newTodo = document.createElement("li");

    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    //Adding the new todo item to the existing list
    todoDiv.appendChild(newTodo);

    //Check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Trash mark button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Append to list in HTML
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []; //if we dont have todos, an empty array will be created.
  } else {
    //If we do have things in there, we are going to get back an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //We are checking the index of one element.
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1); //How many do you want to remove, just 1.
  localStorage.setItem("todos", JSON.stringify(todos));
}

//example of whats going on above.
// const todos = ["apple", "john", "clint"];

// const johnIndex = todos.indexOf('john'); //This returns a number of 1

// todos.splice(johnIndex, 1);

// console.log(todos); //John is removed.
