async function handleExtractFromAllGroups(option){
    let data = [];
    for (let index = 0; index < SuiteStore.Chat._models.length; index++) {
      const chat = SuiteStore.Chat._models[index];
      if(!chat.isGroup) continue;
      data = data.concat(await extractGroupContacts(chat, option))
    }
    console.log(data)
    return data;
  }