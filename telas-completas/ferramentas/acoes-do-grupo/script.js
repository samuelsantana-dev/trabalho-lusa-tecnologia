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
    elemento.classList.add('mostrar');
    elemento.classList.remove('d-none');
}

function esconderElemento(elemento) {
    elemento.classList.add('d-none');
    elemento.classList.remove('mostrar');
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
    console.log(`desturir grupo`)
    mostrarElemento(divDestruirGrupos);
});

btnFecharDestruirGrupos.addEventListener('click', () => {
    console.log(`desturir grupo`)
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
