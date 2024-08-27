// Função para exportar para texto
function exportToText() {
    const data = "Este é o conteúdo a ser exportado para um arquivo de texto.";
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.txt';
    link.click();
}

// Função para exportar para Excel
function exportToExcel() {
    const data = `
        <table>
            <tr><th>Nome</th><th>Idade</th><th>Cidade</th></tr>
            <tr><td>João</td><td>30</td><td>São Paulo</td></tr>
            <tr><td>Maria</td><td>25</td><td>Rio de Janeiro</td></tr>
            <tr><td>Carlos</td><td>28</td><td>Belo Horizonte</td></tr>
        </table>`;
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.xls';
    link.click();
}

// Função para exportar para CSV
function exportToCSV() {
    const data = `Nome,Idade,Cidade\nJoão,30,São Paulo\nMaria,25,Rio de Janeiro\nCarlos,28,Belo Horizonte`;
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'export.csv';
    link.click();
}

// Associando as funções aos botões
document.querySelector('#functionText').addEventListener('click', exportToText);
document.querySelector('#functionExcel').addEventListener('click', exportToExcel);
document.querySelector('#functionCsv').addEventListener('click', exportToCSV);
