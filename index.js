
// get 100 random numbers between 0 and 100
let data = []
for (let i = 0; i < 100; i++) {
    data.push(Math.random()*100)
}

// append svg to body
let svg = d3.select('body').append('svg')
    .attr('width', 500)
    .attr('height', 500)
    .attr('id', 'svg')

// make x scaling function and append x-axis
let xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([50, 450])

let xAxis = d3.axisBottom(xScale)

svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0,450)')
    .call(xAxis)

/******************************************
 * HISTOGRAM SECTION
 ******************************************/

 // set parameters for our histogram function
let histogram = d3.histogram()
    // what value we want to count in our histogram
    .value(function(d) { return d }) 
    // the range of values from our data
    .domain([0, 100])
    // the number of bins (bars) we want in our histogram (roughly) 
    // learn more about bins here:
    // https://stackoverflow.com/questions/43380637/javascript-d3-histogram-thresholds-producing-wrong-number-of-bins
    // xScale.ticks(10) -> [0,10,20,...]
    .thresholds(xScale.ticks(10)) 

    // console.log(xScale.ticks(12))


// get our bins
let bins = histogram(data)
// console.log(bins)

// figure out our max y value
// below code is equivalent to:
// let max = d3.max(bins, function(d) { return d.length })
let max = 0;
for (let i = 0; i < bins.length; i++) {
    if (bins[i].length > max) {
        max = bins[i].length
    }
}
// console.log(max)

// make y-axis and y scaling function
let yScale = d3.scaleLinear()
    .domain([max, 0])
    .range([50, 450])

let yAxis = d3.axisLeft(yScale)

svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(50,0)')
    .call(yAxis)

// append bars of histogram
svg.selectAll('.rect')
    .data(bins) // use the bins data 
    .enter()
    .append('rect')
        // x and y determine the upper left corner of our rectangle

        // d.x0 is the lower bound of one bin
        .attr('x', function(d) { return xScale(d.x0) }) 
        // d.length is the count of values in the bin
        .attr('y', function(d) { return yScale(d.length) })
        .attr('width', function(d) { return xScale(d.x1) - xScale(d.x0) })
        .attr('height', function(d) { return 450 - yScale(d.length) })
        .attr('fill', 'steelblue')
        .attr('stroke', 'white')

console.log(yScale(bins[0].length))
