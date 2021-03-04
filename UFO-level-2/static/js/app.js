// from data.js
var tableData = data;

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

// Create an empty list to contain any filters applied to the original data table
var filters = {};

// Create a function that identifies any changes made to the input filters  
function userFilters() {
    // Use D3 to isolate the elements that the input filtered for
    // Save the input element, value, and ID of the changed filter
    var elementChange = d3.select(this).select("input");
    var elementValue = elementChange.property("value");
    var elementID = elementChange.attr("id");

    // If an input filter was applied, append the 'filters' list to include the element value and ID 
    if (elementValue) {
        filters[elementID] = elementValue;
    }
    // If no input, remove all filters from the list
    else {
        delete filters[elementID];
    }
    // Call on the next function to apply the filters and reassemble the table
    filteredTable();    
}

// Create a filter table function to handle input filters 
function filteredTable() {
    // Declare a new variable 'filteredData' to initially equate the original 'tableData' variable 
    var filteredData = tableData;
    // Iterate through each data value using the filters  
    Object.entries(filters).forEach(([key, value]) => {
        // If a filter was applied, select for the rows that match filter values and save it to the 'filteredData' variable
        filteredData = filteredData.filter(row => row[key] === value);
    });
    // Reassemble the data table using the filtered data, which will remain unchanged if no filters were applied
    tableAppend(filteredData);
}

// Use the 'on' function in D3 to attach an event that listens for changes to any filter
d3.selectAll(".filter").on("change", userFilters);