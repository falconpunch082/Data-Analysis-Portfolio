// Creating map
let quake_map = L.map("map", {
    center: [12.844810516662491, 114.26277687079369],
    zoom: 4,
    minZoom: 3
});

// Setting tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(quake_map);

// Setting function to create description
function addDesc(datetime) {
    let desc = L.control({
        position: 'bottomleft'
    });
    
    desc.onAdd = function() {
        let div = L.DomUtil.create('div', 'desc');
        div.innerHTML += 
            `
            <h2>Earthquakes over past 7 days</h2>
            <p>Size of circle indicates magnitude. Click circle to show details.</p>
            <p>Data obtained from <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">earthquake.usgs.gov</a>.</p>
            <p>Last updated: ${datetime}</p>
            `
        
        return div;
    }

    desc.addTo(quake_map);
}

// Setting function to make legend
function addLegend() {
    let legend = L.control({
        position: 'bottomright'
    });
    
    legend.onAdd = function() {
        let div = L.DomUtil.create('div', 'legend');
        let labels = ['<10', '11-30', '31-50', '51-70', '71-90', '>90'];
        let colours = ['#ffccd5', '#ffb3c1', '#ff758f', '#c9184a', '#800f2f', '#590d22'];

        div.innerHTML += "<p>Depth of epicentre (km)</p>";
        
        for (let i = 0; i < labels.length; i++) {
            div.innerHTML +=
                    '<i style=\"background-color: ' + colours[i] + ';\">&nbsp;</i> ' + labels[i] + '<br>';
        }
        return div;
        }
    
    legend.addTo(quake_map);
}


// Performing API call to check all earthquakes from past 7 days
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(quakeData){
    let earthquakes = quakeData["features"];
    // Creating circle markers for each earthquake
    for(i = 0; i < earthquakes.length; i++){
        // Determining datapoints
        let coords = [earthquakes[i].geometry.coordinates[1], earthquakes[i].geometry.coordinates[0]];
        let depth = earthquakes[i].geometry.coordinates[2];
        let mag = earthquakes[i].properties.mag;
        let loc = earthquakes[i].properties.place;
        let datetime = Date(earthquakes[i].properties.time);

        // Determining colour of marker through depth
        function colour(d) {
            if (d <= 10) {
                return '#ffccd5';
            } else if (d > 10 && d <= 30) {
                return '#ffb3c1';
            } else if (d > 30 && d <= 50) {
                return '#ff758f';
            } else if (d > 50 && d <= 70) {
                return '#c9184a';
            } else if (d > 70 && d <= 90) {
                return '#800f2f';
            } else {
                return '#590d22';
            }
        }

        // Determining how big the circle will be through magnitude
        function radius(m) {
            let result = m * 30000;
            
            // Ran into errors in generating circles because returned value is NaN
            // Converting all NaNs to numbers
            if (isNaN(result)){
                result = 0;
            }

            return result;
        }

        // Making popup grammatically correct using regex
        function popup(l) {
            if (l.match(/^\d/)) {
                return `<h3>Earthquake of magnitude ${mag} detected ${loc} on ${datetime}</h3>`
            } else {
                return `<h3>Earthquake of magnitude ${mag} detected at ${loc} on ${datetime}</h3>`
            }
        }

        L.circle(coords, {
            fillOpacity: 0.75,
            fillColor: colour(depth),
            color: "white",
            radius: radius(mag)
        }).bindPopup(popup(loc)).addTo(quake_map);

    }
    
    // Adding legend and description
    addLegend();
    let gen = Date(quakeData["metadata"]["generated"]);
    addDesc(gen);
    
});
