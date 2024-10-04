<script setup>

import { onMounted, ref  } from 'vue';

const lembreteShowCadastro = ref(false);

function toggleLembreteShow() {
  lembreteShowCadastro.value = !lembreteShowCadastro.value;
}

function cancelCadastro() {
  lembreteShowCadastro.value = false;
}

/**FUNÇÕES GLOBAIS */
async function contatosListarInput(tipo) {
    const todosContatos = await filtrarContatos();
    
    if (tipo === 'lembrete') {
        const opcaoLembrete = document.querySelector('#opcao-lembrete-bate-papo');
        opcaoLembrete.innerHTML = ''; // Limpa opções anteriores
        todosContatos.forEach(contato => {
            const option = document.createElement('option');
            option.value = contato.nome; 
            option.text = contato.nome;   
            opcaoLembrete.appendChild(option);
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


function agendarLembrete() {
  const batePapo = document.getElementById('opcao-lembrete-bate-papo').value;
  const assunto = document.getElementById('assunto').value;
  const descricao = document.getElementById('descricao').value;
  const dataHora = document.getElementById('dataHora').value;
  const tipo = document.getElementById('opcao-lembrete-tipo').value;
  console.log('teste lembrete', batePapo, assunto, descricao, dataHora);

  if (!dataHora) {
      alert('Por favor, selecione uma data e hora válidas.');
      return;
  }

  const dataHoraLembrete = new Date(dataHora);
  const agora = new Date();
  const tempoRestante = dataHoraLembrete - agora;

  if (tempoRestante < 0) {
      alert('Por favor, selecione uma data e hora no futuro.');
      return;
  }

  const camp = { batePapo, assunto, descricao, dataHora, tipo };
  console.log('camp', camp);
  const index = 0;

  setTimeout(() => {
      alert(`Lembrete: ${assunto}\nDescrição: ${descricao}\nBate-papo: ${batePapo}`);
      document.getElementById('div-resposta').appendChild(createCardLembrete(camp, index));
  }, tempoRestante);

  lembreteSalvarNoLocalStorage(camp);
  alert(`Lembrete agendado para ${dataHora}.`);
}

function createCardLembrete(camp, index) {
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

function duplicarLembrete(camp) {
    const novoLembrete = { ...camp };
    console.log('copia do lembrete', novoLembrete);
    lembreteSalvarNoLocalStorage(novoLembrete);
    const salvarLembrete = lembreteGetItemLocalStorage();
    document.getElementById('div-resposta').appendChild(createCardLembrete(novoLembrete, salvarLembrete.length - 1));
}


function lembreteGetItemLocalStorage() {
  const salvarLembrete = JSON.parse(localStorage.getItem("lembretes")) || [];
  return salvarLembrete;
}

function lembreteSalvarNoLocalStorage(todo) {
  const salvarLembrete = lembreteGetItemLocalStorage();
  salvarLembrete.push(todo);
  localStorage.setItem("lembretes", JSON.stringify(salvarLembrete));
}

function lembreteCarregarDoLocalStorage() {
  const salvarLembrete = lembreteGetItemLocalStorage();
  salvarLembrete.forEach((lembrete, index) => {
      document.getElementById('div-resposta').appendChild(createCardLembrete(lembrete, index));
  });
}

onMounted(() => {
  lembreteCarregarDoLocalStorage();
});

function removerLembrete(index) {
  const container = document.getElementById('div-resposta');
  container.innerHTML = '';
  const salvarLembrete = lembreteGetItemLocalStorage();
  salvarLembrete.splice(index, 1);
  localStorage.setItem("lembretes", JSON.stringify(salvarLembrete));
  lembreteCarregarDoLocalStorage();
}

function lembreteSearchLocalStorage() {
    const lembreteStorage = lembreteGetItemLocalStorage();
    const inputSeach = document.getElementById('searchInputLembretes').value.toLowerCase();
    const selectOrder = document.querySelector('select-order').value;

    // Filtra os lembretes
    const filteredLocalStorage = lembreteStorage.filter(lembrete => 
        lembrete.assunto.toLowerCase().includes(inputSeach) ||
        lembrete.descricao.toLowerCase().includes(inputSeach) ||
        lembrete.batePapo.toLowerCase().includes(inputSeach) ||
        lembrete.dataHora.toLowerCase().includes(inputSeach)
    );

    // Ordena os lembretes
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
    filteredLocalStorage.forEach((lembrete, index) => {
        container.appendChild(createCardLembrete(lembrete, index));
    });
}

const lembretesFilterTodosSelect = (filterValue) => {
    const divTodos = document.querySelectorAll('.card');
    let todosLocalStorage = lembreteGetItemLocalStorage();

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

const filtrarTipoLembretes = () => {
    const filterTipo = document.querySelector('.filter-tipo');
    filterTipo.addEventListener('change', (event) => {
        lembretesFilterTodosSelect(event.target.value);
    });
}


</script>

<style scoped>
/* Estilo Geral */
body {
    font-family: Arial, sans-serif;
    background-color: #f8f9fa;
    margin: 0;
    padding: 20px;
}

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

.btn-primary {
    background-color: #007bff;
    border: none;
}

.btn-danger:hover, .btn-primary:hover {
    opacity: 0.9;
}

/* Estilo de Mensagens de Ajuda */
.form-text {
    font-size: 12px;
    color: #6c757d;
}

.list-container-chatbot {
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc; 
  padding: 10px;
}

</style>
<template>
<div>


  <section class="panel" id="section-notas">
      <button @click="toggleLembreteShow">mostrar teleport</button>
      <div class="popup-content">
          <div class="filters">
            <div>
                <input type="text" placeholder="Pesquisar..." class="form-control" @keyup="lembreteSearchLocalStorage()" id="searchInputLembretes">
            </div>
              <div class="filters" @click="filtrarTipoLembretes()">
                  <label for="note-type">Tipo:</label>
                  <select class="filter-tipo">
                      <option value="todos">Todos</option>
                      <option value="grupo">Nota do Grupo</option>
                      <option value="individual">Nota Individual</option>
                  </select>
              </div>
              <div class="filters">
                  <label for="note-type">Ordenar:</label>
                  <select class="filter-tipo" id="select-order" @change="lembreteSearchLocalStorage()">
                      <option value="todos">Todos</option>
                      <option value="Data">Data de criação</option>
                      <option value="Título">Tipo de status</option>
                  </select>
              </div>
          </div>
          <!-- <button class="add-note-btn" id="button-nota" @click="ouvirClick()">+ Adicionar Nota</button> -->
          <div class="note-card list-container-chatbot">
              <div id="div-resposta" class="user-item note-card-header d-flex justify-content-between flex-column">
              </div>
          </div>
      </div>
    </section>
    <!-- Modal para adicionar lembrete -->
        <div class="modal fade show" v-if="lembreteShowCadastro" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-xl">
                <div class="modal-content bg-dark">
                    <div class="modal-header">
                    <h5 id="lembreteModalLabel">Adicione Lembrete</h5>
                    </div>
                    <div class="modal-body d-flex justify-content-center align-items-center">
                        <div id="div-lembrete-modal">
                            <div>
                                <div>
                                <div>
                                    <form id="lembreteForm">
                                      <h5 @click="contatosListarInput('lembrete')">Clique aqui para mostrar bate-papo</h5>
                                        <div class="form-group">
                                            <label for="opcao-lembrete-bate-papo">Selecionar bate-papo</label>
                                            <select class="form-control" id="opcao-lembrete-bate-papo">
                                                <option>Selecione um bate-papo</option>
                                                <!-- As opções serão preenchidas aqui -->
                                            </select>
                                        </div>
                                        <div class="form-group">
                                          <label for="opcao-lembrete-tipo">Selecionar Tipo</label>
                                            <select class="form-control" id="opcao-lembrete-tipo">
                                                <option>grupo</option>
                                                <option>individual</option>
                                                <!-- As opções serão preenchidas aqui -->
                                            </select>
                                        </div>
                                    <div class="form-group">
                                        <label for="assunto">Assunto</label>
                                        <input type="text" class="form-control" id="assunto" maxlength="70" required>
                                        <small id="assuntoHelp" class="form-text text-muted">Por favor, digite o tamanho máximo do assunto deve ser 70.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="descricao">Descrição (opcional)</label>
                                        <textarea class="form-control" id="descricao" rows="3"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="dataHora">Data e hora</label>
                                        <input type="datetime-local" class="form-control" id="dataHora" required>
                                    </div>
                                    
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" @click="cancelCadastro" class="btn btn-danger">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="agendarLembrete">Salvar Lembrete</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
</template>
