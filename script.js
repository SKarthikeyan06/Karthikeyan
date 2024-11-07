var dataDictionary=[];
const fileUrl = 'Name List.xlsx';
fetch(fileUrl)
    .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.arrayBuffer();
        })
    .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName]; 
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            jsonData.forEach(element => {
                dataDictionary.push({"Name":element.Name,"DOB":element.DOB,"Address":element.Address,"PhoneNo":element.Phoneno})         
                populateTable(dataDictionary);
            });
        })
function populateTable(data) {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Name}</td>
            <td>${item.DOB}</td>
            <td>${item.Address}</td>
            <td>${item.PhoneNo}</td>
        `;
        tableBody.appendChild(row);
    });
}
function filterTable() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredData = dataDictionary.filter(item => {
        return item.Name.toLowerCase().includes(searchTerm)||
        item.Address.toLowerCase().includes(searchTerm);
    });
    populateTable(filteredData);
}
document.getElementById('searchBar').addEventListener('input', filterTable);