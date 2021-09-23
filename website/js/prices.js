(function () {
	var svg = d3.select("#prices svg")
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

	d3.csv("./data/prices.csv").then(function (data) {
		x.domain(data.map(function (d) {
				return d.Prices;
			}));
		y.domain([0, d3.max(data, function (d) {
					return Number(d.Resturants);
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
		.text("Prices");

		g.append("g")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("fill", "#000")
		.attr("transform", "rotate(-90)")
		.attr("y", -40)
		.attr("x", -200)
		.attr("dy", "0.71em")
		.attr("text-anchor", "middle")
		.text("Resturants");

		g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function (d) {
			return x(d.Prices);
		})
		.attr("y", function (d) {
			return y(Number(d.Resturants));
		})
		.attr("width", x.bandwidth())
		.attr("height", function (d) {
			return height - y(Number(d.Resturants));
		});
	});
}) ();
