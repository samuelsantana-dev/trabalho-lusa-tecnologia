function borrarPropriedades(input, elemento){
    if(input.checked){
        elemento.classList.add('mensagem-css')
        console.log('teste clicou')
    } else {
        elemento.classList.remove('mensagem-css')
    }

}

document.addEventListener('DOMContentLoaded', function() {
        // Input 
        const inputBorrarMensagens = document.querySelector('#inputBorrarMensagens')
        const inputBorrarNomes = document.querySelector('#inputBorrarNomes')
        const inputBorrarImagem = document.querySelector('#inputBorrarImagem')
        const inputBorrarConversa = document.querySelector('#inputBorrarConversa')

        // Elementos
        const mensagem = document.querySelector('.mensagem');
        const nomePerfil = document.querySelector('.nomePerfil');
        const imagem = document.querySelector('.imagem');
        const conversa = document.querySelector('.conversa');


        inputBorrarMensagens.addEventListener('change', () => borrarPropriedades(inputBorrarMensagens, mensagem));

        inputBorrarNomes.addEventListener('change', () => borrarPropriedades(inputBorrarNomes, nomePerfil));

        inputBorrarImagem.addEventListener('change', () => borrarPropriedades(inputBorrarImagem, imagem));


        inputBorrarConversa.addEventListener('change', () => borrarPropriedades(inputBorrarConversa, conversa));
})