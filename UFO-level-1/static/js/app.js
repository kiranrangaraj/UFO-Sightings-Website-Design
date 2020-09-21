// from data.js
var tableData = data;

// YOUR CODE HERE!

// Use D3 to select the table body
var tbody = d3.select("tbody");

// Create a function that appends data objects to the HTML table
function tableAppend(data) {
    // Clear any existing data in the table
    tbody.html("");

    // Iterate through each object in the data
    data.forEach((dataRow) => {
        // Append a table row to the table body as 'tr'
        var row = tbody.append("tr");
        // Iterate through each value field in the data row
        Object.values(dataRow).forEach((value) => {
            // Append a cell for each data value in the row as 'td'
            var dataValue = row.append("td");
            dataValue.text(value);
        });
    });
}

// Assemble the data table as the page loads using the function defined above
tableAppend(tableData);

// Create a filter table function to handle input changes to the date/time 
function filteredTable() {
    // Use D3 to select the data/time value 
    var date = d3.select("#datetime").property("value");
    // Declare a new variable 'filteredData' to initially equate the original 'tableData' variable 
    var filteredData = tableData;
    // If a date was entered, filter the table date/time values to match the date entered and save it to the 'filteredData' variable
    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    }
    // Reassemble the data table using the filtered data, which will remain unchanged if no date value was entered
    tableAppend(filteredData);
}

// Use the 'on' function in D3 to attach an event that listens for changes to the filter
d3.selectAll("#filter-btn").on("click", filteredTable);