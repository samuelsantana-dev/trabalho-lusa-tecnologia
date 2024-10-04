
<script setup>

import { onMounted, ref } from 'vue';

const notasShowCadastro = ref(false);

function toggleNotasShow() {
  notasShowCadastro.value = !notasShowCadastro.value;
}


function cancelCadastro() {
  notasShowCadastro.value = false;
}

async function filtrarContatos(){
  return new Promise((resolve, reject) => {
    const opcao = '1'
      
      let data = []
      for(let index = 0; index < window.SuiteStore.Chat._models.length; index ++){
        const chat = window.SuiteStore.Chat._models[index]
        if(!chat.isUser) continue;
        if(chat.attributes.contact.isEnterprise) continue;
        
        if(typeof chat.contact == 'undefined') continue;

        let saved = chat.contact.isAddressBookContact == 1

        if(opcao == '3' && !saved){
          extractContactInfo(chat,data)  
        }else if(opcao == '2' && saved){
          extractContactInfo(chat,data)
        }else if(opcao == '1'){
          extractContactInfo(chat,data)
        }
      }
      resolve(data)
  })
}

async function extractContactInfo(chat, data){
  return new Promise(async (resolve, reject)=>{
  if(chat.isGroup){
    let results = await extractGroupContacts(chat, 'todos')
    for(let result of results){
      data.push(result)
    }
  }else if(chat.isEnterprise){
    data.push({nome: chat.verifiedName, numero: chat.id.user})
  }else{
    data.push({nome: chat.formattedTitle, numero: chat.id.user})
  }
    resolve()
  })
}

async function extractGroupContacts(chat, option = 'todos'){
  let lista = []
  let contacts = chat.groupMetadata.participants._models
  for(let cont in contacts){
    if(typeof contacts[cont].contact == 'undefined') continue;

    if(option == 'salvos' && contacts[cont].contact.isAddressBookContact == 0) continue;
    
    if(option == 'nao-salvos' && contacts[cont].contact.isAddressBookContact == 1) continue;
    lista.push({
      nome: contacts[cont].contact?.__x_pushname ?? '',
      numero: contacts[cont].id.user
    })
  }
  return lista;
}



async function contatosListarInput(tipo) {
    const todosContatos = await filtrarContatos();
    
    if (tipo === 'lembrete') {
        const opcaoLembrete = document.querySelector('#opcao-lembrete-bate-papo');
        opcaoLembrete.innerHTML = ''; 
        todosContatos.forEach(contato => {
            const option = document.createElement('option');
            option.value = contato.nome; 
            option.text = contato.nome;   
            opcaoLembrete.appendChild(option);
        });
    } else if (tipo === 'notas') {
        const opcaoNotasContato = document.querySelector('#opcao-notas-name');
        opcaoNotasContato.innerHTML = ''; 
        todosContatos.forEach(contato => {
            const option = document.createElement('option');
            option.value = contato.nome; 
            option.text = contato.nome;   
            opcaoNotasContato.appendChild(option);
        });
    }
}

function criarDivsNotas(camp, index) {
    const card = document.createElement('div');
    card.className = 'card mt-2';
  
    card.innerHTML = `
            <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center">
                <div class="col ms-1 scrollable-content">
                    <div>${camp.assunto}</div>
                    <div>
                        <b class="text-dark">Descrição: </b>
                        <span>${camp.descricao}</span>
                    </div>
                    <div>
                        <b class="text-dark">Bate-papo: </b>
                        <span>${camp.batePapo}</span>
                    </div>
                    <div>
                        <b class="text-dark">Agendamento: </b>
                        <span>${camp.dataHora}</span>
                    </div>
                    <div>
                        <b class="text-dark">Tipo: </b>
                        <span class="status">${camp.tipo}</span>
                    </div>
                </div>
            </div>
            <div class="flex align-items-center justify-content-between">
                <span class="cursor remove-icon">&#128465;</span>
                <span class="cursor edit-icon">&#9997;</span>
                <span class="cursor duplicate-icon">&#128260;</span>
            </div>
        </div>
    `;
  
    card.querySelector('.remove-icon').addEventListener('click', function () {
        removerLembrete(index);
    });
  
    card.querySelector('.duplicate-icon').addEventListener('click', function () {
      duplicarLembrete(camp);
    });
  
    return card;
  }  

// function criarDivsNotas(text, name, notas, createdAt, createTime, tipo, done = 0, save = 1) {
//   console.log("criarDivsNotas ola");

