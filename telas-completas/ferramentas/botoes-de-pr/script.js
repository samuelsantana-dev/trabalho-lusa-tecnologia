//Notas
const buttonNota = document.querySelector('#button-nota');
const buttonEnviarFormNotas = document.querySelector('#button-enviar-form-notas');
const divNota = document.querySelector('#div-nota');
const divResultado = document.querySelector('#div-resultado');

// Notas input
const inputOpcao = document.querySelector('#opcao-notas');

// Notas formulario
const formulario = document.querySelector('#form-notas-criar')


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

function criarDivsNotas(event){
    event.preventDefault();
    const inputText = document.querySelector('#titulo-notas').value;
    const inputTextAreaNotas = document.querySelector('#notas-input').value;
    const userItem = document.querySelector('.user-item');
    console.log('inputText', inputText)
    console.log('inputText', inputTextAreaNotas)
    if(inputText !== '' && inputTextAreaNotas !== '') {
        console.log('Entrou')
        const notaDiv = document.createElement('div');
        notaDiv.classList.add('nota');
        notaDiv.innerHTML = `   
        <h3>${inputText}</h3>
        <p>${inputTextAreaNotas}</p>
        `
        userItem.appendChild(notaDiv)
        if (divResultado.classList.contains('d-none')) {
            divResultado.classList.remove('d-none');
            divResultado.classList.add('d-block');
        }
        formulario.reset();
    }
}

ouvirClick(buttonNota, function(){
    mostrarElemento(divNota)
})
formulario.addEventListener('submit', criarDivsNotas)

// Funcionalidade de botoes de notas, copiar texto, editar e excluir 
function copyText(button) {
    const userInfo = button.parentElement.previousElementSibling;
    const text = userInfo.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Texto copiado: ' + text);
    });
}

function editText(button) {
    const userInfo = button.parentElement.previousElementSibling;
    const name = prompt("Edite o nome:", userInfo.querySelector('h3').innerText);
    const email = prompt("Edite o email:", userInfo.querySelector('p').innerText);

    if (name !== null && email !== null) {
        userInfo.querySelector('h3').innerText = name;
        userInfo.querySelector('p').innerText = email;
    }
}

function deleteUser(button) {
    const userItem = button.parentElement.parentElement;
    userItem.remove();
}
