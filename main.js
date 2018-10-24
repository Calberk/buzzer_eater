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
var logos = {
    "ATL": "nbaimages/ATL.png",
    "BKN": "nbaimages/BKN.png",
    "BOS": "nbaimages/BOS.png",
    "CHA": "nbaimages/CHA.png",
    "CHI": "nbaimages/CHI.png",
    "CLE": "nbaimages/CLE.png",
    "DAL": "nbaimages/DAL.png",
    "DEN": "nbaimages/DEN.png",
    "DET": "nbaimages/DET.png",
    "GSW": "nbaimages/GSW.png",
    "HOU": "nbaimages/HOU.png",
    "IND": "nbaimages/IND.png",
    "LAC": "nbaimages/LAC.png",
    "LAL": "nbaimages/LAL.png",
    "MIA": "nbaimages/MIA.png",
    "MEM": "nbaimages/MEM.png",
    "MIL": "nbaimages/MIL.png",
    "MIN": "nbaimages/MIN.png",
    "NOP": "nbaimages/NOP.png",
    "NYK": "nbaimages/NYK.png",
    "OKC": "nbaimages/OKC.png",
    "PHI": "nbaimages/PHI.png",
    "PHX": "nbaimages/PHX.png",
    "POR": "nbaimages/POR.png",
    "SAC": "nbaimages/SAC.png",
    "SAS": "nbaimages/SAS.png",
    "TOR": "nbaimages/TOR.png",
    "UTA": "nbaimages/UTA.png",
    "WAS": "nbaimages/WAS.png"
};


/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server
 */
function initializeApp(){
    landing();
    // search_result();
    getNBAData();
    storeTwitterData();
    initMap();
}

/***************************************************************************************************
 * initMap
 * @params {undefined}
 * @returns  {undefined}
 *
 */


function initMap(restArray) {


    var bounds = new google.maps.LatLngBounds();
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 15, center: numCoord});// areaOne needs to be the city we are searching



    for (i = 0; i < restArray.length; i++) {
        var position = new google.maps.LatLng(restArray[i].latitude, restArray[i].longitude);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: restArray[i].name
        });
        var infoWindow = new google.maps.InfoWindow(), marker, i;

    }
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
            infoWindow.setContent(infoWindowContent[i][0]);
            infoWindow.open(map, marker);
        }
    })(marker, i));
        // var markerOne = new google.maps.Marker({position: position, map: map});
        // var infowindow = new google.maps.InfoWindow({
        //     content: 'Wild Wings'
        // });
        // markerOne.addListener('click', function () {
        //     infowindow.open(markerOne.get('map'), markerOne);
        // });


// }

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

var numCoord;

function search_result(geocoder, resultsMap) {

    var address = $("#address").val();
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
            });
            var loc = resultsMap.getCenter();
            var coorStr = loc.lat() + ',' + loc.lng();
            var long_latArr = coorStr.split(",");
            numCoord = long_latArr.map(Number);
            console.log(numCoord);
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
    // var array = [33.8169, -118.0369];
    getRestaurantInformation(array);
}
/***************************************************************************************************
 * getRestaurantInformation - clears out the form values based on inputIds variable
 * @param {undefined} lat, long
 * @return restaurant coordinates and restaurant information
 * @calls initMap
 */
