// Reading json file provided
let samples = d3.json('http://localhost:5500/samples.json');

// Populate dropdown list with names of individuals
samples.then(function(samples){
    for (let i = 0; i < samples["names"].length - 1; i++) {
        d3.select("#selDataset").append("option").text(samples["names"][i]);
    }
})

