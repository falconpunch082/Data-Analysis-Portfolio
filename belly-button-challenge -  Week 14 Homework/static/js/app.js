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
        });
    }

    /*
    -dev notes-
    To sort based on values
    - combine(zip) each id, value and label together to become a list of key-value pairs
    - sort them based on value
    - unzip them back to previous format for plotly to read
    with this you can then filter out top 10 and assign to new variable
    */

    // For each individual available in td
    for (let i = 0; i < td.length; i++){
        // Loading in key 'samples' value into temporary variable s
        let s = td[i].samples;
      
        // Associating each otu_id with its respective value and label
        let zippedSamples = s.otu_ids.map((otu_id, index) => ({
            id: otu_id, 
            value: s.sample_values[index], 
            label: s.otu_labels[index]
        }))
        
        // Sorting in descending order of values (so that slicing can occur)
        zippedSamples.sort((a,b) => b.value - a.value);
        
        // Unzipping zippedSamples and adding individual ids, values and labels
        // into td. At this point, they would have been sorted and associated correctly.
        s.otu_ids = zippedSamples.map(item => item["id"].toString());
        s.sample_values = zippedSamples.map(item => item.value);
        s.otu_labels = zippedSamples.map(item => item.label);

        td[i].samples = s;
    }

    // This is a function that will create a bar chart of the top 10 OTUs in
    // one individual.
    // As such, slicing code will be implemented in the function.
    function bar(id) {
        // Load data of requested individual's number
        let data = td.filter(td => td.name === id);
        let samples = data[0]["samples"];

        // Choosing top 10
        let top10otu = samples["otu_ids"].slice(0, 10);
        let top10otu_renamed = top10otu.map(n => "OTU " + n.toString());
        let top10values = samples["sample_values"].slice(0, 10);
        let top10labels = samples["otu_labels"].slice(0, 10);

        // Creating bar chart
        let chartData = {
            y: top10otu_renamed,
            x: top10values,
            type: 'bar',
            orientation: 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
            }]
        }

        let layout = {
            title: `Top 10 OTUs of individual ${samples["id"]}`,
            yaxis: {
                    tickmode: 'array',
                    tickvals: top10otu_renamed,
                    ticktext: top10otu_renamed,
                   },
            xaxis: {title: 'Count'}
        }

        Plotly.newPlot("bar", [chartData], layout);
    }

    // This is a function to initialise the website with data from
    // individual 940 so charts can be populated.
    function init(){
        bar("940");
    }

    init();
});
