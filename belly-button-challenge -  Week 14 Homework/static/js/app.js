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
            samples: d.samples[i]
            //otu_ids: d.samples[i].otu_ids,
            //sample_values: d.samples[i].sample_values,
            //otu_labels: d.samples[i].otu_labels
        });
    }

    /*
    to sort based on values
    - combine(zip) each id, value and label together to become a list of key-value pairs
    - sort them based on value
    - unzip them back to previous format for plotly to read
    with this you can then filter out top 10 and assign to new variable
    */

    for (let i = 0; i < td.length; i++){
        let s = td[i].samples;
      
        let zippedSamples = s.otu_ids.map((otu_id, index) => ({
            id: otu_id, 
            value: s.sample_values[index], 
            label: s.otu_labels[index]
        }))
    
        zippedSamples.sort((a,b) => b.value - a.value);
    
        td["otu_ids"] = zippedSamples.map(item => item.id);
        td["sample_values"] = zippedSamples.map(item => item.value);
        td["otu_labels"] = zippedSamples.map(item => item.label);
    }
    
    console.log(td);

});
