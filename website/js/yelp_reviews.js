function() {
  var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = window.innerWidth - margin.left - margin.right -100 // Use the window's width
    , height = window.innerHeight - margin.top - margin.bottom;

  d3.csv('Yelp_LV_review.csv', function(d) {
    return {
      id: d.business_id,
      topic1: d.topic1,
      topic2: d.topic2,
      topic3: d.topic3,
      topic4: d.topic4,
      topic5: d.topic5,
      positive1: d.positive1,
      positive2: d.positive2,
      positive3: d.positive3,
      negative1: d.negative1,
      negative2: d.negative2,
      negative3: d.negative3
      };
  }).then(function(data) {
    //console.log(data);
    let selectedBusiness = data.filter(business => business.id ==  '5JxlZaqCnk1MnbgRirs40Q'); // !!!needs to be updated with yelp_id!!!
    var yelp_review = [{
      'Positive':selectedBusiness[0].positive1,
      'Negative':selectedBusiness[0].negative1
    }, {
      'Positive':selectedBusiness[0].positive2,
      'Negative':selectedBusiness[0].negative2
    }, {
      'Positive':selectedBusiness[0].positive3,
      'Negative':selectedBusiness[0].negative3
    }];
    // console.log(yelp_review);

    var table = d3.select('body').append('table')
                  .style("border-collapse", "collapse")
                  .style("border", "2px black solid");

    var column = ['Most Positive Reviews', 'Most Negative Reviews'];

    // headers
    table.append("thead").append("tr")
      .selectAll("th")
      .data(column)
      .enter().append("th")
      .text(function(d) { return d; })
      .style("border", "1px black solid")
      .style("padding", "5px")
      .style("background-color", "lightgray")
      .style("font-weight", "bold")
      .style("text-transform", "uppercase");

    // data
    var columns = ['Positive', 'Negative'];
    var rows = table.append("tbody")
      .selectAll("tr").data(yelp_review)
      .enter().append("tr");
    var cells = rows.selectAll("td")
      .data(function(row) {
  		    return columns.map(function (column) {
  		      return {column: column, value: row[column]};
  		    });
  		  })
      .enter().append("td")
        .text(function(d) {return d.value; })
      .style("border", "1px black solid")
      .style("padding", "5px")
      .on("mouseover", function(){
      d3.select(this).style("background-color", "powderblue");
    })
      .on("mouseout", function(){
      d3.select(this).style("background-color", "white");
    })
      .style("font-size", "12px");
  });
};
