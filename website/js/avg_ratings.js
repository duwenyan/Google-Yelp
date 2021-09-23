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

	g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


	d3.csv("./data/avg_ratings.csv").then(function (data) {

		data = data.map(d => { return {"Rating": +d.Rating, "Category": d.Category}});

		var xScale = d3.scaleBand()
			.range([0, width])
			.domain(data.map(function(d) { return d.Category; }));

		var yScale = d3.scaleLinear()
			.domain([0, 5])
			.range([height, 0]);

		var line = d3.line()
			.x(function(d) { return xScale(d.Category); })
			.y(function(d) { return yScale(d.Rating); });

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
			.text("Average Rating"); 
					
		g.append("path")
			.attr('transform', 'translate(' + ((margin.left + margin.right )/2.0) + ', 0)')
			.data([data])
			.attr("class", "line")
			.attr("d", line);

		g.selectAll(".dot")
			.data(data)
			.enter().append("circle")
			.attr("class", "dot")
			.attr("cx", function(d) { return xScale(d.Category); })
			.attr("cy", function(d) {return yScale(d.Rating); })
			.attr('transform', 'translate(' + ((margin.left + margin.right )/2.0) + ', 0)')
			.attr("r", 5);
	});
}) ();