// Botões
const buttonGrupoDeClones = document.getElementById('btn-grupo-de-clones');
const buttonDestruirGrupos = document.getElementById('btn-destruir-grupos');
const buttonGruposDeJuncaoEmMassa = document.getElementById('btn-grupos-de-juncao-em-massa');
const buttonDuplicataFinder = document.getElementById('btn-duplicata-finder');
const buttonFecharDivs = document.getElementById('fechar-div-diplicata-finder');	
// Divs
const divDuplicataFinder = document.querySelector('.div-duplicata-finder');
const divGrupoDeClones = document.querySelector('.div-grupo-de-clones');
const divDestruirGrupos = document.querySelector('.div-destruir-grupos');
const divGruposDeJuncaoEmMassa = document.querySelector('.div-grupos-de-juncao-em-massa');

// Função para mostrar uma div e esconder as outras
function mostrarDiv(div){
    div.classList.add('mostrar')
    // div.classList.remove('mostrar')
    div.classList.remove('d-none');
}

function removerDiv(div){
    div.classList.add('d-none')
    div.classList.remove('mostrar')
}

buttonDuplicataFinder.addEventListener('click', () => {
    console.log('duplicata finder')
    mostrarDiv(divDuplicataFinder);
});

buttonFecharDivs.addEventListener('click', () => {
    removerDiv(divDuplicataFinder)
})