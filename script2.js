var dataDictionary=[];
const fileUrl = 'Faculty List.xlsx';
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
                dataDictionary.push({"Name":element.Name,"dep":element.Dep,"sub":element.Subject})         
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
            <td>${item.sub}</td>
            <td>${item.dep}</td>
        `;
        tableBody.appendChild(row);
    });
}