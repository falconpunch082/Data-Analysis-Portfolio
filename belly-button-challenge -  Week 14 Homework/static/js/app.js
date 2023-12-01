// Reading json file provided
let d = d3.json('http://localhost:5500/samples.json');

// Using then wrapper to ensure json is loaded before starting any other function
d.then(function(d){
    // Populate dropdown list with names of individuals with for loop 
    for (let i = 0; i < d["names"].length; i++) {
        d3.select("#selDataset").append("option").text(d["names"][i]);
    }

    console.log("Populated dropdown list");

    // Create a dictionary that associates each individual with their place in the array
    individ_place = {}
    for (let i = 0; i < d["names"].length; i++) {
        let key = d["names"][i];
        individ_place[key] = i;
    }

    console.log("Created dictionary");

    // Create initialisation function to populate website with individual 940's data
    function init() {
        let table_data = {
            x: d["samples"][0]["sample_values"],
            y: d["samples"][0]["otu_ids"].toString(),
            type: 'bar',
            orientation: 'h'
        }

        Plotly.newPlot("bar", [table_data]);

    }



    // Initialise
    init();
})