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
}
var long_lat = [];
function search_result(geocoder, resultsMap) {

    var address = $("#address").val();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                // text: resultsMap.getCenter()
            });
            long_lat.push(resultsMap.getCenter());
            console.log("result: " + long_lat);
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
function getRestaurantInformation(lat, long){

}
/***************************************************************************************************
 * renderRestaurants - take in a  object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param object of restaurant info
 */
function renderRestaurants(restaurantObj){

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

