<script setup>

import { onMounted, ref  } from 'vue';

const notaShowCadastro = ref(false);

function toggleNotaShow() {
  notaShowCadastro.value = !notaShowCadastro.value;
}

function cancelCadastro() {
  notaShowCadastro.value = false;
}

/**FUNÇÕES GLOBAIS */
async function contatosListarInput(tipo) {
    const todosContatos = await filtrarContatos();
    
    if (tipo === 'nota') {
        const opcaoNota = document.querySelector('#titulo-notas');
        opcaoNota.innerHTML = ''; // Limpa opções anteriores
        todosContatos.forEach(contato => {
            const option = document.createElement('option');
            option.value = contato.nome; 
            option.text = contato.nome;   
            opcaoNota.appendChild(option);
        });
    } else if (tipo === 'notas') {
        const opcaoNotasContato = document.querySelector('#opcao-notas-name');
        opcaoNotasContato.innerHTML = ''; // Limpa opções anteriores
        todosContatos.forEach(contato => {
            const option = document.createElement('option');
            option.value = contato.nome; 
            option.text = contato.nome;   
            opcaoNotasContato.appendChild(option);
        });
    }
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


function agendarNota() {
  const batePapo = document.getElementById('titulo-notas').value;
  const assunto = document.getElementById('notas-input').value;
  const descricao = document.getElementById('opcao-notas').value;
  const dataHora = document.getElementById('opcao-notas-name').value;
  const tipo = document.getElementById('opcao-nota-tipo').value;
  console.log('teste nota', batePapo, assunto, descricao, dataHora, tipo);

  const camp = { batePapo, assunto, descricao, dataHora, tipo };
  console.log('camp', camp);
  const index = 0;

  document.getElementById('div-resposta').appendChild(createCardNota(camp, index));
  notaSalvarNoLocalStorage(camp);
}

function createCardNota(camp, index) {
    const card = document.createElement('div');
    card.className = 'card mt-2';
  
    card.innerHTML = `
            <div class="flex align-items-center justify-content-between">
            <div class="flex align-items-center">
                <div class="col ms-1 scrollable-content">
                    <div class="titulo">${camp.assunto}</div>
                    <div>
                        <b class="text-dark">Descrição: </b>
                        <span class="descricao">${camp.descricao}</span>
                    </div>
                    <div>
                        <b class="text-dark">Bate-papo: </b>
                        <span class="batePapo">${camp.batePapo}</span>
                    </div>
                    <div>
                        <b class="text-dark">Agendamento: </b>
                        <span class="dataHora">${camp.dataHora}</span>
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
        removerNota(index);
    });
  
    card.querySelector('.duplicate-icon').addEventListener('click', function () {
      duplicarNota(camp);
    });
  
    card.querySelector('.edit-icon').addEventListener('click', function () {
      editarNota(camp, index);
    });
    return card;
  }  

function duplicarNota(camp) {
    const novoNota = { ...camp };
    console.log('copia do nota', novoNota);
    notaSalvarNoLocalStorage(novoNota);
    const salvarNota = notaGetItemLocalStorage();
    document.getElementById('div-resposta').appendChild(createCardNota(novoNota, salvarNota.length - 1));
}

function editarNota(camp, index, todoElement) {
    const editNota = { ...camp };
    console.log('editNota', editNota);

    // Criar prompts para capturar novos valores
    const novoTitulo = prompt("Edite o título da nota:", editNota.titulo);
    const novoAssunto = prompt("Edite o assunto da nota:", editNota.assunto);
    const novaDescricao = prompt("Edite a descrição da nota:", editNota.descricao);
    const novaDataHora = prompt("Edite a data e hora da nota:", editNota.dataHora);
    const novoTipo = prompt("Edite o tipo da nota:", editNota.tipo);

    // Verificar se os novos valores são diferentes de null
    if (novoTitulo !== null) editNota.titulo = novoTitulo;
    if (novoAssunto !== null) editNota.assunto = novoAssunto;
    if (novaDescricao !== null) editNota.descricao = novaDescricao;
    if (novaDataHora !== null) editNota.dataHora = novaDataHora;
    if (novoTipo !== null) editNota.tipo = novoTipo;

    // Atualizar a nota no localStorage
    const notas = JSON.parse(localStorage.getItem('notas')) || [];
    notas[index] = editNota;
    localStorage.setItem('notas', JSON.stringify(notas));

    // Atualizar a exibição da nota no elemento HTML
    todoElement.querySelector('.titulo').textContent = editNota.titulo;
    todoElement.querySelector('.assunto').textContent = editNota.assunto;
    todoElement.querySelector('.descricao').textContent = editNota.descricao;
    todoElement.querySelector('.dataHora').textContent = editNota.dataHora;
    todoElement.querySelector('.status').textContent = editNota.tipo;

    console.log('Nota editada com sucesso:', editNota);
}


function removerNota(index) {
  const container = document.getElementById('div-resposta');
  container.innerHTML = '';
  const salvarNota = notaGetItemLocalStorage();
  salvarNota.splice(index, 1);
  localStorage.setItem("notas", JSON.stringify(salvarNota));
  notaCarregarDoLocalStorage();
}


function notaGetItemLocalStorage() {
  const salvarNota = JSON.parse(localStorage.getItem("notas")) || [];
  return salvarNota;
}

function notaSalvarNoLocalStorage(todo) {
  const salvarNota = notaGetItemLocalStorage();
  salvarNota.push(todo);
  localStorage.setItem("notas", JSON.stringify(salvarNota));
}

function notaCarregarDoLocalStorage() {
  const salvarNota = notaGetItemLocalStorage();
  salvarNota.forEach((nota, index) => {
      document.getElementById('div-resposta').appendChild(createCardNota(nota, index));
  });
}

onMounted(() => {
  notaCarregarDoLocalStorage();
});

function notaSearchLocalStorage() {
    const notaStorage = notaGetItemLocalStorage();
    const inputSeach = document.getElementById('searchInputNota').value.toLowerCase();
    const selectOrder = document.querySelector('select-order').value;

    // Filtra os notas
    const filteredLocalStorage = notaStorage.filter(nota => 
        nota.assunto.toLowerCase().includes(inputSeach) ||
        nota.descricao.toLowerCase().includes(inputSeach) ||
        nota.batePapo.toLowerCase().includes(inputSeach) ||
        nota.dataHora.toLowerCase().includes(inputSeach)
    );

    // Ordena os notas
    switch (selectOrder) {
        case "Data":
            filteredLocalStorage.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
            break;
        case "Título":
            filteredLocalStorage.sort((a, b) => a.assunto.localeCompare(b.assunto));
            break;
        default:
            break;
    }

    // Atualiza o container
    const container = document.getElementById('div-resposta');
    container.innerHTML = '';
    filteredLocalStorage.forEach((nota, index) => {
        container.appendChild(createCardNota(nota, index));
    });
}

const notasFilterTodosSelect = (filterValue) => {
    const divTodos = document.querySelectorAll('.card');
    let todosLocalStorage = notaGetItemLocalStorage();

    divTodos.forEach((todo) => {
        const statusElement = todo.querySelector('.status');
        if (statusElement) {
            const title = statusElement.innerText;
            console.log('title', title);

            if (filterValue === "todos") {
                todo.style.display = 'block';
            } else {
                const matchingTodo = todosLocalStorage.some(item => item.tipo === filterValue && item.tipo === title);
                todo.style.display = matchingTodo ? 'block' : 'none';
            }
        } else {
            console.log('Status element not found for a card.');
            todo.style.display = 'none'; 
        }
    });
}

const filtrarTipoNota = () => {
    const filterTipo = document.querySelector('.filter-tipo');
    filterTipo.addEventListener('change', (event) => {
        notasFilterTodosSelect(event.target.value);
    });
}
</script>


<style scoped>

/* Estilo da Seção de Notas */
.panel {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
}

/* Estilo do Botão de Mostrar Teleport */
button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

/* Estilo da Pop-up */
.popup-content {
    margin-top: 20px;
}

/* Estilo dos Filtros */
.filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 15px;
}

.filter-tipo {
    margin-left: 10px;
}

/* Estilo da Cartão de Nota */
.note-card {
    margin-top: 20px;
}

.user-item {
    padding: 15px;
    background-color: #f1f1f1;
    border-radius: 5px;
    margin-bottom: 10px;
}

/* Estilo do Modal */
.modal-content {
    border-radius: 8px;
}

.modal-header {
    background-color: #007bff;
    color: white;
    padding: 15px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-control {
    border-radius: 5px;
    border: 1px solid #ced4da;
    padding: 10px;
    width: 100%;
}

/* Estilo para Botões do Modal */
.modal-footer {
    justify-content: space-between;
}

.btn-danger {
    background-color: #dc3545;
    border: none;
}

.notas-btn-primary {
    background-color: #007bff;
    border: none;
}

.btn-danger:hover, .notas-btn-primary:hover {
    opacity: 0.9;
}

/* Estilo de Mensagens de Ajuda */
.notas-form-text {
    font-size: 12px;
    color: #6c757d;
}

.list-container-chatbot-notas {
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc; 
  padding: 10px;
}
</style>

<template>

 <section class="panel" id="section-notas">
      <button @click="toggleNotaShow">mostrar teleport</button>
      <div class="popup-content">
          <div class="filters">
            <div>
                <input type="text" placeholder="Pesquisar..." class="form-control" @keyup="notaSearchLocalStorage()" id="searchInputNota">
            </div>
              <div class="filters" @click="filtrarTipoNota()">
                  <label for="note-type">Tipo:</label>
                  <select class="filter-tipo">
                      <option value="todos">Todos</option>
                      <option value="grupo">Nota do Grupo</option>
                      <option value="individual">Nota Individual</option>
                  </select>
              </div>
              <!-- <div class="filters">
                  <label for="note-type">Ordenar:</label>
                  <select class="filter-tipo" id="select-order" @change="notaSearchLocalStorage()">
                      <option value="todos">Todos</option>
                      <option value="Data">Data de criação</option>
                      <option value="Título">Tipo de status</option>
                  </select>
              </div> -->
          </div>
          <!-- <button class="add-note-btn" id="button-nota" @click="ouvirClick()">+ Adicionar Nota</button> -->
          <div class="note-card list-container-chatbot-notas">
              <div id="div-resposta" class="user-item note-card-header d-flex justify-content-between flex-column">
              </div>
          </div>
      </div>
    </section>

  <!-- Modal para Adicionar Nota -->
       <div class="modal fade show" v-if="notaShowCadastro" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                    <h5 id="notaModalLabel">Adicione Nota</h5>
                    </div>
                    <div class="modal-body d-flex justify-content-center align-items-center">
                        <div id="div-nota-modal">
                            <div>
                                <div>
                                <div>
                                    <form id="notaForm">
                                        <div class="form-group">
                                            <label for="titulo-notas">Selecionar bate-papo</label>
                                            <select class="form-control" id="titulo-notas" @change="contatosListarInput('nota')">
                                                <option>Selecione um bate-papo</option>
                                                <!-- As opções serão preenchidas aqui -->
                                            </select>
                                        </div>
                                        <div class="form-group">
                                          <label for="opcao-nota-tipo">Selecionar Tipo</label>
                                            <select class="form-control" id="opcao-nota-tipo">
                                                <option>grupo</option>
                                                <option>individual</option>
                                                <!-- As opções serão preenchidas aqui -->
                                            </select>
                                        </div>
                                    <div class="form-group">
                                        <label for="notas-input">Assunto</label>
                                        <input type="text" class="form-control" id="notas-input" maxlength="70" required>
                                        <small id="assuntoHelp" class="notas-form-text text-muted">Título *</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="opcao-notas">Notas *</label>
                                        <input type="text"  class="form-control" id="opcao-notas" placeholder="Notas" rows="3" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="opcao-notas-name">Data e hora</label>
                                        <input class="form-control" id="opcao-notas-name" placeholder="Data e hora" rows="3" required />
                                    </div>
                                    
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" @click="cancelCadastro" class="btn btn-danger">Cancelar</button>
                    <button type="button" class="btn notas-btn-primary" @click="agendarNota">Salvar Nota</button>
                    </div>
                </div>
            </div>
        </div>
</template>