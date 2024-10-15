<template>
  
  <section class="panel m-1rem" id="section-notas" style="margin: 1rem;">
    <div class="popup-content">
      <div class="filters mb-3">
        <div class="mb-3" @click="filtrarTipoNota()">
          <label for="note-type" class="form-label">Tipo:</label>
          <select class="form-select filter-tipo">
            <option value="todos">Todos</option>
            <option value="grupo">Nota do Grupo</option>
            <option value="individual">Nota Individual</option>
          </select>
        </div>
        <div>
          <input type="text" placeholder="Pesquisar..." class="form-control" @keyup="notaSearchLocalStorage()" id="searchInputNota">
        </div>
      </div>
      <button class="btn btn-primary mb-3" @click="toggleNotaShow">Mostrar Teleport</button>
      <div class="note-card list-container-chatbot">
        <div id="div-resposta" class="user-item note-card-header d-flex flex-column">
          <div class="list-container-abas">
            <div class="card mb-3" v-for="(todo, index) in todos" :key="index">
              <div class="row justify-content-between">
                <div class="col">
                  <p class="text-dark m-0 fw-bolder">{{ todo.text }}</p>
                </div>
                <div class="col">
                  <div class="d-flex justify-content-end">
                    <span @click="removeTodo(index)" class="cursor me-2">&#128465;</span>
                    <span @click="showEditarModeloMensagem(todo.id)" class="cursor me-2">&#9997;</span>
                    <span @click="duplicarModeloMensagem(todo.id)" class="cursor">&#x1F504;</span>
                  </div>
                </div>
              </div>
              <div class="col mt-2">
                <p class="text-muted m-0">Tipo Mensagem: <span class="badge rounded-pill bg-warning">{{ todo.title }} e {{ todo.notes }}</span></p>
                Enviar mensagem para: <span class="badge rounded-pill bg-info">{{ todo.dateTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>