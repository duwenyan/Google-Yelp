var map, infoWindow, placesService, marker = null;

var lasvegas = {
	lat: 36.1147, 
	lng: -115.1728
};

var zoom_default = 15

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: lasvegas,
		zoom: zoom_default,
	});
	infoWindow = new google.maps.InfoWindow;
	placesService = new google.maps.places.PlacesService(map);
	var clickHandler = new ClickEventHandler();
}

var ClickEventHandler = function() {
	// Listen for clicks on the map.
	map.addListener('click', this.handleClick.bind(this));
//	map.addListener('center_changed', function() {
//		var lat = map.getCenter().lat();
//		var lng = map.getCenter().lng();
//		mapcenter = {lat, lng};
//		//console.log(mapcenter);
//	});
};

ClickEventHandler.prototype.handleClick = function(event) {
    // If the event has a placeId
    if (event.placeId) {
//		console.log(event);
		var lat = event.latLng.lat();
		var lng = event.latLng.lng();
		event.stop();
		placesService.getDetails({placeId: event.placeId}, function(place, status) {
			if (status === 'OK') {
//				console.log(place)
				address = place.formatted_address;
				infoWindow.close();
				infoWindow.setPosition(place.geometry.location);
				// get yelp infomation
				var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=" + lat + "&longitude=" + lng + "&radius=50&term='" + place.name + "'&sort_by=distance&limit=1";
//				console.log(queryURL);
				$.ajax({
					url: queryURL,
					method: "GET",
					headers: {
						"accept": "application/json",
						"x-requested-with": "xmlhttprequest",
						"Access-Control-Allow-Origin":"*",
						"Authorization": "yourkey"
					}
				}).then(function(data) {
					var yelp_info = {
						id : "",
						rating : "",
						review_count : "",
						price : "",
						image_url : "",
						url: "",
					}
//					console.log(data.businesses[0])
//					console.log(place)
					if (data.businesses.length != 0){
						yelp_info = data.businesses[0];
						if (yelp_info.id == undefined)
							yelp_info.id = "";
						if (yelp_info.rating == undefined)
							yelp_info.rating = "";
						if (yelp_info.review_count == undefined)
							yelp_info.review_count = "";
						if (yelp_info.price == undefined)
							yelp_info.price = "";
						if (yelp_info.image_url == undefined)
							yelp_info.image_url = "";
						if (yelp_info.url == undefined)
							yelp_info.url = "";
					}
					var google_info = place;
					if (!google_info.hasOwnProperty('id') || google_info.place_id == undefined)
						google_info.place_id = "";
					if (!google_info.hasOwnProperty('rating') || google_info.rating == undefined)
						google_info.rating = "";
					if (!google_info.hasOwnProperty('website') || google_info.website == undefined)
						google_info.website = "";
					if (!google_info.hasOwnProperty('formated_address') || google_info.formated_address == undefined)
						google_info.formated_address = "";
					if (!google_info.hasOwnProperty('formatted_phone_number') || google_info.formatted_phone_number == undefined)
						google_info.formatted_phone_number = "";
					if (!google_info.hasOwnProperty('photos') || google_info.photos == undefined)
						google_info.image_url = "";
					else
						google_info.image_url = google_info.photos[0].getUrl();
					if (!google_info.hasOwnProperty('price_level') || google_info.price_level == undefined)
						google_info.price_level = "";
					if (!google_info.hasOwnProperty('user_ratings_total') || google_info.user_ratings_total == undefined)
						google_info.user_ratings_total = 0;
					content = '<div><img src="' + google_info.icon + '" height="16" width="16"> '
					+ '<strong>' + place.name + " " + yelp_info.price + '</strong><br>' + google_info.formatted_address + '<br> Yelp Rating: ';
					if (yelp_info.rating != "")
						content += yelp_info.rating;
					else
						content += "N/A"
					content += '<br> Google Rating: ';
					if (google_info.rating != "")
						content += google_info.rating;
					else
						content += "N/A"
					content += '<br><a href="data_analysis.html?yelp_id=' + yelp_info.id + '&google_id=' + google_info.place_id + '&lat=' + lat + '&lng=' + lng + '"  target="_blank">View data analysis</a></div>';
					infoWindow.setContent(content);
					infoWindow.open(map);
					innerHTML = '<h2>' + google_info.name + '</h2><h4>' + google_info.formatted_address + '<br>' + google_info.formatted_phone_number + '</h4>';
					innerHTML += '<h3 style="color: #d32323">Yelp Infomation: </h3>';
					if (yelp_info.image_url != "")
						innerHTML += '<img src="' + yelp_info.image_url + '" width="300">';
					innerHTML += '<h4>';
					if (yelp_info.rating != "")
						innerHTML += '<h4>Rating: ' + yelp_info.rating + ' (' + yelp_info.review_count + ' reviews)<br>';
					if (yelp_info.price != "")
						innerHTML += 'Price: ' + yelp_info.price + '<br>';
					if (yelp_info.url != "")
						innerHTML += '<a href="' + yelp_info.url + '"  target="_blank">View yelp website</a>';
					innerHTML += '</h4>';
					innerHTML += '<h3 style="color: green">Google Infomation: </h3>';
					if (google_info.image_url != "")
						innerHTML += '<img src="' + google_info.image_url + '" width="300">';
					innerHTML += '<h4>';
					if (google_info.rating != "")
						innerHTML += 'Rating: ' + google_info.rating + ' (' + google_info.user_ratings_total + ' reviews)<br>';
					if (google_info.price_level != "")
						innerHTML += 'Price: ' + pricelevel2symbol(google_info.price_level) + '<br>';
					if (google_info.website != "")
						innerHTML += '<a href="' + google_info.website + '"  target="_blank">View business website</a>';
					innerHTML += '</h4>';
					document.getElementById("place").innerHTML = innerHTML;
//					console.log(content);
//				xhr.send(data);
//				$.ajax({
//					url: queryURL,
//					method: "GET",
//					headers: {
//						"accept": "application/json",
//						"x-requested-with": "xmlhttprequest",
//						"Access-Control-Allow-Origin":"*",
//						"Authorization": "Bearer <api key>"
//					}
//				}).then(function(res) {
//					var results = res.data
//					console.log(res);
//				});
//				xhr.send(data);
				});
			}
  		});
	}
};

function placeSearch() {
	var search = document.getElementById('searchLocation').value;
	var request = {
		query: search,
		fields: ['name', 'geometry'],
		locationBias: map.getCenter()
	};
	placesService.findPlaceFromQuery(request, function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			map.setCenter(results[0].geometry.location);
			createMarker(results[0]);
			if (map.getZoom() < zoom_default)
				map.setZoom(zoom_default);
//			console.log(results);
		}
	});
};

function createMarker(place) {
	if (marker)
		marker.setMap(null);
	marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
//	console.log(marker)
	marker.setAnimation(null);
	marker.addListener('click', toggleBounce);
//	google.maps.event.addListener(marker, 'click', function() {
//		infowindow.setContent(place.name);
//		infowindow.open(map, this);
//	});
}

function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	}
	else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

function pricelevel2symbol(level) {
	symbol = "";
	while (level > 0) {
		symbol += "$";
		level --;
	}
	return symbol;
}
