function drawCloud(data) {
  const margin = {
      top: 30,
      right: 50,
      bottom: 30,
      left: 50
  };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const g = d3.select("#container1 svg")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const wordcloud = g.append("g")
      .attr('class', 'wordcloud')
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const categories = d3.keys(
      d3.nest()
      .key(d => d.topic)
      .map(data)
  );
  const fontSize = d3.scalePow()
      .exponent(5)
      .domain([0, 1])
      .range([40, 80]);

  const draw = words => {
      wordcloud.selectAll("text")
          .data(words)
          .enter().append("text")
          .attr('class', 'word')
          .style("fill", (d, i) =>color(i))
          .style("font-size", d => d.size + "px")
          .style("font-family", d => d.font)
          .attr("text-anchor", "middle")
          .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
          .text(d => d.topic);
  };

  const layout = d3.layout.cloud()
    .size([width, height])
    .timeInterval(200)
    .words(data)
    .rotate(d => (Math.random()*2)*90)
    .fontSize((d, i) => fontSize(Math.random()))  // d.value/100.0
    .fontWeight(["bold"])
    .text(d => "Hot Topic")
    .spiral("rectangular") // "archimedean" or "rectangular"
    .on("end", draw)
    .start();

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .selectAll('text')
    .style('font-size', '20px')
    .style('fill', d => color(d))
    .style('font-family', 'sans-serif');
}
