//Notas
const buttonNota = document.querySelector('#button-nota');
const buttonEnviarFormNotas = document.querySelector('#button-enviar-form-notas');
const divNota = document.querySelector('#div-nota');
const divResultado = document.querySelector('#div-resultado');

// Notas input
const inputOpcao = document.querySelector('#opcao-notas');

function mostrarElemento(elemento) {

    if(elemento.classList.contains('d-none')) {
        elemento.classList.add('d-block');
        elemento.classList.remove('d-none');
    } else {
        elemento.classList.add('d-none');
        elemento.classList.remove('d-block');
    }
}

function ouvirClick(elemento, funcao ) {
    elemento.addEventListener('click', funcao);
}

function criarDivsNotas(){
    const inputText = document.querySelector('#titulo-notas').value;
    const inputTextAreaNotas = document.querySelector('#notas-input').value;
    console.log('inputText', inputText)
    console.log('inputText', inputTextAreaNotas)
}

ouvirClick(buttonNota, function(){
    mostrarElemento(divNota)
})

ouvirClick(buttonEnviarFormNotas, function(){
    mostrarElemento(divResultado)
})

ouvirClick(buttonEnviarFormNotas, function(){
    criarDivsNotas()
})