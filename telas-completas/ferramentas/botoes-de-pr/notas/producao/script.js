// Elementos do DOM
const buttonNota = document.querySelector('#button-nota');
const buttonEnviarFormNotas = document.querySelector('#button-enviar-form-notas');
const divNota = document.querySelector('#div-nota');
const divResultado = document.querySelector('#div-resultado');
const inputOpcao = document.querySelector('#opcao-notas');
const formulario = document.querySelector('#form-notas-criar');
const userItem = document.querySelector('.user-item');

// Função para mostrar ou esconder elemento
function mostrarElemento(elemento) {
    if (elemento.classList.contains('d-none')) {
        elemento.classList.add('d-block');
        elemento.classList.remove('d-none');
    } else {
        elemento.classList.add('d-none');
        elemento.classList.remove('d-block');
    }
}

// Função para adicionar evento de clique
function ouvirClick(elemento, funcao) {
    elemento.addEventListener('click', funcao);
}

// Função para criar e adicionar notas
function criarDivsNotas(text, done = 0, save = 1) {
    const inputText = document.querySelector('#titulo-notas').value;
    const inputTextAreaNotas = document.querySelector('#notas-input').value;

    const todo = document.createElement("div");
    todo.classList.add("card");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = inputText;
    todo.appendChild(todoTitle);

    const textName = document.createElement("h3");
    textName.innerText = 'Samuel Santana';
    todo.appendChild(textName);

    const statusButton = document.createElement("button");
    statusButton.classList.add("status");
    statusButton.innerText = 'Individual';
    todo.appendChild(statusButton);

    const todoText = document.createElement("p");
    todoText.innerText = inputTextAreaNotas;
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
        saveTodoLocalStorage({ text: inputText, notes: inputTextAreaNotas, done: 0 });
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

// Evento de clique para mostrar o formulário de notas
ouvirClick(buttonNota, () => {
    mostrarElemento(divNota);
});

// Evento de envio do formulário
formulario.addEventListener('submit', (event) => {
    event.preventDefault();
    criarDivsNotas();
    formulario.reset();
});

// Funções para o Local Storage
const getTodosLocalStorage = () => {
    const localStorageSave = JSON.parse(localStorage.getItem("notas")) || [];
    return localStorageSave;
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
        const done = todoElement.classList.contains('done');
        todos.push({ text: todoTitle, notes: todoText, done: done ? 1 : 0 });
    });
    localStorage.setItem("notas", JSON.stringify(todos));
}

const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        criarDivsNotas(todo.text, todo.done, 0);
    });
}

// Carregar notas ao carregar a página
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
