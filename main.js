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

}

/***************************************************************************************************
 * initMap
 * @params {undefined}
 * @returns  {undefined}
 *
 */
function initMap(){

}

/***************************************************************************************************
 * attachRestaurantInfo
 * @params {undefined}
 * @returns  {undefined}
 *
 */
function attachRestaurantInfo(){

}

/***************************************************************************************************
 * land -
 * @param
 * @return:
 none
 */
function land(){

}


/***************************************************************************************************
 * search_result -
 * @param
 * @return:
 none
 */
function search_result(){

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

