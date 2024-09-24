// Função Principal
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
      document.getElementById('campanhasContainer').appendChild(createCardLembrete(camp, index));
  }, tempoRestante);

  lembreteSalvarNoLocalStorage(camp);
  alert(`Lembrete agendado para ${dataHora}.`);
  $('#lembreteModal').modal('hide');
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
    lembreteSalvarNoLocalStorage(novoLembrete);
    const salvarLembrete = lembreteGetItemLocalStorage();
    document.getElementById('campanhasContainer').appendChild(createCardLembrete(novoLembrete, salvarLembrete.length - 1));
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
      document.getElementById('campanhasContainer').appendChild(createCardLembrete(lembrete, index));
  });
}

function removerLembrete(index) {
  const container = document.getElementById('campanhasContainer');
  container.innerHTML = '';
  const salvarLembrete = lembreteGetItemLocalStorage();
  salvarLembrete.splice(index, 1);
  localStorage.setItem("lembretes", JSON.stringify(salvarLembrete));
  lembreteCarregarDoLocalStorage();
}

function lembreteSearchLocalStorage() {
    const lembreteStorage = lembreteGetItemLocalStorage();
    const inputSeach = document.getElementById('searchInputLembretes').value.toLowerCase();
    const selectOrder = document.querySelector('select').value;

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
    const container = document.getElementById('campanhasContainer');
    container.innerHTML = '';
    filteredLocalStorage.forEach((lembrete, index) => {
        container.appendChild(createCardLembrete(lembrete, index));
    });
}


// Chama a função para carregar lembretes ao carregar a página
window.onload = lembreteCarregarDoLocalStorage;