//   const index = getTodosLocalStorage().length; // Obtém o índice atual
//   const card = document.createElement('div');
//   card.className = 'card mt-2';
//   card.id = `card-notas-${index}`;

//   card.innerHTML = `
//     <div class="d-flex align-items-center justify-content-between p-2">
//       <div class="d-flex align-items-center">
//         <div class="col ms-1 scrollable-content">
//           <div><strong>${name}</strong></div>
//           <div>
//             <b class="text-dark">Texto: </b>
//             <span>${text}</span>
//           </div>
//           <div>
//             <b class="text-dark ">Tipo: </b>
//             <span >${tipo}</span>
//           </div>
//           <div class="d-flex">
//             <b class="text-dark">Notas: </b>
//             <span class="status">${notas}</span>
//           </div>
//           <div>
//             <b class="text-dark">Criação: </b>
//             <span>${createdAt} ${createTime}</span>
//           </div>
//         </div>
//       </div>
//       <div class="d-flex align-items-center">
//         <span class="cursor remove-icon" aria-label="Remover" data-index="${index}">&#128465;</span>
//         <span class="cursor edit-icon" aria-label="Editar">&#9997;</span>
//         <span class="cursor duplicate-icon" aria-label="Duplicar">&#128260;</span>
//       </div>
//     </div>
//   `;

//   // Adicionando eventos para os ícones
//   const buttonDeletar = card.querySelector('.remove-icon');
//   if (buttonDeletar) {
//     buttonDeletar.addEventListener('click', function () {
//       const index = parseInt(this.getAttribute('data-index'), 10);
//       deletearStorageNotas(index);
//     });
//   }

//   card.querySelector('.edit-icon').addEventListener('click', function () {
//     editTodo(card);
//   });

//   if (done) {
//     card.classList.add("done");
//   }

//   if (save) {
//     saveTodoLocalStorage({ text, notas, tipo, name, done, createdAt, createTime });
//   }

//   const container = document.querySelector('#div-resposta');
//   if (container) {
//     container.appendChild(card);
//   } else {
//     console.log("Container não encontrado");
//   }
// }

function duplicarNotas(camp) {
    const novoLembrete = { ...camp };
    console.log('copia do lembrete', novoLembrete);
    lembreteSalvarNoLocalStorage(novoLembrete);
    const salvarLembrete = lembreteGetItemLocalStorage();
    document.getElementById('div-resposta').appendChild(createCardLembrete(novoLembrete, salvarLembrete.length - 1));
}


// Preciso passar o index do elemento que eu quero remover
function deletearStorageNotas(index) {
  console.log('entrou na função deletearStorageNotas');
  
  // Remove o elemento do DOM
  const card = document.querySelector(`#card-notas-${index}`);
  if (card) {
    console.log("card removido", card);
    card.remove();
  }

  // Remove a nota do localStorage
  const removerNotasStorage = getTodosLocalStorage();
  removerNotasStorage.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(removerNotasStorage));
}

const filterTodosSelect = (filterValue) => {
    const divTodo = document.querySelectorAll('.card');
    console.log('divTodo', divTodo);
    const todosLocalStorage = getTodosLocalStorage();

    // Exibir todos os elementos no caso de "todos"
    if (filterValue === "todos") {
        divTodo.forEach((todo) => {
            todo.style.display = 'block';
        });
        return;
    }

    // Filtrar os todos com base no tipo selecionado
    const filteredTodos = todosLocalStorage.filter(todo => todo.tipo === filterValue);

    // Mostrar ou ocultar os elementos com base no filtro
    divTodo.forEach((todo) => {
        const title = todo.querySelector('.status').innerText;
        if(title){
            console.log('title', title);
        console.log('filterValue', filterValue);
        const matchingTodo = filteredTodos.some(item => item.tipo === title);
        todo.style.display = matchingTodo ? 'block' : 'none';
        }
        
    });
};

// const lembretesFilterTodosSelect = (filterValue) => {
//     const divTodos = document.querySelectorAll('.card');
//     let todosLocalStorage = lembreteGetItemLocalStorage();

//     divTodos.forEach((todo) => {
//         const statusElement = todo.querySelector('.status');
//         if (statusElement) {
//             const title = statusElement.innerText;
//             console.log('title', title);

//             if (filterValue === "todos") {
//                 todo.style.display = 'block';
//             } else {
//                 const matchingTodo = todosLocalStorage.some(item => item.tipo === filterValue && item.tipo === title);
//                 todo.style.display = matchingTodo ? 'block' : 'none';
//             }
//         } else {
//             console.log('Status element not found for a card.');
//             todo.style.display = 'none'; 
//         }
//     });
// }


