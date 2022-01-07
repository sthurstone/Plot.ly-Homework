//PLOT.LY -- Belly Button BioDiversity Homework, 11 

//Use the D3 library to read in samples.json

// generate data thru function 
function getPlot(id) {
    //pull in the data from the JSON file using D3
    // extract sample data from JSON
    //Filter sample by ID and use sample_values as the values for the bar chart -- top 10 (as directed below)

    d3.json("samples.json").then((data)=> {
        console.log(data);

        var wfreq = data.samples.map(d => d.wfreq)
        console.log('Washing Freq: ${wfreq}')

            var samples = data.samples.filter(s => s.id.toString() ===id)[0];
            console.log(samples);

            //top 10 samples extraction/organization
            var samplevalues=samples.sample-metadata.slice(0,10).reverse();

            var OTU_top = (samples.otu_ids.slice(0,10)).reverse();

     //Use otu_ids as the labels for the bar chart
            var OTU_id = OTU_top.map(d => "OTU" + d)

     //Use otu_labels as the hovertext for the chart
            var labels = samples.otu_labels.slice(0,10);

     //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual

     var plot1 = {
        x: samplevalues,
        y: OTU_id,
        text: labels,
        marker:{
            color:'rgb(142,124,195)'},
            type: "bar",
            Orientation: "h",
        };
    
    var data1 = [plot1];

    Plotly.newPlot("bar", data1, plot1);

//STEP 3: Create a bubble chart that displays each sample
    //Use otu_ids for the x values.
    //Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.

    var plot2 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids
        },
        text: samples.otu_labels
    };

    var plot2_layout ={
        xaxis: { title: "otu_ids" },
        height: 500,
        width: 800
    };

    var data2 = [plot2];

    Plotly.newPlot("bubble", plot2, plot2_layout);

    // STEP 4: Display the sample metadata, i.e., an individual's demographic information
    //filter by sample ID for cleaner output

    function getInfo(id){
        d3.json("samples.json").then((data)=> {
            var metadata=data.metadata;
            console.log(metadata)
        
        var results = metadata.filter(meta => meta.id.toString()===id [0])
        
        var demographics= d3.select("#sample-metadata");

        demographics.html('');
        
    // STEP 5: Display each key-value pair from the metadata JSON object somewhere on the page

        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        
        });
    });
}

console.log(getInfo);

// STEP 6: Update all of the plots any time that a new sample is selected
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

console.log(optionChanged); 

function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the JSON data 
    d3.json("samples.json").then((data)=> {
        console.log(data)

        // push data to dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // display on page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

// // initialize

console.log(init);

    })
};
