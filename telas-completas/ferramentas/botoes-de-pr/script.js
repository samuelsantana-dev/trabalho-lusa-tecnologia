
/*-------------------------------------------------------------------------------*/
// Funcionalidade de tela de notas
const buttonNota = document.querySelector('#button-nota');
const userItem = document.querySelector('.user-item');

function mostrarElemento(elemento) {
    if(elemento.classList.contains('d-none')){
        console.log('mostrar na function')
        elemento.classList.remove('d-none')
    } else {
        console.log('Remover na function')
        elemento.classList.add('d-none')
    }
}

function ouvirClick() {
    console.log('ouvirClick')
     const divNota = document.querySelector('#div-nota');
     mostrarElemento(divNota);
}

function inputCheck(){
     const sectionNotas = document.querySelector('#section-notas');
     console.log('sectionNotas', sectionNotas)
     mostrarElemento(sectionNotas);
}


function criarDivsNotas(text,  name, notas, createdAt,createTime, tipo,  done = 0, save = 1) {
    const todo = document.createElement("div");
    todo.classList.add("card");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    todo.appendChild(cardBody);
    console.log('cardBody', cardBody)

    const todoTitle = document.createElement("h5");
    todoTitle.classList.add("card-title");
    todoTitle.innerText = text;
    cardBody.appendChild(todoTitle);
     console.log('todoTitle', todoTitle)

    const textName = document.createElement("h3");
    textName.classList.add("card-text");
    textName.innerText = name;
    cardBody.appendChild(textName);
    console.log('textName', textName)

    const todoText = document.createElement("p");
    todoText.classList.add("card-text");
    todoText.innerText = notas;
    cardBody.appendChild(todoText);
    console.log('todoText', todoText)

    const createdP = document.createElement("p");
    createdP.classList.add("card-text");
    createdP.innerText = `Criação: ${createdAt} - ${createTime}`;
    cardBody.appendChild(createdP);
    console.log('createdP', createdP)

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("d-flex", "justify-content-end");
    cardBody.appendChild(buttonGroup);
    console.log('buttonGroup', buttonGroup)

    const statusButton = document.createElement("button");
    statusButton.classList.add("btn", "btn-sm", "btn-outline-secondary", "status");
    statusButton.innerText = tipo;
    cardBody.appendChild(statusButton);
    console.log('statusButton', statusButton)

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    buttonGroup.appendChild(doneBtn);
    console.log('doneBtn', doneBtn)

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    buttonGroup.appendChild(editBtn);
    console.log('editBtn', editBtn)

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-sm", "btn-outline-secondary");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    buttonGroup.appendChild(deleteBtn);
    console.log('deleteBtn', deleteBtn)

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

function filtrarTipo(){
    const filterTipo = document.querySelector('.filter-tipo');
    filterTipo.addEventListener('change', (event) => {
        filterTodosSelect(event.target.value);
    });
}

function enviarFormulario() {
    const inputText = document.querySelector('#titulo-notas').value;
    const inputTextAreaNotas = document.querySelector('#notas-input').value;
    const inputTipo = document.querySelector('#opcao-notas').value;
    const inputTipoName = document.querySelector('#opcao-notas-name').value;
    const createdAt = new Date().toLocaleDateString();
    const createTime = new Date().toLocaleTimeString();

    console.log('valores', inputText, inputTextAreaNotas, inputTipo, inputTipoName, createdAt, createTime);

    criarDivsNotas(inputText, inputTipoName, inputTextAreaNotas, createdAt, createTime, inputTipo);
}


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
        console.log('ForEach', todo)
        criarDivsNotas(todo.text, todo.notas, todo.tipo, todo.name, todo.createdAt, todo.createTime, todo.done, 0);
    });
}
window.addEventListener('load', loadTodos);

const editTodo = (todoElement) => {
    const todoTitle = todoElement.querySelector('h3');
    const todoText = todoElement.querySelector('p');
  
    const newTitle = prompt("Edite o título:", todoTitle.innerText);
    const newText = prompt("Edite a nota:", todoText.innerText);
  
    if (newTitle !== null && newText !== null) {
      todoTitle.innerText = newTitle;
      todoText.innerText = newText;
      updateTodoLocalStorage();
    }
  };