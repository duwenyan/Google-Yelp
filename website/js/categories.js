(function() {
	var margin = {top: 40, right: 30, bottom: 40, left: 90},
	    width = 460 - margin.left - margin.right,
	    height = 400 - margin.top - margin.bottom;

	var svg = d3.select("#categories svg")
	  .append("svg")
	  .attr("width", width + margin.left + margin.right)
	  .attr("height", height + margin.top + margin.bottom)
	  .append("g")
	  .attr("transform",
	        "translate(" + margin.left + "," + margin.top + ")");

	d3.csv("./data/categories.csv").then(function (data) {

	  var x = d3.scaleLinear()
			.domain([0, d3.max(data, function (d) {
				return d.Count;
			 })])
	    .range([ 0, width]);

	  svg.append("g")
	    .attr("transform", "translate(0," + height + ")")
	    .call(d3.axisBottom(x))
	    .style("text-anchor", "end")
			.append("text")
			.attr("fill", "black")
			.attr("transform","translate(200, 40)")
			.text("Resturants");

	  var y = d3.scaleBand()
	    .range([ 0, height ])
	    .domain(data.map(function(d) { return d.Category; }))
	    .padding(.1)

		svg.append("g")
	    .call(d3.axisLeft(y))
			.append("text")
			.attr("fill", "#000")
			.attr("transform", "rotate(-90)")
			.attr("y", -20)
			.attr("x", 10)
			.attr("dy", "0.7em")
			.attr("text-anchor", "middle")
			.text("Category");

	  svg.selectAll(".bar")
	    .data(data)
	    .enter()
	    .append("rect")
			.attr("class", "bar")
	    .attr("x", x(0.2) )
	    .attr("y", function(d) { return y(d.Category); })
	    .attr("width", function(d) { return x(d.Count); })
	    .attr("height", y.bandwidth() );
	})
}) ();
