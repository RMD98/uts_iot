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
    
    tableBody.innerHTML = ''; // Clear existing data
    maxBody.innerHTML = ''; // Clear existing data
    dateBody.innerHTML = ''; // Clear existing data
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
        
        cellId.textContent = item.idx; // Assuming the JSON has an 'id' field
        cellHumidity.textContent = item.humid; // Assuming the JSON has a 'name' field
        cellSuhu.textContent = item.suhu; // Assuming the JSON has an 'age' field
        cellKecerahan.textContent = item.kecerahan; // Assuming the JSON has an 'email' field
        cellDate.textContent = item.kecerahan; // Assuming the JSON has an 'email' field
    });

    data.month_year_max.forEach(item =>{
        const row = dateBody.insertRow().insertCell(0).textContent = item.month_year
    })
}

// Fetch data when the page loads
