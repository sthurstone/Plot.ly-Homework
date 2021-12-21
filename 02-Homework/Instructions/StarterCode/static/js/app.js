//PLOTLY -- Belly Button BioDiversity Homework, 11 

//Use the D3 library to read in samples.json

// generate data thru function 
function buildMetadata(sample) {

    //pull in the data from the JSON file using D3
    // extract sample data from JSON
    //Use sample_values as the values for the bar chart -- top 10 (as directed below)

    d3.json("samples.json").then((SampleData) => {
        var metadata = data.metadata;
        var resultsarray = metadata.filter(sampleobject =>
            sampleobject.id == sample);
        var result = resultsarray[0]
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });

        d3.json("samples.json").then((data) => {
            var samples = data.samples;
            var resultsarray = samples.filter(sampleobject =>
                sampleobject.id == sample);
            var result = resultsarray[0]

            var id = result.otu_ids;
            var label = result.otu_labels;
            var value = result.sample_values;

            //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
            //Use otu_ids as the labels for the bar chart
            //Use otu_labels as the hovertext for the chart

            var horizontal_bar_data = [
                {
                    y: ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
                    x: values.slice(0, 10).reverse(),
                    text: labels.slice(0, 10).reverse(),
                    type: "bar",
                    //make it horizontal 
                    orientation: "h"

                }
            ];

            var barLayout = {
                title: "Top 10 Bacteria Cultures Found",
                margin: { t: 30, l: 150 }
            };

            Plotly.newPlot("bar", horizontal_bar_data, barLayout);
        });
    }

//STEP 3: Create a bubble chart that displays each sample
    //Use otu_ids for the x values.
    //Use sample_values for the y values.
    //Use sample_values for the marker size.
    //Use otu_ids for the marker colors.
    //Use otu_labels for the text values.

    var Prettify_Bubble_Chart = {
        margin: { t: 0 },
        xaxis: { title: "otu_ids" },
        hovermode: "closest",
    };

    var Fill_Bubble_Chart = [
        {
            x: id,
            y: value,
            text: label,
            mode: "markers",
            marker: {
                color: id,
                size: value,
            }
        }
    ];

    Plotly.newPlot("bubble", Fill_Bubble_Chart, Prettify_Bubble_Chart);

    // STEP 4: Display the sample metadata, i.e., an individual's demographic information
    //filter by sample ID for cleaner output

    var samples = data.samples.filter(s => s.id.toString() === id)[0];

    // STEP 5: Display each key-value pair from the metadata JSON object somewhere on the page


    // STEP 6: Update all of the plots any time that a new sample is selected

    // initialize

    Init();