function filtrarTipo(){
    const filterTipo = document.querySelector('.filter-tipo');
    filterTipo.addEventListener('change', (event) => {
        filterTodosSelect(event.target.value);
    });
}


function enviarFormulario() {
    console.log("enviando formulario notas");
    const inputText = document.querySelector('#titulo-notas').value;
    const inputTextAreaNotas = document.querySelector('#notas-input').value;
    const inputTipo = document.querySelector('#opcao-notas').value;
    const inputTipoName = document.querySelector('#opcao-notas-name').value;
    const createdAt = new Date().toLocaleDateString();
    const createTime = new Date().toLocaleTimeString();

   document.querySelector("#div-resposta").appendChild(criarDivsNotas(inputText, inputTipoName, inputTextAreaNotas, createdAt, createTime, inputTipo));
}


const getTodosLocalStorage = () => {
    console.log('getTodosLocalStorage notas');
    return JSON.parse(localStorage.getItem("notas")) || [];
}

const saveTodoLocalStorage = (todo) => {
    console.log('saveTodoLocalStorage notas');
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

onMounted(async() => {
  loadTodos();
})


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
</script>

<style scoped>
/* Estilos para a seção de notas */
#section-notas {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 20px;
}

.popup-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.filters {
    margin-bottom: 15px;
}

.filter-tipo {
    width: 100%;
    padding: 5px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: #fff;
}

.note-card {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.note-card-header {
    background-color: #e9ecef;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.user-item {
    padding: 15px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Estilos para o modal */
.modal-content {
    border-radius: 8px;
}

.modal-header {
    background-color: #343a40;
    color: #fff;
    border-bottom: 1px solid #454d55;
}

.modal-title {
    font-size: 1.25rem;
}

.popup {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-label {
    font-weight: 500;
}

.form-control {
    border: 1px solid #ced4da;
    border-radius: 4px;
}

#button-enviar-form-notas {
    background-color: #007bff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
}

#button-enviar-form-notas:hover {
    background-color: #0056b3;
}

.btn-danger {
    background-color: #dc3545;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
}

.btn-danger:hover {
    background-color: #c82333;
}

</style>

<template>
    
  <!-- section de div notas -->
    <section class="panel" id="section-notas">
        <button @click="toggleNotasShow">mostrar teleport</button>
        <div class="popup-content">
            <div class="filters" @click="filtrarTipo()">
                <label for="note-type">Tipo:</label>
                <select class="filter-tipo">
                    <option value="todos">Todos</option>
                    <option value="grupo">Nota do Grupo</option>
                    <option value="individual">Nota Individual</option>
                </select>
            </div>
            <div class="note-card list-container-chatbot">
                <div id="div-resposta" class="user-item note-card-header d-flex justify-content-between flex-column">
                </div>
            </div>
        </div>
    </section>

  <!-- Modal para Adicionar Nota -->
        <div class="modal fade show" v-if="notasShowCadastro" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                        <h5 class="modal-title">Adicionar Nota</h5>
                    </div>
                    <div class="modal-body d-flex justify-content-center align-items-center">
                        <div class="popup mt-5">
                                <div id="form-notas-criar">
                                    <div class="mb-3">
                                        <label for="opcao-notas" class="form-label">Opção</label>
                                        <select name="opcao" id="opcao-notas" class="form-control">
                                            <option value="individual">Individual</option>
                                            <option value="grupo">Grupo</option>
                                        </select>
                                    </div>
                                      <div class="mb-3">
                                          <label for="opcao-notas-name" class="form-label">Nome</label>
                                          <select name="opcao" id="opcao-notas-name" class="form-control" @click="contatosListarInput('notas')">
                                              <option>Selecione um contato</option>
                                              <!-- As opções serão preenchidas aqui -->
                                          </select>
                                      </div>
                                    <div class="mb-3">
                                        <label for="titulo-notas" class="form-label">Título *</label>
                                        <input type="text" class="form-control" id="titulo-notas" placeholder="Digite o texto">
                                    </div>
                                    <div class="mb-3">
                                        <label for="notas-input" class="form-label">Notas *</label>
                                        <textarea class="form-control" id="notas-input" rows="3"></textarea>
                                    </div>
                                    
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="cancelCadastro" class="btn btn-danger">Cancelar</button>
                    <button type="button" id="button-enviar-form-notas" class="btn btn-primary" @click="enviarFormulario()">Enviar</button>
                    </div>
                </div>
            </div>
        </div>
</template>
