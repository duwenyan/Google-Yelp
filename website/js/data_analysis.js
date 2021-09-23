let getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var yelpId = getUrlParameter('yelp_id');
console.log(yelpId);

const dataset = d3.csv("../data/Yelp_LV_review.csv");
console.log(dataset)

dataset.then(function(data) {
 let slices = data.map(function(d){
      return {
        business_id: d.business_id,
        topic1: d.topic1 != undefined && d.topic1 != null ? JSON.parse('"' +d.topic1 +'"') : d.topic1,
        topic2: d.topic2 != undefined && d.topic2 != null ? JSON.parse('"' +d.topic2 +'"') : d.topic2,
        topic3: d.topic3 != undefined && d.topic3 != null ? JSON.parse('"' +d.topic3 +'"') : d.topic3,
        topic4: d.topic4 != undefined && d.topic4 != null ? JSON.parse('"' +d.topic4 +'"') : d.topic4,
        topic5: d.topic5 != undefined && d.topic5 != null ? JSON.parse('"' +d.topic5 +'"') : d.topic5,
        positive1: d.positive1,
        positive2: d.positive2,
        positive3: d.positive3,
        negative1: d.negative1,
        negative2: d.negative2,
        negative3: d.negative3
      };
  });
  let selectedBusiness = slices.filter(business => business.business_id ==  yelpId);
  function calculateTopic (hotTopics, item, point) {
      if(item in hotTopics) {
        hotTopics[item] = hotTopics[item] + point;
      } else {
        hotTopics[item] = point;
      }
  }
  function getHotTopicPoint(hotTopics, topics, point) {
    if(topics == undefined) return;
    topics = JSON.parse(topics.replace(/'/g, '"'))
    if(Array.isArray(topics)) {
        for (let topic of topics) {
          calculateTopic(hotTopics, topic, point);
        }
    }
  }
  function getCombinedHotTopic(business) {
    let hotTopics = {};
    if(business[0] != undefined) {
      getHotTopicPoint(hotTopics, business[0].topic1, 30);
      getHotTopicPoint(hotTopics, business[0].topic2, 20);
      getHotTopicPoint(hotTopics, business[0].topic3, 10);
      getHotTopicPoint(hotTopics, business[0].topic4, 5);
      getHotTopicPoint(hotTopics, business[0].topic5, 2);
    }
    let topicData = [];
    for(let i in hotTopics) {
      topicData.push({"topic": i, "value": hotTopics[i], "text": i});
    }
    return topicData;
  }
  topicData = getCombinedHotTopic(selectedBusiness);

  drawCloud(topicData);
});

dataset.then(function(data) {
	let slices = data.map(function(d){
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
  });
	console.log(slices);
	let selectedBusiness = slices.filter(business => business.id ==  yelpId); // !!!needs to be updated with yelp_id!!!
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
