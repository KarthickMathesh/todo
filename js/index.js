	//Selectors
		const todoInput = document.querySelector('.todo-input');
		const todoButton = document.querySelector('.todo-button');
		const todoList = document.querySelector('.todo-list');
		const filterOption = document.querySelector('.filter-todo')
		
	//Event Listners
		document.addEventListener('DOMContentLoaded', getTodos);
		todoButton.addEventListener('click', addTodo);
		todoList.addEventListener('click', deleteCheck);
		filterOption.addEventListener('click', filterTodo);

		//Functions
	function addTodo(event){
		//Prevent form from submitting
			event.preventDefault();
		//Todo Div
			const todoDiv = document.createElement("div");
			todoDiv.classList.add("todo");
		//Create LI
			const newTodo  = document.createElement('li');
			newTodo.innerText = todoInput.value;
			newTodo.classList.add('todo-item');
			todoDiv.appendChild(newTodo);
		// Add todo to localStorage
			saveLocalTodos(todoInput.value);
		// Check Mark Button
			const completedButton = document.createElement('button');
			completedButton.innerHTML = '<i class="fas fa-check"></i>';
			completedButton.classList.add("complete-btn");
			todoDiv.appendChild(completedButton);
		// Check Trash Button
			const trashButton = document.createElement('button');
			trashButton.innerHTML = '<i class="fas fa-trash"></i>';
			trashButton.classList.add("trash-btn");
			todoDiv.appendChild(trashButton);
		//Append to list
			todoList.appendChild(todoDiv);
		//Clear Todo Input value
			todoInput.value = "";
	}

	function deleteCheck(event){
		const item = event.target;
		//Delete Button
		if(item.classList[0] === 'trash-btn'){
			const todo = item.parentElement;
			todo.remove();
		}
		//Check Button
		if(item.classList[0] === 'complete-btn'){
			const todo = item.parentElement;
			todo.classList.toggle("completed")
		}
	}

	//Filter Option
	function filterTodo(event){
		const todos = todoList.childNodes;
		todos.forEach(function(todo){
			switch(event.target.value){
				case "all":
						todo.style.display = "flex";
					break;
				case "completed":
						if (todo.classList.contains("completed")){
							todo.style.display = "flex";
						} else {
							todo.style.display = "none";
						}
					break;
				case "uncompleted":
						if (!todo.classList.contains("completed")){
							todo.style.display = "flex";
						} else {
							todo.style.display = "none";
						}
					break;
			}
		});
	}

	function saveLocalTodos(todo){
		//Check Todo in local storage
		let todos;
		if(localStorage.getItem("todos") === null){
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem("todos"));
		}
		todos.push(todo);
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	function getTodos(){
		//Check Todo in local storage
		let todos;
		if(localStorage.getItem("todos") === null){
			todos = [];
		} else {
			todos = JSON.parse(localStorage.getItem("todos"));
		}
		todos.forEach(function(todo){
			//Todo Div
			const todoDiv = document.createElement("div");
			todoDiv.classList.add("todo");
		//Create LI
			const newTodo  = document.createElement('li');
			newTodo.innerText = todos;
			newTodo.classList.add('todo-item');
			todoDiv.appendChild(newTodo);
		
		// Check Mark Button
			const completedButton = document.createElement('button');
			completedButton.innerHTML = '<i class="fas fa-check"></i>';
			completedButton.classList.add("complete-btn");
			todoDiv.appendChild(completedButton);
		// Check Trash Button
			const trashButton = document.createElement('button');
			trashButton.innerHTML = '<i class="fas fa-trash"></i>';
			trashButton.classList.add("trash-btn");
			todoDiv.appendChild(trashButton);
		//Append to list
			todoList.appendChild(todoDiv);
		});
	}
