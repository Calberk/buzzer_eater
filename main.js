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
    getTwitterData();
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
            success: function(response){
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
function storeTwitterData(response){
    var twitterArray = response.info;

    for(var i = 0; i < twitterArray.length; i++){
        var tweet = twitterArray[i].text;
        var urlIndex = tweet.indexOf("http");
        var tweetBox = $("<div>");

        //If the tweet has a url at the end
        if(urlIndex !== -1){
            var newTweetArray = tweet.split(" ");
            var urlTweet = newTweetArray.pop();
            var newTweet = newTweetArray.join(" ");

            var hyperLink = $("<a>").text("more info").attr("href",urlTweet).attr("target", "_blank");
            tweetBox.append(newTweet, hyperLink).addClass("tweetText");
        }
        else{
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

