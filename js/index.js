console.log('✅ File Loaded!');

window.onload = function(){
	//Selectors
		const todoInput = document.querySelector('.todo-input');
		const todoButton = document.querySelector('.todo-button');
		const todoList = document.querySelector('.todo-list');
	
	//Event Listners
		todoButton.addEventListener('click', addTodo);
		todoList.addEventListener('click', deleteCheck);
	
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
}
