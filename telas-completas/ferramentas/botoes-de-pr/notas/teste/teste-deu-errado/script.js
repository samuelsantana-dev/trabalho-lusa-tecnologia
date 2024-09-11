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
