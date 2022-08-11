const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
const import_file = document.querySelector('.import-file')
const export_file = document.querySelector('.export-file')

getTodos()

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)
import_file.addEventListener('click', importJson)

function getTodos() {
	let todos
	if (localStorage.getItem('todos') !== []) {
		todos = []
		if (todos.length === 0) {
			showImportFile()
		}
		todos.forEach(function (todo) {
			const todoDiv = document.createElement('div')
			todoDiv.classList.add('todo')
			const newTodo = document.createElement('li')
			newTodo.innerText = todo
			newTodo.classList.add('todo-item')
			todoDiv.appendChild(newTodo)

			const completedButton = document.createElement('button')
			completedButton.innerHTML = '<i class="fas fa-check"></i>'
			completedButton.classList.add('complete-btn')
			todoDiv.appendChild(completedButton)
			const trashButton = document.createElement('button')
			trashButton.innerHTML = '<i class="fas fa-trash"></i>'
			trashButton.classList.add('trash-btn')
			todoDiv.appendChild(trashButton)
			todoList.appendChild(todoDiv)
		})
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}

	showImportFile()
}

function addTodo(event) {
	event.preventDefault()
	const todoDiv = document.createElement('div')
	todoDiv.classList.add('todo')
	const newTodo = document.createElement('li')
	newTodo.innerText = todoInput.value
	newTodo.classList.add('todo-item')
	todoDiv.appendChild(newTodo)
	saveLocalTodos(todoInput.value)
	const completedButton = document.createElement('button')
	completedButton.innerHTML = '<i class="fas fa-check"></i>'
	completedButton.classList.add('complete-btn')
	todoDiv.appendChild(completedButton)
	const trashButton = document.createElement('button')
	trashButton.innerHTML = '<i class="fas fa-trash"></i>'
	trashButton.classList.add('trash-btn')
	todoDiv.appendChild(trashButton)
	todoList.appendChild(todoDiv)
	todoInput.value = ''

	// let todos
	// if (localStorage.getItem('todos') !== []) {
	// 	todos = JSON.parse(localStorage.getItem('todos'))
	// 	if (todos.length === 0) {
	// 		todos = []
	// 		localStorage.setItem('todos', JSON.stringify(todos))
	// 	}
	// }

	showImportFile()
}

function deleteCheck(event) {
	const item = event.target
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement
		removeLocalTodos(todo)
		todo.remove()
	}
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement
		todo.classList.toggle('completed')
	}
	showImportFile()
}

function showImportFile() {
	let todos
	todos = JSON.parse(localStorage.getItem('todos'))
	if (todos.length === 0) {
		import_file.classList.remove('display-none')
	} else {
		import_file.classList.add('display-none')
	}

	console.log(todos)
}

function importJson() {
	alert('Importing JSON file is not supported yet')
}

function filterTodo(event) {
	const todos = todoList.childNodes
	todos.forEach(function (todo) {
		switch (event.target.value) {
			case 'all':
				todo.style.display = 'flex'
				break
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex'
				} else {
					todo.style.display = 'none'
				}
				break
		}
	})
}

function saveLocalTodos(todo) {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.push(todo)
	localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalTodos(todo) {
	let todos
	if (localStorage.getItem('todos') !== []) {
		todos = JSON.parse(localStorage.getItem('todos'))
		if (todos.length === 0) {
			localStorage.setItem('todos', JSON.stringify(todos))
		}
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	const todoIndex = todo.children[0].innerText
	todos.splice(todos.indexOf(todoIndex), 1)
	localStorage.setItem('todos', JSON.stringify(todos))
}
