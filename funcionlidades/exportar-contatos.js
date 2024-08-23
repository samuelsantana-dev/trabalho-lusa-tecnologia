
//Exportar contatos
function selecionarContatos() {
    // Seleciona os elementos que representam os contatos na lista de conversas
    const contatos = document.querySelectorAll("._aou8._aj_h .x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e[title]");

    // Itera sobre os contatos encontrados e imprime o nome de cada contato
    contatos.forEach(contato => {
        console.log("Contato:", contato.getAttribute('title'));
    });
}

async function extractGroupContacts(chat, option = 'todos'){
    let lista = []
    let contacts = chat.groupMetadata.participants._models
    for(let cont in contacts){
      if(option == 'salvos' && contacts[cont].contact.isAddressBookContact == 0) continue;
      
      if(option == 'nao-salvos' && contacts[cont].contact.isAddressBookContact == 1) continue;
      lista.push({
        nome: contacts[cont].contact.__x_pushname,
        numero: contacts[cont].id.user
      })
    }
    return lista;
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

  async function filtrarContatos(opcao){
    return new Promise((resolve, reject) => {
        //ajustar para numeros internacionais
        
        let data = []
        for(let index = 0; index < SuiteStore.Chat._models.length; index ++){
          const chat = SuiteStore.Chat._models[index]
          if(!chat.isUser) continue;
          if(chat.attributes.contact.isEnterprise) continue;
          
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

  document.getElementById('exportar').addEventListener('click', ()=>{
    return new Promise(async(res, rej)=> {
      const children = document.getElementById('nav-exportar').children;
      let data = []
      for (let menu of children) {
              data = await filtrarContatos(optionSelected)
      }
      
  
      document.getElementById('prefix-input').value = ''
      if(!data.length) return showToast(false, "Não foi encontrado nenhum resultado para o filtro selecionado");
      
      //add option to choose on the screen
      //generateCsvAndDownload(data)
      generateExcelAndDownload(data)
    })
  })