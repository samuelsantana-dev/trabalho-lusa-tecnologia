// Elementos do DOM
const buttonNota = document.querySelector('#button-nota');
const divNota = document.querySelector('#div-nota');
const formulario = document.querySelector('#form-notas-criar');
const userItem = document.querySelector('.user-item');

// Função para mostrar ou esconder elemento
function mostrarElemento(elemento) {
    elemento.classList.toggle('d-none');
}

// Função para adicionar evento de clique
function ouvirClick(elemento, funcao) {
    elemento.addEventListener('click', funcao);
}

// Função para criar, adicionar e filtrar notas
function criarDivsNotas(text, notas, tipo, name, done = 0, save = 1) {
    const todo = document.createElement("div");
    todo.classList.add("card");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const textName = document.createElement("h3");
    textName.innerText = name;
    todo.appendChild(textName);

    const statusButton = document.createElement("button");
    statusButton.classList.add("status");
    statusButton.innerText = tipo;
    todo.appendChild(statusButton);

    const todoText = document.createElement("p");
    todoText.innerText = notas;
    todo.appendChild(todoText);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    userItem.appendChild(todo);

    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text: text, notas: notas, tipo: tipo, name: name, done: done });
    }

    // Adicionar funcionalidade aos botões
    doneBtn.addEventListener('click', () => {
        todo.classList.toggle('done');
        updateTodoLocalStorage();
    });

    editBtn.addEventListener('click', () => {
        editTodo(todo);
    });

    deleteBtn.addEventListener('click', () => {
        todo.remove();
        updateTodoLocalStorage();
    });
}

const filterTodosSelect = (filterValue) => {
    const divTodo = document.querySelectorAll('.card');
    const todosLocalStorage = getTodosLocalStorage();
    const filteredTodos = todosLocalStorage.filter(todo => todo.tipo === filterValue);
    const individual = 'individual';
    switch (filterValue) {
        case "grupo":
            // Exibir ou ocultar as divs com base no tipo
            divTodo.forEach((todo) => {
                const title = todo.querySelector('.status').innerText;
                const matchingTodo = filteredTodos.some(item => item.tipo === title);
                if (matchingTodo) {
                    todo.style.display = 'block';
                } else {
                    todo.style.display = 'none';
                }
            });
            break;

        case individual:
            
            // Exibir ou ocultar as divs com base no tipo
            divTodo.forEach((todo) => {
                const title = todo.querySelector('.status').innerText;
                const matchingTodo = filteredTodos.some(item => item.tipo === title);
                if (matchingTodo) {
                    todo.style.display = 'block';
                } else {
                    todo.style.display = 'none';
                }
            });
            break;

        case "todos":

            // Exibir ou ocultar as divs com base no tipo
            divTodo.forEach((todo) => {
                const title = todo.querySelector('.status').innerText;
                const matchingTodo = filteredTodos.some(item => item.tipo !== title);
                if (matchingTodo) {
                    todo.style.display = 'block';
                } else {
                    todo.style.display = 'block';
                }
            })
    }
}

// Evento para filtrar
const filterTipo = document.querySelector('#filter-tipo');
filterTipo.addEventListener('change', (event) => {
    filterTodosSelect(event.target.value);
});

// Evento de clique para mostrar o formulário de notas
ouvirClick(buttonNota, () => {
    mostrarElemento(divNota);
});

// Evento de envio do formulário
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputText = document.querySelector('#titulo-notas').value;
    const inputTextAreaNotas = document.querySelector('#notas-input').value;
    const inputTipo = document.querySelector('#opcao-notas').value;
    const inputTipoName = document.querySelector('#opcao-notas-name').value;

    criarDivsNotas(inputText, inputTextAreaNotas, inputTipo, inputTipoName);
    formulario.reset();
});

// Funções para o Local Storage
const getTodosLocalStorage = () => {
    return JSON.parse(localStorage.getItem("notas")) || [];
}

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
    todos.push(todo);
    localStorage.setItem("notas", JSON.stringify(todos));
}

const updateTodoLocalStorage = () => {
    const todos = [];
    document.querySelectorAll('.user-item .card').forEach((todoElement) => {
        const todoTitle = todoElement.querySelector('h3').innerText;
        const todoText = todoElement.querySelector('p').innerText;
        const tipo = todoElement.querySelector('.status').innerText;
        const name = todoElement.querySelector('h3').innerText;
        const done = todoElement.classList.contains('done');
        todos.push({ text: todoTitle, notas: todoText, tipo: tipo, name: name, done: done ? 1 : 0 });
    });
    localStorage.setItem("notas", JSON.stringify(todos));
}

const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        criarDivsNotas(todo.text, todo.notas, todo.tipo, todo.name, todo.done, 0);
    });
}
window.addEventListener('load', loadTodos);

// Função para editar uma nota
const editTodo = (todoElement) => {
    const todoTitle = todoElement.querySelector('h3').innerText;
    const todoText = todoElement.querySelector('p').innerText;

    const newTitle = prompt("Edite o título:", todoTitle);
    const newText = prompt("Edite a nota:", todoText);

    if (newTitle !== null && newText !== null) {
        todoElement.querySelector('h3').innerText = newTitle;
        todoElement.querySelector('p').innerText = newText;
        updateTodoLocalStorage();
    }
}
