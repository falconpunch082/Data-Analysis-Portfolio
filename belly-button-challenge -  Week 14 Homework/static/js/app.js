// Reading json file provided
let d = d3.json('http://localhost:5500/samples.json');

// Using then wrapper to ensure json is loaded before starting any other function
d.then(function(d){
    // Populate dropdown list with names of individuals with for loop 
    for (let i = 0; i < d["names"].length; i++) {
        d3.select("#selDataset").append("option").text(d["names"][i]);
    }

    console.log("Populated dropdown list");

    // Transforming json file so that each subarray contains info of each
    // individual
    let td = [];

    for (let i = 0; i < d.names.length; i++) {
        td.push({
            name: d.names[i],
            metadata: d.metadata[i],
            otu_ids: d.samples[i].otu_ids,
            sample_values: d.samples[i].sample_values,
            otu_labels: d.samples[i].otu_labels
        });
    }

    console.log(td);
});
