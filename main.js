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
    "ORL": "nbaimages/ORL.png",
    "PHI": "nbaimages/PHI.png",
    "PHX": "nbaimages/PHX.png",
    "POR": "nbaimages/POR.png",
    "SAC": "nbaimages/SAC.png",
    "SAS": "nbaimages/SAS.png",
    "TOR": "nbaimages/TOR.png",
    "UTA": "nbaimages/UTA.png",
    "WAS": "nbaimages/WAS.png"
};

var numCoord = {};



/***************************************************************************************************
 * initializeApp
 * @params {undefined} none
 * @returns: {undefined} none
 * initializes the application, including adding click handlers and pulling in any data from the server
 */
function initializeApp() {
    getTwitterData();
    getNBAData();
    landing();
    // playIntro();
    // clickHandler();
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
        document.getElementById('map'), { zoom: 10, center: numCoord });// areaOne needs to be the city we are searching


    for (i = 0; i < restArray.length; i++) {
        var icon = {
            url: 'http://kindersay.com/files/images/basketball.png',
            scaledSize: new google.maps.Size(40, 35)
        };
        var position = new google.maps.LatLng(restArray[i].latitude, restArray[i].longitude);
        var url = restArray[i].url
        var name = restArray[i].name
        var content = `<a href=${url} target= "_blank"> ${name} </a>`
        // var content = restArray[i].name
        infoWindow = new google.maps.InfoWindow({ content: content });
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: icon,
            title: restArray[i].name,
            infowindow: infoWindow
        });

        google.maps.event.addListener(marker, 'click', function () {
            var name = this.infowindow.content
            infoWindow.setContent(name)
            infoWindow.open(map, this)
        })

    }
}



/***************************************************************************************************
 * landing
 * @params {undefined}
 * @returns  {undefined}
 *
 */