function getRestaurantInformation(){
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
            lat: numCoord[0],
            lon: numCoord[1],
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
 * renderRestaurants - take in a  object, dynamically create html elements with object values and append the elements
 * into the restaurantSection
 * @param object of restaurant info
 */
function renderRestaurants(restObj){
    var restaurantContainer = $("<div>").addClass("mainRestaurantContainer");
    var imageContainer = $("<div>").addClass("image");
    var image = $("<img>").addClass("appImage").attr("src", "images/basketball_beer.jpg");
    var infoContainer = $("<a>", {
        class: "info",
        href: restObj.url,
        target: "_blank"
    });
    var nameContainer = $("<div>").addClass("restaurantName").text(restObj.name);
    var cityContainer = $("<div>").addClass("city").text(restObj.city);
    var addressContainer = $("<div>").addClass("address").text(restObj.address);
    var rateContainer = $("<div>").addClass("rateSection");
    var ratingContainer = $("<div>").addClass("rating").text(restObj.rating);
    var voteContainer = $("<div>").addClass("votes").text(restObj.votes + " reviews");
    infoContainer.append(nameContainer, cityContainer, addressContainer);
    rateContainer.append(ratingContainer, voteContainer);
    imageContainer.append(image);
    restaurantContainer.append(imageContainer, infoContainer, rateContainer);
    $(".restaurantSection").append(restaurantContainer);
}

/***************************************************************************************************
 * createRestaurantObj - take in a  object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param object of restaurant info
 */
function createRestaurantObj(apiObj) {
    var brewery = apiObj.restaurants;
    var restaurantsArray = [];
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
        var restUrl = brewery[restaurantIndex].restaurant.url;
        restaurantObj.latitude = restLat;
        restaurantObj.longitude = restLong;
        restaurantObj.name = restName;
        restaurantObj.address = restAddress;
        restaurantObj.pricing = restPricing;
        restaurantObj.rating = restRating;
        restaurantObj.city = restCity;
        restaurantObj.votes = restRateCount;
        restaurantObj.url = restUrl;
        renderRestaurants(restaurantObj);
        restaurantsArray.push(restaurantObj);
        console.log(restaurantsArray);
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
 * @param: none
 * @returns: object response from NBA API
 */
function getNBAData() {
    var currentTime = new Date();
    var month = currentTime.getUTCMonth()+1;
    var day =currentTime.getUTCDate();
    var year = currentTime.getUTCFullYear();

    var nbaData = {
        "async": true,
        "crossDomain": true,
        'dataType': 'json',
        "url": `http://danielpaschal.com/nbaproxy.php?year=${year}&month=${month}&date=${day}`,
        "method": "GET",
    }

    $.ajax(nbaData).done(function (response) {
        var nbaData = response;
        updateNBAScores(nbaData);
        console.log(response);
    });
}

/***************************************************************************************************
 * updateNBAScores -
 * @param: nbaData
 * @returns teamOne, teamTwo, gameInfo
 */
function updateNBAScores(nbaData) {
    var numberGames = nbaData.numGames;
    for (var i = 0; i < numberGames; i++) {
        var teamName1 = nbaData.games[i].hTeam.triCode;
        var teamName2 = nbaData.games[i].vTeam.triCode;

        var teamScore1 = nbaData.games[i].hTeam.score;
        var teamScore2 = nbaData.games[i].vTeam.score;

        var teamImage1 = logos[teamName1];
        var teamImage2 = logos[teamName2];

        var gameFinal = nbaData.games[i].isGameActivated;



        var quarter = nbaData.games[i].period.current;
        var clock = nbaData.games[i].clock;
        var startTime = nbaData.games[i].startTimeEastern;


        var teamOne = formatTeamInfo(teamName1, teamScore1, teamImage1);
        var teamTwo = formatTeamInfo(teamName2, teamScore2, teamImage2);
        var gameInfo = {
            quarter: quarter,
            clock: clock,
            startTime: startTime,
            gameFinal: gameFinal,
        };

        generateScoreboard(teamOne, teamTwo, gameInfo);


        console.log(teamName1);
        console.log(teamName2);
        console.log(teamScore1);
        console.log(teamScore2);
        console.log(quarter);
        console.log(clock);
        console.log(startTime);


    }


}
/***************************************************************************************************
 * formatTeamInfo -
 * @param: tricode, score, teamImg
 * @returns team Obj
 */
function formatTeamInfo(tricode, score, teamImg) {
    var team = {
        tricode: tricode,
        score: score,
        teamImg: teamImg
    };

    return team;
}

/***************************************************************************************************
 * functionGenerateScoreboard -
 * @param:
 * @returns
 */
function generateScoreboard(teamOne, teamTwo, gameInfo) {
    var scoreboard = $("<div>").addClass("scoreboard");


    var homeTeam = $("<div>").addClass("team team-a");
    var homeTeamLogo1 = $("<div>").addClass("team-logo");
    var logo1 = $("<img>").attr("src", teamOne.teamImg).css("width","50px").css("height","50px");
    var teamDetails1 = $("<div>").addClass("team-detail");
    var teamNameandScore1 = $("<div>").addClass("team-nameandscore");
    var teamName1 = $("<div>").addClass("homeTeamName").text(teamOne.tricode);
    var teamScore1 = $("<div>").addClass("homeTeamScore").text(teamOne.score);
    var space = $("<div>").addClass('space');

    teamNameandScore1.append(teamName1, teamScore1);
    teamDetails1.append(teamNameandScore1,space);
    homeTeamLogo1.append(logo1);
    homeTeam.append(homeTeamLogo1, teamDetails1);
    scoreboard.append(homeTeam);



    var awayTeam = $("<div>").addClass("team team-b");
    var homeTeamLogo2 = $("<div>").addClass("team-logo");
    var logo2 = $("<img>").attr("src", teamTwo.teamImg).css("width","50px").css("height","50px");
    var teamDetails2 = $("<div>").addClass("team-detail");
    var teamNameandScore2 = $("<div>").addClass("team-nameandscore");
    var teamName2 = $("<div>").addClass("homeTeamName").text(teamTwo.tricode);
    var teamScore2 = $("<div>").addClass("awayTeamScore").text(teamTwo.score);
    var space = $("<div>").addClass('space');

    teamNameandScore2.append(teamName2, teamScore2);
    teamDetails2.append(teamNameandScore2,space);
    homeTeamLogo2.append(logo2);
    awayTeam.append(homeTeamLogo2, teamDetails2);
    scoreboard.append(awayTeam);


    var quarter = gameInfo.quarter;
    var timerContainer = $("<div>").addClass("timer-container");
    var timer = $("<div>").addClass("timer");
    var gameStart = gameInfo.gameFinal;



    if(gameStart == true && quarter > 4) {
        var quarter1 = $("<div>").addClass("quarter").text("OT");
        var timeLeft = $("<div>").addClass("timeleft").text(gameInfo.clock);
        timerContainer.append(quarter1, timeLeft);
    }
    if(gameStart == true && quarter <= 4) {
        var quarter = $("<div>").addClass("quarter").text(gameInfo.quarter);
        var timeLeft = $("<div>").addClass("timeleft").text(gameInfo.clock);
        timerContainer.append(quarter, timeLeft);
    }

    if(gameStart == false && teamOne.score == 0) {
        var startTime = $("<div>").addClass("timeleft").text(gameInfo.startTime);
        var quarter2 = $("<div>").addClass("quarter").text("");
        timerContainer.append(quarter2, startTime);
    }
    if(gameStart == false && teamOne.score > 0) {
        var endTime = $("<div>").addClass("timeleft").text("FINAL");
        var quarter3 = $("<div>").addClass("quarter").text("");
        timerContainer.append(quarter3, endTime);
    }


    timer.append(timerContainer);
    scoreboard.append(homeTeam, awayTeam, timer);
    $(".gameSection").append(scoreboard);
}
