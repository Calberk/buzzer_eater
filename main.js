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
    // landing();
    // search_result();
    getNBAData();
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
function getNBAData() {
    var currentTime = new Date();
    var month = currentTime.getUTCMonth() + 1;
    var day =currentTime.getUTCDate()-1;
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

    var timer = $("<div>").addClass("timer");
    var timerContainer = $("<div>").addClass("timer-container");
    var quarter = $("<div>").addClass("quarter").text(gameInfo.quarter);
    var timeLeft = $("<div>").addClass("timeleft").text(gameInfo.clock);

    timerContainer.append(quarter, timeLeft);
    timer.append(timerContainer);


    scoreboard.append(homeTeam, awayTeam, timer);
    $(".gameSection").append(scoreboard);
}
