document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const closeButton = document.querySelector('.close-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    closeButton.addEventListener('click', () => {
        document.querySelector('.panel').style.display = 'none';
    });
});

function criarCard() {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const title = document.createElement('h3');
    title.textContent = 'testes';
    card.appendChild(title);
  
    const anexos = document.createElement('p');
    anexos.textContent = 'Anexos: Não';
    card.appendChild(anexos);
  
    // ... criar os outros elementos de forma similar
  
    const status = document.createElement('div');
    status.classList.add('status');
    status.textContent = 'Concluída';
    card.appendChild(status);
  
    const user = document.createElement('div');
    user.classList.add('user');
    card.appendChild(user);
  
    // ... criar os elementos da seção do usuário
  
    document.body.appendChild(card);
  }
  