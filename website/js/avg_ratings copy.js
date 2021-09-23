(function () {
	var svg = d3.select("#avgRatings svg")
	var margin = {
		top: 20,
		right: 20,
		bottom: 50,
		left: 50
	},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;
	// g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	d3.csv("./data/avg_ratings.csv").then(function (data) {

		data = data.map(d => { return {"Rating": +d.Rating, "Category": d.Category}});

		var size = data.length;
		var xScale = d3.scaleBand()
			.range([0, width])
			// .padding(1)
			.domain(data.map(function(d) { return d.Category; }));

		var yScale = d3.scaleLinear()
			// .domain([0, d3.max(data, function(d){ return d.Rating; })])
			.domain([0, 5])
			.range([height, 0]);

		var line = d3.line()
			.x(function(d) { return xScale(d.Category); })
			.y(function(d) { return yScale(d.Rating); });


		// var svg = d3.select("#avgRatings svg")
		// 	.attr("width", width + margin.left + margin.right)
		// 	.attr("height", height + margin.top + margin.bottom)
		// 	  .append("g")
		// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		//   g.append("g")
		// 	  .attr("class", "x axis")
		// 	  .attr("transform", "translate(0," + height + ")")
		// 	  .call(d3.axisBottom(xScale));
		
		//   svg.append("g")
		// 	  .attr("class", "y axis")
		// 	  .call(d3.axisLeft(yScale));

		// var n = data.length;
		// var index = 0
		// data = data.map(d => { index = index + 1; return {"Rating": +d.Rating, "Category": d.Category, "index": index}});
		// // data = data.map(d => { index = index + 1; return {"Rating": +d.Rating, "Category": d.Category, "index": index}});
		// dataCategory = data.map(d => d.Category);
		// // 5. X scale will use the index of our data
		// // var xScale = d3.SCALEBAN()
		// // 	.domain([0, n-1]) // input
		// // 	.range([0, width]); // output

		// var xScale = d3.scaleBand()
		// 	.rangeRound([0, width])
		// 	.domain(data.map(function(d) { return d.Category; }));
		// // var xScale = d3.scaleOrdinal()
		// // 	.domain([0, n-1]) 
		// // 	// .range(dataCategory)
		// // 	.range([0, width]); 
		// // 6. Y scale will use the randomly generate number 
		// var yScale = d3.scaleLinear()
		// 	.domain([0, 5]) // input 
		// 	.range([height, 0]); // output 

		// // 7. d3's line generator
		// var line = d3.line()
		// 	.x(function(d, i) { return d.Category; }) // set the x values for the line generator
		// 	.y(function(d) { return Number(d.Rating); }) // set the y values for the line generator 
		// 	.curve(d3.curveMonotoneX) // apply smoothing to the line

		// // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
		// // var dataset = data.map(d => Number(d.Rating));

		// // 3. Call the x axis in a group tag

			// 	  g.append("g")
			//   .attr("class", "x axis")
			//   .attr("transform", "translate(0," + height + ")")
			//   .call(d3.axisBottom(xScale));

		g.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height+ ")")
			.call(d3.axisBottom(xScale))
			.append("text")
			.attr("y", 30)
			.attr("x", 220)
			.attr("dy", "0.71em")
			.attr("fill", "#000")
			.style("text-anchor", "middle")
			.text("Category");
		// 	; // Create an axis component with d3.axisBottom

		
		// // 4. Call the y axis in a group tag
		g.append("g")
			.attr("class", "y axis")
			.call(d3.axisLeft(yScale))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90)")
			.attr("y", -40)
			.attr("x", -200)
			.attr("dy", "0.71em")
			.attr("text-anchor", "middle")
			.text("Average Rating"); // Create an axis component with d3.axisLeft

					
		svg.append("path")
			.attr('transform', 'translate(' + (margin.left + margin.right ) + ', 0)')
			.data([data])
			.attr("class", "line")
			.attr("d", line);

		// // 9. Append the path, bind the data, and call the line generator 
		// g.append("path")
		// 	.data(data) // 10. Binds data to the line 
		// 	.attr("class", "line") // Assign a class for styling 
		// 	.attr("d", line);
		// 	// .attr("d", function(d, i) { 
        //     //     debugger;
        //     //     return d[i]; 
        //     // });
		// 	// 11. Calls the line generator 

		// // 12. Appends a circle for each datapoint 
		// g.selectAll(".dot")
		// 	.data(data)
		// .enter().append("circle") // Uses the enter().append() method
		// 	.attr("class", "dot") // Assign a class for styling
		// 	.attr("cx", function(d, i) { return d.Category})
		// 	.attr("cy", function(d) { return d.Rating})
		// 	.attr("r", 5)
		// 	.on("mouseover", function(a, b, c) { 
		// 			console.log(a) 
		// 		this.attr('class', 'focus')
		// 		})
		// 	.on("mouseout", function() {  })
	});
