function agendarLembrete() {
  const batePapo = document.getElementById('batePapo').value;
  const assunto = document.getElementById('assunto').value;
  const descricao = document.getElementById('descricao').value;
  const dataHora = document.getElementById('dataHora').value;

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

  const camp = { batePapo, assunto, descricao, dataHora };
  const index = 0;

  setTimeout(() => {
      alert(`Lembrete: ${assunto}\nDescrição: ${descricao}\nBate-papo: ${batePapo}`);
      console.log(`Lembrete: ${assunto}\nDescrição: ${descricao}\nBate-papo: ${batePapo}\nData e Hora: ${dataHora}`);
      document.getElementById('campanhasContainer').appendChild(createCard(camp, index));
  }, tempoRestante);

  salvarNoLocalStorage(camp);
  alert(`Lembrete agendado para ${dataHora}.`);
  $('#lembreteModal').modal('hide');
}

function createCard(camp, index) {
  const card = document.createElement('div');
  card.className = 'card mt-2';

  card.innerHTML = `
      <div class="flex align-items-center justify-content-between">
          <div class="flex align-items-center">
              <div class="col ms-1">
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
              </div>
          </div>
          <div class="flex align-items-center justify-content-between">
              <span class="cursor remove-icon">&#128465;</span>
              <span class="cursor edit-icon">&#9997;</span>
          </div>
      </div>
  `;

  card.querySelector('.remove-icon').addEventListener('click', function () {
      removerLembrete(index);
  });

  card.querySelector('.edit-icon').addEventListener('click', function () {
      edit(camp);
  });

  return card;
}

function getItemLocalStorage() {
  const salvarLembrete = JSON.parse(localStorage.getItem("lembretes")) || [];
  return salvarLembrete;
}

function salvarNoLocalStorage(todo) {
  const salvarLembrete = getItemLocalStorage();
  salvarLembrete.push(todo);
  localStorage.setItem("lembretes", JSON.stringify(salvarLembrete));
}

function carregarDoLocalStorage() {
  const salvarLembrete = getItemLocalStorage();
  salvarLembrete.forEach((lembrete, index) => {
      document.getElementById('campanhasContainer').appendChild(createCard(lembrete, index));
  });
}

function removerLembrete(index) {
  const container = document.getElementById('campanhasContainer');
  container.innerHTML = '';
  const salvarLembrete = getItemLocalStorage();
  salvarLembrete.splice(index, 1);
  localStorage.setItem("lembretes", JSON.stringify(salvarLembrete));
  carregarDoLocalStorage();

  
}

// Chama a função para carregar lembretes ao carregar a página
window.onload = carregarDoLocalStorage;
