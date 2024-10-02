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

const countryCodes = ref([
        { country: "Afghanistão", iso: "AF / AFG", ddi: 93 },
        { country: "África do Sul", iso: "ZA / ZAF", ddi: 27 },
        { country: "Albânia", iso: "AL / ALB", ddi: 355 },
        { country: "Alemanha", iso: "DE / DEU", ddi: 49 },
        { country: "Andora", iso: "AD / AND", ddi: 376 },
        { country: "Angola", iso: "AO / AGO", ddi: 244 },
        { country: "Anguilla", iso: "AI / AIA", ddi: 1264 },
        { country: "Antarctica", iso: "AQ / ATA", ddi: 672 },
        { country: "Antígua e Barbuda", iso: "AG / ATG", ddi: 1268 },
        { country: "Argentina", iso: "AR / ARG", ddi: 54 },
        { country: "Argélia", iso: "DZ / DZA", ddi: 213 },
        { country: "Arménia", iso: "AM / ARM", ddi: 374 },
        { country: "Aruba", iso: "AW / ABW", ddi: 297 },
        { country: "Arábia Saudita", iso: "SA / SAU", ddi: 966 },
        { country: "Austrália", iso: "AU / AUS", ddi: 61 },
        { country: "Áustria", iso: "AT / AUT", ddi: 43 },
        { country: "Azerbaijão", iso: "AZ / AZE", ddi: 994 },
        { country: "Bahamas", iso: "BS / BHS", ddi: 1242 },
        { country: "Bahrein", iso: "BH / BHR", ddi: 973 },
        { country: "Bangladesh", iso: "BD / BGD", ddi: 880 },
        { country: "Barbados", iso: "BB / BRB", ddi: 1246 },
        { country: "Bélgica", iso: "BE / BEL", ddi: 32 },
        { country: "Belize", iso: "BZ / BLZ", ddi: 501 },
        { country: "Benim", iso: "BJ / BEN", ddi: 229 },
        { country: "Bermuda", iso: "BM / BMU", ddi: 1441 },
        { country: "Butão", iso: "BT / BTN", ddi: 975 },
        { country: "Bielorrússia", iso: "BY / BLR", ddi: 375 },
        { country: "Bolívia", iso: "BO / BOL", ddi: 591 },
        { country: "Bósnia e Herzegovina", iso: "BA / BIH", ddi: 387 },
        { country: "Botswana", iso: "BW / BWA", ddi: 267 },
        { country: "Brasil", iso: "BR / BRA", ddi: 55 },
        { country: "Brunei", iso: "BN / BRN", ddi: 673 },
        { country: "Bulgária", iso: "BG / BGR", ddi: 359 },
        { country: "Burkina Faso", iso: "BF / BFA", ddi: 226 },
        { country: "Myanmar (Burma)", iso: "MM / MMR", ddi: 95 },
        { country: "Burundi", iso: "BI / BDI", ddi: 257 },
        { country: "Camarões", iso: "CM / CMR", ddi: 237 },
        { country: "Cabo Verde", iso: "CV / CPV", ddi: 238 },
        { country: "Camboja", iso: "KH / KHM", ddi: 855 },
        { country: "Canadá", iso: "CA / CAN", ddi: 1 },
        { country: "Catar", iso: "QA / QAT", ddi: 974 },
        { country: "Chad", iso: "TD / TCD", ddi: 235 },
        { country: "Chile", iso: "CL / CHL", ddi: 56 },
        { country: "China", iso: "CN / CHN", ddi: 86 },
        { country: "Chipre", iso: "CY / CYP", ddi: 357 },
        { country: "Christmas Island", iso: "CX / CXR", ddi: 61 },
        { country: "Cingapura", iso: "SG / SGP", ddi: 65 },
        { country: "Colômbia", iso: "CO / COL", ddi: 57 },
        { country: "Comores", iso: "KM / COM", ddi: 269 },
        { country: "Coreia do Norte", iso: "KP / PRK", ddi: 850 },
        { country: "Coreia do Sul", iso: "KR / KOR", ddi: 82 },
        { country: "Costa do Marfim", iso: "CI / CIV", ddi: 225 },
        { country: "Costa Rica", iso: "CR / CRC", ddi: 506 },
        { country: "Croácia", iso: "HR / HRV", ddi: 385 },
        { country: "Cuba", iso: "CU / CUB", ddi: 53 },
        { country: "Dinamarca", iso: "DK / DNK", ddi: 45 },
        { country: "Djibouti", iso: "DJ / DJI", ddi: 253 },
        { country: "Dominica", iso: "DM / DMA", ddi: 1767 },
        { country: "Egito", iso: "EG / EGY", ddi: 20 },
        { country: "El Salvador", iso: "SV / SLV", ddi: 503 },
        { country: "Emirados Árabes Unidos", iso: "AE / ARE", ddi: 971 },
        { country: "Equador", iso: "EC / ECU", ddi: 593 },
        { country: "Eritreia", iso: "ER / ERI", ddi: 291 },
        { country: "Estónia", iso: "EE / EST", ddi: 372 },
        { country: "Espanha", iso: "ES / ESP", ddi: 34 },
        { country: "Etiópia", iso: "ET / ETH", ddi: 251 },
        { country: "Fiji", iso: "FJ / FJI", ddi: 679 },
        { country: "Finlândia", iso: "FI / FIN", ddi: 358 },
        { country: "França", iso: "FR / FRA", ddi: 33 },
        { country: "Gabão", iso: "GA / GAB", ddi: 241 },
        { country: "Gâmbia", iso: "GM / GMB", ddi: 220 },
        { country: "Banda de Gaza (Palestina)", iso: "", ddi: 970 },
        { country: "Geórgia", iso: "GE / GEO", ddi: 995 },
        { country: "Gana", iso: "GH / GHA", ddi: 233 },
        { country: "Gibraltar", iso: "GI / GIB", ddi: 350 },
        { country: "Grécia", iso: "GR / GRC", ddi: 30 },
        { country: "Groelândia", iso: "GL / GRL", ddi: 299 },
        { country: "Granada", iso: "GD / GRD", ddi: 1473 },
        { country: "Guam", iso: "GU / GUM", ddi: 1671 },
        { country: "Guatemala", iso: "GT / GTM", ddi: 502 },
        { country: "Guiana", iso: "GY / GUY", ddi: 592 },
        { country: "Guiné", iso: "GN / GIN", ddi: 224 },
        { country: "Guiné Equatorial", iso: "GQ / GNQ", ddi: 240 },
        { country: "Guiné-Bissau", iso: "GW / GNB", ddi: 245 },
        { country: "Haiti", iso: "HT / HTI", ddi: 509 },
        { country: "Honduras", iso: "HN / HND", ddi: 504 },
        { country: "Hong Kong", iso: "HK / HKG", ddi: 852 },
        { country: "Hungria", iso: "HU / HUN", ddi: 36 },
        { country: "Islândia", iso: "IS / ISL", ddi: 354 },
        { country: "Ilhas Cayman", iso: "KY / CYM", ddi: 1345 },
        { country: "Ilhas Cocos (Keeling)", iso: "CC / CCK", ddi: 61 },
        { country: "Ilha de Man", iso: "IM / IMN", ddi: 44 },
        { country: "Inglaterra (Reino Unido)", iso: "GB / GBR", ddi: 44 },
        { country: "Irã", iso: "IR / IRN", ddi: 98 },
        { country: "Iraque", iso: "IQ / IRQ", ddi: 964 },
        { country: "Irlanda", iso: "IE / IRL", ddi: 353 },
        { country: "Israel", iso: "IL / ISR", ddi: 972 },
        { country: "Itália", iso: "IT / ITA", ddi: 39 },
        { country: "Jamaica", iso: "JM / JAM", ddi: 1_876 },
        { country: "Japão", iso: "JP / JPN", ddi: 81 },
        { country: "Jordânia", iso: "JO / JOR", ddi: 962 },
        { country: "Cazaquistão", iso: "KZ / KAZ", ddi: 7 },
        { country: "Quénia (Kenya)", iso: "KE / KEN", ddi: 254 },
        { country: "Kiribati", iso: "KI / KIR", ddi: 686 },
        { country: "Kosovo", iso: null, ddi: 381 },
        { country: "Kuwait", iso: "KW / KWT", ddi: 965 },
        { country: "Quirguistão", iso: "KG / KGZ", ddi: 996 },
        { country: "Laos", iso: "LA / LAO", ddi: 856 },
        { country: "Letônia", iso: "LV / LVA", ddi: 371 },
        { country: "Líbano", iso: "LB / LBN", ddi: 961 },
        { country: "Lesoto", iso: "LS / LSO", ddi: 266 },
        { country: "Libéria", iso: "LR / LBR", ddi: 231 },
        { country: "Líbia", iso: "LY / LBY", ddi: 218 },
        { country: "Liechtenstein", iso: "LI / LIE", ddi: 423 },
        { country: "Lituânia", iso: "LT / LTU", ddi: 370 },
        { country: "Luxemburgo", iso: "LU / LUX", ddi: 352 },
        { country: "Macau", iso: "MO / MAC", ddi: 853 },
        { country: "Macedónia", iso: "MK / MKD", ddi: 389 },
        { country: "Madagáscar", iso: "MG / MDG", ddi: 261 },
        { country: "Malawi", iso: "MW / MWI", ddi: 265 },
        { country: "Malásia", iso: "MY / MYS", ddi: 60 },
        { country: "Maldivas", iso: "MV / MDV", ddi: 960 },
        { country: "Mali", iso: "ML / MLI", ddi: 223 },
        { country: "Malta", iso: "MT / MLT", ddi: 356 },
        { country: "Mauritânia", iso: "MR / MRT", ddi: 222 },
        { country: "Maurícia", iso: "MU / MUS", ddi: 230 },
        { country: "Mayotte", iso: "YT / MYT", ddi: 262 },
        { country: "México", iso: "MX / MEX", ddi: 52 },
        { country: "Micronésia", iso: "FM / FSM", ddi: 691 },
        { country: "Moldávia", iso: "MD / MDA", ddi: 373 },
        { country: "Mônaco", iso: "MC / MCO", ddi: 377 },
        { country: "Mongólia", iso: "MN / MNG", ddi: 976 },
        { country: "Montenegro", iso: "ME / MNE", ddi: 382 },
        { country: "Montserrat", iso: "MS / MSR", ddi: 1_664 },
        { country: "Marrocos", iso: "MA / MAR", ddi: 212 },
        { country: "Moçambique", iso: "MZ / MOZ", ddi: 258 },
        { country: "Namíbia", iso: "NA / NAM", ddi: 264 },
        { country: "Nauru", iso: "NR / NRU", ddi: 674 },
        { country: "Nepal", iso: "NP / NPL", ddi: 977 },
        { country: "Netherlands Antilles", iso: "AN / ANT", ddi: 599 },
        { country: "Nova Caledônia", iso: "NC / NCL", ddi: 687 },
        { country: "Nova Zelândia", iso: "NZ / NZL", ddi: 64 },
        { country: "Nicaragua", iso: "NI / NIC", ddi: 505 },
        { country: "Níger", iso: "NE / NER", ddi: 227 },
        { country: "Nigéria", iso: "NG / NGA", ddi: 234 },
        { country: "Niue", iso: "NU / NIU", ddi: 683 },
        { country: "Noruega", iso: "NO / NOR", ddi: 47 },
        { country: "Omã", iso: "OM / OMN", ddi: 968 },
        { country: "Países Baixos", iso: "NL / NLD", ddi: 31 },
        { country: "Paquistão", iso: "PK / PAK", ddi: 92 },
        { country: "Palau", iso: "PW / PLW", ddi: 680 },
        { country: "Panamá", iso: "PA / PAN", ddi: 507 },
        { country: "Papua-Nova Guiné", iso: "PG / PNG", ddi: 675 },
        { country: "Paraguai", iso: "PY / PRY", ddi: 595 },
        { country: "Peru", iso: "PE / PER", ddi: 51 },
        { country: "Filipinas", iso: "PH / PHL", ddi: 63 },
        { country: "Polónia", iso: "PL / POL", ddi: 48 },
        { country: "Polinésia Francesa", iso: "PF / PYF", ddi: 689 },
        { country: "Portugal", iso: "PT / PRT", ddi: 351 },
        { country: "Porto Rico", iso: "PR / PRI", ddi: 1 },
        { country: "República do Congo", iso: "CG / COG", ddi: 242 },
        { country: "República Democrática do Congo", iso: "CD / COD", ddi: 243 },
        { country: "República Centro-Africana", iso: "CF / CAF", ddi: 236 },
        { country: "República Checa", iso: "CZ / CZE", ddi: 420 },
        { country: "República Dominicana", iso: "DO / DOM", ddi: 1809 },
        { country: "Roménia", iso: "RO / ROU", ddi: 40 },
        { country: "Ruanda", iso: "RW / RWA", ddi: 250 },
        { country: "Rússia", iso: "RU / RUS", ddi: 7 },
        { country: "Saint Barthelemy", iso: "BL / BLM", ddi: 590 },
        { country: "Samoa", iso: "WS / WSM", ddi: 685 },
        { country: "Samoa Americana", iso: "AS / ASM", ddi: 1684 },
        { country: "San Marino", iso: "SM / SMR", ddi: 378 },
        { country: "São Tomé e Príncipe", iso: "ST / STP", ddi: 239 },
        { country: "Senegal", iso: "SN / SEN", ddi: 221 },
        { country: "Sérvia", iso: "RS / SRB", ddi: 381 },
        { country: "Serra Leoa", iso: "SL / SLE", ddi: 232 },
        { country: "Seychelles", iso: "SC / SYC", ddi: 248 },
        { country: "Eslováquia", iso: "SK / SVK", ddi: 421 },
        { country: "Eslovênia", iso: "SI / SVN", ddi: 386 },
        { country: "Somália", iso: "SO / SOM", ddi: 252 },
        { country: "Sri Lanka", iso: "LK / LKA", ddi: 94 },
        { country: "Saint Helena", iso: "SH / SHN", ddi: 290 },
        { country: "Saint Kitts and Nevis", iso: "KN / KNA", ddi: 1869 },
    ])


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

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Returns the array of lembretes from localStorage, or an empty array if 
 * localStorage is empty or "lembretes" key does not exist.
 * @returns {array} An array of lembretes in localStorage.
 */
/******  068ad9e4-51b5-4e1c-af18-81fec8182954  *******/
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

<template>
<div>


  <section class="panel" id="section-notas">
      <button @click="toggleLembreteShow">mostrar teleport</button>
      <div class="popup-content">
          <div class="filters" @click="filtrarTipoLembretes()">
              <label for="note-type">Tipo:</label>
              <select class="filter-tipo">
                  <option value="todos">Todos</option>
                  <option value="grupo">Nota do Grupo</option>
                  <option value="individual">Nota Individual</option>
              </select>
          </div>
          <!-- <div class="filters">
              <label for="note-type">Ordenar:</label>
              <select class="filter-tipo">
                  <option value="todos">Todos</option>
                  <option value="criação">Data de criação</option>
                  <option value="individual">Tipo de status</option>
              </select>
          </div> -->
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
</template>