function landing() {
    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 10,
    //     center: {lat: 33.652775, lng: -117.750732}
    // });
    // var geocoder = new google.maps.Geocoder();

    document.getElementById('search-btn').addEventListener('click', function (e) {
        // searchDisplay()
        e.preventDefault();
        document.getElementById("loaderBackground").style.display = "block";
        search_result();
        $("#address").val('');
        loader();
        // openPage();
    });
    document.getElementById('nba').addEventListener('click', function () {
        // search_result(geocoder, map);
        // $("#address").val('');
        openPageNBA();
    });
    document.getElementById('nba1').addEventListener('click', function () {
        if ($("#pageTwo").css('display') == 'none') {
            $(".navbar-collapse").removeClass('in');
            openPageNBA1();
        }
        // search_result(geocoder, map);
        // $("#address").val('');
        // openPageNBA1();

        else {
            return
        }
    });
    document.getElementById('eats').addEventListener('click', function () {
        openPageEats();

        // search_result(geocoder, map);
        // $("#address").val('');
        // openPageEats();
    });
    document.getElementById('eats1').addEventListener('click', function () {
        if ($("#pageThree").css('display') == 'none') {
            $(".navbar-collapse").removeClass('in');
            openPageEats1();
        }
        else {
            return
        }
        // search_result(geocoder, map);
        // $("#address").val('');
    });
    // document.getElementById('home1').addEventListener('click', function() {
    //     // search_result(geocoder, map);
    //     // $("#address").val('');
    //     openPageHome1();
    // });
    document.getElementById('home2').addEventListener('click', function () {
        // search_result(geocoder, map);
        // $("#address").val('');

        if ($("#pageTwo").css('display') == 'none') {
            $(".navbar-collapse").removeClass('in');
            openPageHome2();
        }
        
        if ($("#pageThree").css('display') == 'none') {
            $(".navbar-collapse").removeClass('in');
            openPageHome3();
        }


    });

    document.getElementById('home1').addEventListener('click', function () {
        if ($("#pageTwo").css('display') == 'none') {
            $(".navbar-collapse").removeClass('in');
            openPageHome2();
        }
        if ($("#pageThree").css('display') == 'none') {
            $(".navbar-collapse").removeClass('in');
            openPageHome3();
        }


    });





    var input = document.getElementById('address');
    var options = {
        types: ['(cities)'],
        componentRestrictions: { country: 'USA' }
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
}

/***************************************************************************************************
 * search_result -
 * @param: two (geocoder, resultsMap)
 * @return:
 none
 */



function search_result() {


    var geocoder = new google.maps.Geocoder();

    var address = $("#address").val();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
           
            // console.log("RESULTSSS", results)
            // resultsMap.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     map: resultsMap,
            //     position: results[0].geometry.location,
            // });
            // var loc = resultsMap.getCenter();
            var loc = results[0].geometry.location
            numCoord = {
                lat: loc.lat(),
                lng: loc.lng()
            };
            getRestaurantInformation();
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
function getTwitterData() {

    var ajaxObject = {
        url: 'https://s-apis.learningfuze.com/hackathon/twitter/index.php',
        dataType: 'json',
        method: 'post',
        data: {
            action: 'user',
            screen_name: 'nba',
            get_timeline: 'true',
            include_entities: 'true',
        },
        success: function (response) {
            storeTwitterData(response);
        }
    };
    $.ajax(ajaxObject)
}
/***************************************************************************************************
 * storeTwitterData -
 * @param:
 * @return:
 * @calls:
 */
function storeTwitterData(response) {
    var twitterArray = response.info;

    for (var i = 0; i < twitterArray.length; i++) {
        var tweet = twitterArray[i].text;
        var urlIndex = tweet.indexOf("http");
        var tweetBox = $("<div>");

        //If the tweet has a url at the end
        if (urlIndex !== -1) {
            var newTweetArray = tweet.split(" ");
            var urlTweet = newTweetArray.pop();
            var newTweet = newTweetArray.join(" ");

            var hyperLink = $("<a>").text("more info").attr("href", urlTweet).attr("target", "_blank");
            tweetBox.append(newTweet, hyperLink).addClass("tweetText");
        }
        else {
            tweetBox.append(tweet).addClass("tweetText");
        }
        $(".tweetsFeed").append(tweetBox);
    }

    var nbaLogo = $("<img>").attr("src", "images/nbalogo.jpg");
    var verifiedLogo = $("<img>").attr("src", "images/verified2.png");
    var nbaHandleName = response.info[0].user.name;

    $(".tweetLogo").append(nbaLogo);
    $(".twitterHandle").append(nbaHandleName);
    $(".twitterVerified").append(verifiedLogo);

}
/***************************************************************************************************
 * getRestaurantInformation - clears out the form values based on inputIds variable
 * @param {undefined} lat, long
 * @return restaurant coordinates and restaurant information
 * @calls initMap
 */
function getRestaurantInformation() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://danielpaschal.com/zamatoproxy.php",
        "method": "GET",
        dataType: 'json',
        data: {
            url: 'api/v2.1/search',
            count: 10,
            lat: numCoord.lat,
            lon: numCoord.lng,
            radius: 1000,
            cuisines: 227,
            q: "bar",

        },
        "headers": {
            "user-key": "dd384e671b6ae1836ee2ff1a1829fdbc",

        },
        success: function (response) {
            if(response.restaurants.length === 0 ){
                emptyRestaurant()
                
            }else{

                if($(".emptyRestaurantContainer").css('display') == 'block'){
                    $(".emptyRestaurantContainer").toggle(".display");
                    $(".map").toggle(".display");
                    $(".restaurants").toggle(".display");
                    createRestaurantObj(response);
                }else if($(".map").css('display') == 'block'){
                    createRestaurantObj(response);
                }else{
                    $(".map").toggle(".display");
                    $(".restaurants").toggle(".display");
                    createRestaurantObj(response);
                }
            }   
        },
        error: function (err) {

        }
    };
    $.ajax(settings)
}
/***************************************************************************************************
 * renderRestaurants - take in a  object, dynamically create html elements with object values and append the elements
 * into the restaurantSection
 * @param object of restaurant info
 */
function renderRestaurants(restObj) {
    var restaurantContainer = $("<div>").addClass("mainRestaurantContainer");
    // var imageContainer = $("<div>").addClass("image");
    // var image = $("<img>").addClass("appImage").attr("src", "images/basketball_beer.jpg");
    var infoContainer = $("<a>", {
        class: "info",
        href: restObj.url,
        target: "_blank"
    });
    var nameContainer = $("<div>").addClass("restaurantName").text(restObj.name);
    var cityContainer = $("<div>").addClass("city").text(restObj.city);
    var addressContainer = $("<div>").addClass("address").text(restObj.address);
    var rateContainer = $("<div>").addClass("rateSection");
    var ratingContainer = $("<div>").addClass("rating label label-warning").text(restObj.rating);
    var voteContainer = $("<div>").addClass("votes").text(restObj.votes + " reviews");
    infoContainer.append(nameContainer, cityContainer, addressContainer);
    rateContainer.append(ratingContainer, voteContainer);
    // imageContainer.append(image);
    restaurantContainer.append(infoContainer, rateContainer);
    $(".restaurantSection").append(restaurantContainer);
}

/***************************************************************************************************
 * createRestaurantObj - take in a  object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param object of restaurant info
 */
function createRestaurantObj(apiObj) {

    $(".restaurantSection").empty();
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
        var restCity = brewery[restaurantIndex].restaurant.cuisines;
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
        
    }


    initMap(restaurantsArray);
}

