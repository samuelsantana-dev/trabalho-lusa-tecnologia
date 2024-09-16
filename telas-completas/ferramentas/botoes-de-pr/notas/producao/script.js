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
function criarDivsNotas(text, notas, tipo, name, createdAt, createTime, done = 0, save = 1) {
    const todo = document.createElement("div");
    todo.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    todo.appendChild(cardBody);

    const todoTitle = document.createElement("h5");
    todoTitle.classList.add("card-title");
    todoTitle.innerText = text;
    cardBody.appendChild(todoTitle);

    const textName = document.createElement("h3");
    textName.classList.add("card-text");
    textName.innerText = name;
    cardBody.appendChild(textName);

    const todoText = document.createElement("p");
    todoText.classList.add("card-text");
    todoText.innerText = notas;
    cardBody.appendChild(todoText);

    const createdP = document.createElement("p");
    createdP.classList.add("card-text");
    createdP.innerText = `Criação: ${createdAt} - ${createTime}`;
    cardBody.appendChild(createdP);

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("d-flex", "justify-content-end");
    cardBody.appendChild(buttonGroup);

    const statusButton = document.createElement("button");
    statusButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "status");
    statusButton.innerText = tipo;
    cardBody.appendChild(statusButton);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    buttonGroup.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    buttonGroup.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    buttonGroup.appendChild(deleteBtn);

    userItem.appendChild(todo);

    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text: text, notas: notas, tipo: tipo, name: name, done: done, createdAt: createdAt, createTime: createTime });
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
const filterTipo = document.querySelector('.filter-tipo');
filterTipo.addEventListener('change', (event) => {
    filterTodosSelect(event.target.value);
});

// Evento de clique para mostrar o formulário de notas
// buttonNota.addEventListener('click', () => {
//     mostrarElemento(divNota);
// })
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

    // Data e hora
    const createdAt = new Date().toLocaleDateString();
    const createTime = new Date().toLocaleTimeString();

    criarDivsNotas(inputText, inputTextAreaNotas, inputTipo, inputTipoName, createdAt, createTime);
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
        const createdAt = new Date().toLocaleDateString();
        const createTime = new Date().toLocaleTimeString();
        const done = todoElement.classList.contains('done');
        todos.push({ text: todoTitle, notas: todoText, tipo: tipo, name: name, createdAt: createdAt, createTime: createTime, done: done ? 1 : 0 });
    });
    localStorage.setItem("notas", JSON.stringify(todos));
}

const loadTodos = () => {
    const todos = getTodosLocalStorage();
    todos.forEach((todo) => {
        criarDivsNotas(todo.text, todo.notas, todo.tipo, todo.name, todo.createdAt, todo.createTime, todo.done, 0);
    });
}
window.addEventListener('load', loadTodos);

// Função para editar uma nota
const editTodo = (todoElement) => {
    const todoTitle = todoElement.querySelector('h3');
    const todoText = todoElement.querySelector('p');
  
    const newTitle = prompt("Edite o título:", todoTitle.innerText);
    const newText = prompt("Edite a nota:", todoText.innerText);
  
    if (newTitle !== null && newText !== null) {
      todoTitle.innerText = newTitle; // Atualiza o título do elemento
      todoText.innerText = newText; // Atualiza o texto do elemento
      updateTodoLocalStorage(); // Atualiza o localStorage com as mudanças
    }
  };