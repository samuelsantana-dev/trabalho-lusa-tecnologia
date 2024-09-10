// Grupo de clones
const btnGruposDeClones = document.getElementById('btn-grupo-de-clones');
const btnDestruirGruposDeClones = document.getElementById('btn-destruir-grupos-de-clones');

// Botoes de grupo de juncao em massa
const btnGruposDeJuncao = document.getElementById('btn-grupos-de-juncao-em-massa');
const btnDestruirGruposDeJuncao = document.getElementById('btn-destruir-grupos-juncao-em-massa');

// Botões de Ação
const btnDuplicataFinder = document.getElementById('btn-duplicata-finder');
const btnDestruirGrupos = document.getElementById('btn-destruir-grupos');

// Botões de Fechamento
const btnFecharDuplicataFinder = document.getElementById('btn-fechar-duplicata-finder');
const btnFecharDestruirGrupos = document.getElementById('btn-fechar-destruir-grupos');

// Divs
const divDuplicataFinder = document.querySelector('#div-duplicata-finder');
const divDestruirGrupos = document.querySelector('#div-destruir-grupos');
const divGruposDeJuncaoEmMassa = document.querySelector('#div-grupo-de-juncao-em-massa');
const divGruposDeClones = document.querySelector('#div-grupo-de-clones');

// Função para mostrar uma div e esconder as outras
function mostrarElemento(elemento) {
    elemento.classList.add('d-block');
    elemento.classList.remove('d-none');
}

function esconderElemento(elemento) {
    elemento.classList.add('d-none');
    elemento.classList.remove('d-block');
}

// Grupo de clones
btnGruposDeClones.addEventListener('click', () => {
    mostrarElemento(divGruposDeClones)
})

btnDestruirGruposDeClones.addEventListener('click', () => {
    esconderElemento(divGruposDeClones)
})

// Div de juncao em massa
btnGruposDeJuncao.addEventListener('click', () => {
    mostrarElemento(divGruposDeJuncaoEmMassa)
})

btnDestruirGruposDeJuncao.addEventListener('click', () => {
    esconderElemento(divGruposDeJuncaoEmMassa)
})

// Ações de Destruir Grupos
btnDestruirGrupos.addEventListener('click', () => {
    mostrarElemento(divDestruirGrupos);
});

btnFecharDestruirGrupos.addEventListener('click', () => {
    esconderElemento(divDestruirGrupos);
});

// Ações de Duplicata Finder
btnDuplicataFinder.addEventListener('click', () => {
    console.log('Duplicata Finder ativado');
    mostrarElemento(divDuplicataFinder);
});

btnFecharDuplicataFinder.addEventListener('click', () => {
    console.log(`duplicata finder`)
    esconderElemento(divDuplicataFinder);
});

// Criando um option no select
function teste(){
    let teste = ['teste um', 'teste dois', 'tewteTres'];
    return teste
}

const inputSelecionarGrupos = document.querySelector('#opcao-selecionar-grupos-de-clones');
inputSelecionarGrupos.addEventListener('click', () => {
    if (inputSelecionarGrupos.options.length === 0) {
        console.log('selecionado os grupos');
        const testeFunction = teste();
        console.log('teste', testeFunction);

        testeFunction.forEach(element => {
            const option = document.createElement('option');
            option.classList.add('option');
            option.innerText = element;
            inputSelecionarGrupos.appendChild(option);
        });
    }
})

