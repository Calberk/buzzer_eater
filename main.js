/* information about jsdocs:
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
*
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);



/**
 * Define all global variables here.
 */


/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server
 */
function initializeApp(){
    landing();
    search_result();
}

/***************************************************************************************************
 * initMap
 * @params {undefined}
 * @returns  {undefined}
 *
 */
function initMap(){
    var areaOne = {lat: 34.101302, lng: -118.343581};
    var areaTwo = {lat: 34.103300, lng: -118.339200};
    var areaThree = {lat: 34.104600, lng: -118.341800};
    var areaFour = {lat: 34.101700, lng: -118.338200};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: areaOne});// areaOne needs to be the city we are searching
    var markerOne = new google.maps.Marker({position: areaOne, map: map});
    var infowindow = new google.maps.InfoWindow({
        content: 'Wild Wings'
    });
    markerOne.addListener('click', function() {
        infowindow.open(markerOne.get('map'), markerOne);
    });
    // var markerTwo = new google.maps.Marker({position: areaTwo, map: map});
    // var markerThree = new google.maps.Marker({position: areaThree, map: map});
    // var markerFour = new google.maps.Marker({position: areaFour, map: map});

}

// var position = {lat: 34.101302, lng: -118.343581};

var marker = new google.maps.Marker({
    position: {
        lat: 34.101302,
        lng: -118.343581
    },
    map: map
});

var zomato = {
    position: {
        lat: zomatoResult[i]['coordinates']['latitude'],
        lng: zomatoResult[i]['coordinates']['longitude']
    },
    name: {
        zomatoResult[i]['name']
    }
}

for (var key in object) { }





    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: zomatoResult['name']
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'Wild Wings'
    });
    markerOne.addListener('click', function() {
        infowindow.open(markerOne.get('map'), markerOne);
    });

}

/***************************************************************************************************
 * attachRestaurantInfo
 * @params {undefined}
 * @returns  {undefined}
 *
 */
function attachRestaurantInfo(marker, info){
    var infowindow = new google.maps.InfoWindow({
        content: 'Wild Wings'
    });

    marker.addListener('click', function() {
        infowindow.open(marker.get('map'), marker);
    });

}

/***************************************************************************************************
 * land -
 * @param:
 * @return:
 none
 */
function landing() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 33.652775, lng: -117.750732}
    });
    var geocoder = new google.maps.Geocoder();

    // $("#submit").addEventListener('click', function() {
    //     geocodeAddress(geocoder, map);
    // });

    document.getElementById('submit').addEventListener('click', function() {
        search_result(geocoder, map);
    });
}

/***************************************************************************************************
 * search_result -
 * @param: two (geocoder, resultsMap)
 * @return:
 none
 */

var long_lat = [];
function search_result(geocoder, resultsMap) {

    var address = $("#address").val();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
            /* locale.push(resultsMap.getCenter());  */
            var loc = resultsMap.getCenter();
            alert(loc);
            var spli = loc.split(",");
            long_lat.push(spli);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
/***************************************************************************************************
 * getTwitterData -
 * @param:
 * @returns:
 * @calls:
 */
function getTwitterData(){

}
/***************************************************************************************************
 * storeTwitterData -
 * @param
 * @return
 * @calls
 */
function storeTwitterData(){

}
/***************************************************************************************************
 * getRestaurantInformation - clears out the form values based on inputIds variable
 * @param {undefined} lat, long
 * @return restaurant coordinates and restaurant information
 * @calls initMap
 */
function getRestaurantInformation(coordinateArr){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://danielpaschal.com/zamatoproxy.php",
        "method": "GET",
        dataType: 'json',
        data: {
            // url: 'api/v2.1/search?q=bar&count=20&lat='+lat+'&lon='+long+'&radius=1.0&cuisines=983%2C%20227'
            url: 'api/v2.1/search',
            count: 10,
            lat: coordinateArr[0],
            lon: coordinateArr[1],
            radius: 5000,
            cuisines: 227,
            q: "bar",

            //url: 'api/v2.1/search?lat=33.6846&lon=-117.8265&cuisines=983%2C%20821%2C%20227%2C%20270'
        },
        "headers": {
            "user-key": "dd384e671b6ae1836ee2ff1a1829fdbc",

        },
        success: function( response){
            console.log(response);
            createRestaurantObj(response);
        },
        error: function(err){
            console.log(arguments);
        }
    };
    $.ajax(settings)
}
/***************************************************************************************************
 * renderRestaurants - take in a  object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param object of restaurant info
 */
function renderRestaurants(restObj){
    var restContainer = $("<div>").addClass("image");
    var imageContainer = $("<img>").addClass("appImage").attr("src", "images/basketball_beer.jpg");
    var infoContainer = $("<div>").addClass("info");
    var nameContainer = $("<div>").addClass("restaurantName").text(restObj.name);
    var cityContainer = $("<div>").addClass("city").text(restObj.city);
    var addressContainer = $("<div>").addClass("address").text(restObj.address);
    var rateContainer = $("<div>").addClass("rateSection");
    var ratingContainer = $("<div>").addClass("rating").text(restObj.rating);
    var voteContainer = $("<div>").addClass("votes").text(restObj.votes);
    infoContainer.append(nameContainer, cityContainer, addressContainer);
    rateContainer.append(ratingContainer, voteContainer);
    restContainer.append(imageContainer, infoContainer, rateContainer);
}

/***************************************************************************************************
 * createRestaurantObj - take in a  object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param object of restaurant info
 */
function createRestaurantObj(apiObj) {
    var brewery = apiObj.restaurants;
    var restaurantsArray = []
    for (var restaurantIndex = 0; restaurantIndex < brewery.length; restaurantIndex++) {
        var restaurantObj = {};
        var restLat = brewery[restaurantIndex].restaurant.location.latitude;
        var restLong = brewery[restaurantIndex].restaurant.location.longitude;
        var restName = brewery[restaurantIndex].restaurant.name;
        var restAddress = brewery[restaurantIndex].restaurant.location.address;
        var restPricing = brewery[restaurantIndex].restaurant.price_range;
        var restRating = brewery[restaurantIndex].restaurant.user_rating.aggregate_rating;
        var restCity = brewery[restaurantIndex].restaurant.location.locality;
        var restRateCount = brewery[restaurantIndex].restaurant.user_rating.votes;
        restaurantObj.latitude = restLat;
        restaurantObj.longitude = restLong;
        restaurantObj.name = restName;
        restaurantObj.address = restAddress;
        restaurantObj.pricing = restPricing;
        restaurantObj.rating = restRating;
        restaurantObj.city = restCity;
        restaurantObj.votes = restRateCount;
        console.log(restLat, restLong, restName, restAddress, restPricing, restRating, restCity, restRateCount);
        renderRestaurants(restaurantObj);
        restaurantsArray.push(restaurantObj);
    }
    initMap(restaurantsArray);
}



/***************************************************************************************************
 * renterTwitter -
 * @param
 * @returns
 * @calls
 */
function renderTwitter(studentArray){

}

/***************************************************************************************************
 * getNBAData -
 * @param:
 * @returns
 */
function getScores(array){

}

/***************************************************************************************************
 * updateNBAScores -
 * @param:
 * @returns
 */
function updateNBAScores(){

}
/***************************************************************************************************
 * formatTeamInfo -
 * @param:
 * @returns
 */
function formatTeamInfo(){

}

/***************************************************************************************************
 * functionGenerateScoreboard -
 * @param:
 * @returns
 */
function functionGenerateScoreboard(){

}

