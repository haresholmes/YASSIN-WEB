fetch('./insurance.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        populateTable('health-insurance-table', data.healthInsurancePackages, ['package', 'coverageType', 'monthlyPremium', 'annualDeductible', 'benefits']);
        populateTable('car-insurance-table', data.carInsurancePackages, ['package', 'coverageType', 'monthlyPremium', 'excess', 'benefits']);
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Function to populate a table with data
function populateTable(tableId, dataArray, fields) {
    const tableBody = document.getElementById(tableId);
    dataArray.forEach(item => {
        const row = document.createElement('tr');
        fields.forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = item[field];
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}