/*
var margin = {top: 20, right: 100, bottom: 30, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var dataset = [ {x: "A", y: 5}, {x: "B", y: 8}, {x: "C", y: 13} ];

    
var xScale = d3.scaleBand()
	.range([0, width])
	.padding(1)

    // .range([0, width])
    .domain(dataset.map(function(d) { return d.x; }));

var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d){ return d.y; })])
    .range([height, 0]);

var line = d3.line()
    .x(function(d) { return xScale(d.x); })
    .y(function(d) { return yScale(d.y); });

var svg = d3.select("#avgRatings svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
	  .attr("class", "x axis")
	  .attr("transform", "translate(0," + height + ")")
	  // .attr("transform", "translate(0," + height+ ")")
	  .call(d3.axisBottom(xScale));
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(xAxis);

  svg.append("g")
	  .attr("class", "y axis")
	  .call(d3.axisLeft(yScale));
    //   .call(yAxis)

  svg.append("path")
      .data([dataset])
      .attr("class", "line")
      .attr("d", line);
*/
}) ();

/*
// var svg = d3.select("#avgRatings svg")

var svg = d3.select("#avgRatings svg")
var margin = {
	top: 20,
	right: 20,
	bottom: 50,
	left: 50
},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom;
// g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 2. Use the margin convention practice 
// var margin = {top: 50, right: 50, bottom: 50, left: 50}
//   , width = window.innerWidth - margin.left - margin.right // Use the window's width 
//   , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height

// The number of datapoints
var n = 21;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
    .domain([0, n-1]) // input
    .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

// 7. d3's line generator
var line = d3.line()
    .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

// 1. Add the SVG to the page and employ #2

// svg.attr("width", width)
//     .attr("height", height)
//  	.append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
g.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
    // .attr("transform", "translate(0," + height+ ")")
	.call(d3.axisBottom(xScale))
	.append("text")
	.attr("y", 30)
	.attr("x", 220)
	.attr("dy", "0.71em")
	.attr("fill", "#000")
	.style("text-anchor", "middle")
	.text("Category");
	; // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
g.append("g")
    .attr("class", "y axis")
	.call(d3.axisLeft(yScale))
	.append("text")
	.attr("fill", "#000")
	.attr("transform", "rotate(-90)")
	.attr("y", -40)
	.attr("x", -200)
	.attr("dy", "0.71em")
	.attr("text-anchor", "middle")
	.text("Average Rating"); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
g.append("path")
    .datum(dataset) // 10. Binds data to the line 
    .attr("class", "line") // Assign a class for styling 
    .attr("d", line); // 11. Calls the line generator 

// 12. Appends a circle for each datapoint 
g.selectAll(".dot")
    .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
    .attr("class", "dot") // Assign a class for styling
    .attr("cx", function(d, i) { return xScale(i) })
    .attr("cy", function(d) { return yScale(d.y) })
    .attr("r", 5)
      .on("mouseover", function(a, b, c) { 
  			console.log(a) 
        this.attr('class', 'focus')
		})
      .on("mouseout", function() {  })
*/
/*
(function () {
	var svg = d3.line.select("#avgRatings svg")
	var margin = {
		top: 20,
		right: 20,
		bottom: 50,
		left: 50
	},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom,
	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	
	var x = d3.scaleBand()
		.rangeRound([0, width])
		.padding(0.1);

	var y = d3.scaleLinear()
		.rangeRound([height, 0]);

	d3.csv("./data/avg_ratings.csv").then(function (data) {
		const line = d3.line()
		.x(function(d) { return d.Category; })
		.y(function(d) { return d.Rating; })
		.curve(d3.curveMonotoneX); // smoothing the line

		x.domain(data.map(function (d) {
				return d.Category;
			}));
		y.domain([0, d3.max(data, function (d) {
					return Number(d.Rating);
				})]);

		g.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x))
		.append("text")
		.attr("y", 30)
		.attr("x", 220)
		.attr("dy", "0.71em")
		.attr("fill", "#000")
		.style("text-anchor", "middle")
		.text("Category");

		g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", -40)
		.attr("x", -200)
		.attr("dy", "0.71em")
		.attr("text-anchor", "middle")
		.text("Average Rating");

		g.selectAll(".bar")
		.data(data)
		.enter().append("path")
		.attr("class", "bar")
		.attr("x", function (d) {
			return x(d.Rating);
		})
		.attr("y", function (d) {
			return y(Number(d.Votes));
		})
		.attr("width", x.bandwidth())
		.attr("height", function (d) {
			return height - y(Number(d.Votes));
		});
	});
}) ();

*/