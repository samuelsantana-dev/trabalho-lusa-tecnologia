// script.js
function somenteNumeros(e) {
    var charCode = e.charCode ? e.charCode : e.keyCode;
    // charCode 8 = backspace   
    // charCode 9 = tab
   if (charCode != 8 && charCode != 9) {
       // charCode 48 equivale a 0   
       // charCode 57 equivale a 9
       var max = 11;
       var num = document.getElementById('numero');           
            
       if ((charCode < 48 || charCode > 57)||(num.value.length >= max)) {
          return false;
       }
       
    }
}

function gerarLink() {
    const codigoPais = document.getElementById('codigoPais').value;
    const numero = document.getElementById('numero').value;
    const mensagem = encodeURIComponent(document.getElementById('mensagem').value);

    if (!numero || numero.length > 11 || numero.length < 11) {
        alert('Por favor, insira um número de telefone válido com no máximo 11 dígitos.');
        return;
    }

    if (!mensagem.trim()) {
        alert('Por favor, insira uma mensagem.');
        return;
    }


    const whatsappLink = `https://wa.me/+${codigoPais}${numero}?text=${mensagem}`;

    document.getElementById('linkGerado').innerHTML = `
        <p>Link gerado: <a href="${whatsappLink}" target="_blank">${whatsappLink}</a></p>
    `;
}
