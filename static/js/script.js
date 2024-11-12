function fetchData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/data', true); // Replace with your API endpoint

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            populateTable(data);
        } else {
            console.error('Error fetching data:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();
}

// Function to populate the table with data
function populateTable(data) {
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    const maxBody = document.getElementById('max-table').getElementsByTagName('tbody')[0];
    const dateBody = document.getElementById('date-table').getElementsByTagName('tbody')[0];
    
    tableBody.innerHTML = ''; 
    maxBody.innerHTML = ''; 
    dateBody.innerHTML = ''; 
    const row = maxBody.insertRow();
    const max = row.insertCell(0).textContent = data.suhumax;
    const min = row.insertCell(1).textContent = data.suhumin;
    const avg = row.insertCell(2).textContent = data.suhurata;


    data.nilai_suhu_max_humid_max.forEach(item => {
        const row = tableBody.insertRow();
        const cellId = row.insertCell(0);
        const cellHumidity = row.insertCell(1);
        const cellSuhu = row.insertCell(2);
        const cellKecerahan = row.insertCell(3);
        const cellDate = row.insertCell(4);
        
        cellId.textContent = item.idx; 
        cellHumidity.textContent = item.humid; 
        cellSuhu.textContent = item.suhu; 
        cellKecerahan.textContent = item.kecerahan; 
        cellDate.textContent = item.kecerahan; 
    });

    data.month_year_max.forEach(item =>{
        const row = dateBody.insertRow().insertCell(0).textContent = item.month_year
    })
}

// Fetch data when the page loads