/***************************************************************************************************
 * FallbackScreen -
 * @param: none
 * @returns: object response from NBA API
 */

 function emptyRestaurant(){
    if($(".emptyRestaurantContainer").css('display') == 'block'){
        return
    }else if($(".map").css('display') == 'block'){
        $(".emptyRestaurantContainer").toggle(".display");
        $(".map").toggle(".display");
        $(".restaurants").toggle(".display");
    }else {
        $(".emptyRestaurantContainer").toggle(".display");
    }
 }

/***************************************************************************************************
 * getNBAData -
 * @param: none
 * @returns: object response from NBA API
 */

function getNBAData() {
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    // console.log(month, day, year)
    if (day < 10) {
        var date = `${year}${month}0${day}`
        var nbaData = {
            "async": true,
            "crossDomain": true,
            'dataType': 'json',
            "url": `https://place.kim-chris.com/nba/${date}`,
            "method": "GET",
        };

        $.ajax(nbaData).done(function (response) {
            var nbaData = response.data;
            updateNBAScores(nbaData);
            // getNBADataInterval();

        })

    }
    if (month < 10) {
        var date = `${year}0${month}${day}`
        var nbaData = {
            "async": true,
            "crossDomain": true,
            'dataType': 'json',
            "url": `https://place.kim-chris.com/nba/${date}`,
            "method": "GET",
        };

        $.ajax(nbaData).done(function (response) {
            var nbaData = response.data;
            updateNBAScores(nbaData);
            // getNBADataInterval();

        })

    }
    else {
        var date = `${year}0${month}${day}`
        var nbaData = {
            // "async": true,
            // "crossDomain": true,
            // 'dataType': 'json',
            "url": `https://place.kim-chris.com/nba/${date}`,
            "method": "GET",
        };

        $.ajax(nbaData).done(function (response) {
            var nbaData = response.data;
            updateNBAScores(nbaData);
            // getNBADataInterval();

        })
    }
}


/***************************************************************************************************
 * getNBADataInterval -
 * @param: none
 * @returns: object response from NBA API
 */
function getNBADataInterval() {
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();

    setInterval(function () {
        if (day < 10) {
            var date = `${year}${month}0${day}`
            var nbaData = {
                "async": true,
                "crossDomain": true,
                'dataType': 'json',
                "url": `https://place.kim-chris.com/nba/${date}`,
                "method": "GET",
            };

            $.ajax(nbaData).done(function (response) {
                var nbaData = response.data;
                updateNBAScores(nbaData);


            })

        }
        if (month < 10) {
            var date = `${year}0${month}${day}`
            var nbaData = {
                "async": true,
                "crossDomain": true,
                'dataType': 'json',
                "url": `https://place.kim-chris.com/nba/${date}`,
                "method": "GET",
            };

            $.ajax(nbaData).done(function (response) {
                var nbaData = response.data;
                updateNBAScores(nbaData);


            })

        }
        else {
            var date = `${year}${month}${day}`
            var nbaData = {
                // "async": true,
                // "crossDomain": true,
                // 'dataType': 'json',
                "url": `https://place.kim-chris.com/nba/${date}`,
                "method": "GET",
            };

            $.ajax(nbaData).done(function (response) {
                var nbaData = response.data;
                updateNBAScores(nbaData);


            })
        }
    }, 15000);

}

/***************************************************************************************************
 * updateNBAScores -
 * @param: nbaData
 * @returns teamOne, teamTwo, gameInfo
 */
