const addTodoButton = document.querySelector(".js-add-todo-button");
const todoList = document.querySelector(".js-todo-list");
let allTodos = [];

showTodoList();

addTodoButton.addEventListener("click", () => {
   const todoName = document.querySelector(".todo-name");
   const todoDate = document.querySelector(".todo-date");
   const todoTime = document.querySelector(".todo-time");

   if (todoName.value != "" && todoDate.value != "") {
      const todo = { name: todoName.value, date: todoDate.value, time: todoTime.value };

      allTodos.push(todo);
      localStorage.removeItem("allTodos");
      localStorage.setItem("allTodos", JSON.stringify(allTodos));

      // reset all todo details entry fields
      todoName.value = "";
      todoDate.value = "";
      todoTime.value = "";

      showTodoList();
   }
});

function renderTodo(todo, index) {
   if (todo.time === "") todo.time = "- - : - -";

   return `<div class="todo">
				   <div class="existing-todo-name">${todo.name}</div>
					<div class="existing-todo-date">${todo.date}</div>
					<div class="existing-todo-time">${todo.time}</div>
					<button class="delete-button js-delete-button" onclick="deleteTodo(${index});";>Delete</button>
				</div>`;
}

function showTodoList() {
   let todoListHtml = "";

   if (allTodos) {
      allTodos = JSON.parse(localStorage.getItem("allTodos"));
      allTodos.forEach((todo, index) => { todoListHtml += renderTodo(todo, index) });
      todoList.innerHTML = todoListHtml;
   }
}

function deleteTodo(index) {
   const confirmDeleteWindow = document.querySelector(".js-confirm-delete-window");
   confirmDeleteWindow.classList.add("show-confirm-delete-window");
   const main = document.querySelector("main");
   main.classList.add("darken-main");

   function confirmTodoDelete() {
      if (allTodos) {
         allTodos = JSON.parse(localStorage.getItem("allTodos"));
         allTodos.splice(index, 1);
      }

      localStorage.removeItem("allTodos");
      localStorage.setItem("allTodos", JSON.stringify(allTodos));
      confirmDeleteWindow.classList.remove("show-confirm-delete-window");
      main.classList.remove("darken-main");

      showTodoList();

      // Remove event listeners after confirmation
      document.querySelector(".js-confirm-delete-todo").removeEventListener("click", confirmTodoDelete);
      document.querySelector(".js-cancel-delete-todo").removeEventListener("click", cancelTodoDelete);
   }

   function cancelTodoDelete() {
      confirmDeleteWindow.classList.remove("show-confirm-delete-window");
      main.classList.remove("darken-main");

      // Remove event listeners after cancelation
      document.querySelector(".js-confirm-delete-todo").removeEventListener("click", confirmTodoDelete);
      document.querySelector(".js-cancel-delete-todo").removeEventListener("click", cancelTodoDelete);
   }

   document.querySelector(".js-confirm-delete-todo").addEventListener("click", confirmTodoDelete);
   document.querySelector(".js-cancel-delete-todo").addEventListener("click", cancelTodoDelete);
}