function updateNBAScores(nbaData) {
    // console.log(nbaData)
    $("#gameSection").empty();


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
    var logo1 = $("<img>").attr("src", teamOne.teamImg).css("width", "50px").css("height", "50px");
    var teamDetails1 = $("<div>").addClass("team-detail");
    var teamNameandScore1 = $("<div>").addClass("team-nameandscore");
    var teamName1 = $("<div>").addClass("homeTeamName").text(teamOne.tricode);
    if (teamOne.score == "0") {
        var teamScore1 = " "
    }

    else {
        var teamScore1 = $("<div>").addClass("homeTeamScore").text(teamOne.score);
    }
    var space = $("<div>").addClass('space');


    teamNameandScore1.append(teamName1, teamScore1);
    teamDetails1.append(teamNameandScore1, space);
    homeTeamLogo1.append(logo1);
    homeTeam.append(homeTeamLogo1, teamDetails1);
    scoreboard.append(homeTeam);


    var awayTeam = $("<div>").addClass("team team-b");
    var homeTeamLogo2 = $("<div>").addClass("team-logo");
    var logo2 = $("<img>").attr("src", teamTwo.teamImg).css("width", "50px").css("height", "50px");
    var teamDetails2 = $("<div>").addClass("team-detail");
    var teamNameandScore2 = $("<div>").addClass("team-nameandscore");
    var teamName2 = $("<div>").addClass("homeTeamName").text(teamTwo.tricode);

    if (teamTwo.score == "0") {
        var teamScore1 = " "
    }

    else {
        var teamScore2 = $("<div>").addClass("homeTeamScore").text(teamOne.score);
    }

    var space = $("<div>").addClass('space');

    if (teamScore2 == "0") {
        var teamScore2 = " "
    };

    teamNameandScore2.append(teamName2, teamScore2);
    teamDetails2.append(teamNameandScore2, space);
    homeTeamLogo2.append(logo2);
    awayTeam.append(homeTeamLogo2, teamDetails2);
    scoreboard.append(awayTeam);


    var quarter = gameInfo.quarter;
    var timerContainer = $("<div>").addClass("timer-container");
    var timer = $("<div>").addClass("timer");
    var gameStart = gameInfo.gameFinal;
    var clock = gameInfo.clock


    if (gameStart == true && quarter > 4) {
        var quarter1 = $("<div>").addClass("quarter").text("OT");
        var timeLeft = $("<div>").addClass("timeleft").text(clock);
        timerContainer.append(quarter1, timeLeft);
    }
    if (gameStart == true && quarter <= 4) {
        var quarter = $("<div>").addClass("quarter").text(gameInfo.quarter);
        var timeLeft = $("<div>").addClass("timeleft").text(clock);
        timerContainer.append(quarter, timeLeft);
    }
    if (gameStart == true && quarter == 2 && clock == "0.0") {
        var quarter = $("<div>").addClass("quarter").text(gameInfo.quarter);
        var halftime = $("<div>").addClass("timeleft").text("HALF");
        timerContainer.append(quarter, halftime);
    }


    if (gameStart == false && teamOne.score == 0) {
        var startTime = $("<div>").addClass("timeleft").text(gameInfo.startTime);
        var quarter2 = $("<div>").addClass("quarter").text("");
        timerContainer.append(quarter2, startTime);
    }
    if (gameStart == false && teamOne.score > 0) {
        var endTime = $("<div>").addClass("timeleft").text("FINAL");
        var quarter3 = $("<div>").addClass("quarter").text("");
        timerContainer.append(quarter3, endTime);
    }


    timer.append(timerContainer);
    scoreboard.append(homeTeam, awayTeam, timer);
    $(".gameSection").append(scoreboard);


}




/***************************************************************************************************
 * openPage - switch between opening page and main page
 * @param:
 * @returns
 */



function openPageNBA() {
    $(".navbar").toggle(".display");
    $(".pageOne").toggle(".display");
    $(".pageTwo").toggle(".display");
    //   $(".pageThree").toggle(".display");
}
function openPageNBA1() {
    if($(".emptyRestaurantContainer").css('display') == 'block'){
        $(".emptyRestaurantContainer").toggle(".display");
    }
    $("#map").empty();
    $(".restaurantSection").empty();
    $(".pageTwo").toggle(".display");
    $(".pageThree").toggle(".display");
}
function openPageEats() {
    $(".navbar").toggle(".display");
    $(".pageOne").toggle(".display");
    // $(".pageTwo").toggle(".display");
    $(".pageThree").toggle(".display");
}
function openPageEats1() {
    // $(".pageOne").toggle(".display");
    $(".pageTwo").toggle(".display");
    $(".pageThree").toggle(".display");
}
//   function openPageHome1() {
//     $(".navbar").toggle(".display");
//     $(".pageOne").toggle(".display");
//     $(".pageTwo").toggle(".display");
//     // $(".pageThree").toggle(".display");
//   }
function openPageHome2() {
    if($(".emptyRestaurantContainer").css('display') == 'block'){
        $(".emptyRestaurantContainer").toggle(".display");
    }
    $("#map").empty();
    $(".restaurantSection").empty();
    $(".navbar").toggle(".display");
    $(".pageOne").toggle(".display");
    $(".pageThree").toggle(".display");
}
function openPageHome3() {
    $(".navbar").toggle(".display");
    $(".pageOne").toggle(".display");
    $(".pageTwo").toggle(".display");
    // $(".pageThree").toggle(".display");
}

//   function searchDisplay() {
//       $(".restaurants").toggle(".display");
//   }

// function playIntro() {
//     var audio = new Audio('sounds/buzzer-eater.mp3');
//     audio.play();
// }

// function clickHandler(){
//     $(".reset").click(openPage);
// }


/***************************************************************************************************
 * loading screen - loader after search function
 * @param:
 * @returns
 */

function loader() {
    const loadingImg = setTimeout( hideLoader , 2000);
}

function hideLoader() {
    document.getElementById("loaderBackground").style.display = "none"

}