$(document).ready(initializeApp);

function initializeApp(){
    $("button").click(passCoordintes);
}

var coordinates = [33.8169, -118.0369];

function passCoordintes(){
    var latitude = (coordinates[0]);
    var longitude =(coordinates[1]);
    getRestaurantInformation(latitude, longitude)
}
//?q=bar&count=20&lat=33.8169&lon=-118.0369&radius=1.0&cuisines=983%2C%20227
function getRestaurantInformation(lat, long) {
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
            lat: lat,
            lon: long,
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
            var brewery = response.restaurants;
            for(var restaurantIndex = 0; restaurantIndex < brewery.length; restaurantIndex++) {
                var restLat = brewery[restaurantIndex].restaurant.location.latitude;
                var restLong = brewery[restaurantIndex].restaurant.location.longitude;
                var restName = brewery[restaurantIndex].restaurant.name;
                var restAddress = brewery[restaurantIndex].restaurant.location.address;
                var restPricing = brewery[restaurantIndex].restaurant.price_range;
                var restRating = brewery[restaurantIndex].restaurant.user_rating.aggregate_rating;
                console.log(restLat, restLong, restName, restAddress, restPricing, restRating);
            }
        },

        error: function(err){
            console.log(arguments);
        }
    };

    // var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://danielpaschal.com/zamatoproxy.php",
    //     "method": "GET",
    //     data: {
    //         url: 'api/v2.1/search?lat=33.6846&lon=-117.8265&cuisines=983%2C%20821%2C%20227%2C%20270'
    //     },
    //     "headers": {
    //         "user-key": "dd384e671b6ae1836ee2ff1a1829fdbc",
    //
    //     },
    //     dataType: 'json',
    //     success: function( response){
    //         console.log(response);
    //     },
    //     error: function(err){
    //         console.log(arguments);
    //     }
    // }
    $.ajax(settings)
}
//
// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://danielpaschal.com/zamatoproxy.php",
//     "method": "GET",
//     data: {
//         url: 'api/v2.1/search?lat=33.6846&lon=-117.8265&cuisines=983%2C%20821%2C%20227%2C%20270'
//     },
//     "headers": {
//         "user-key": "dd384e671b6ae1836ee2ff1a1829fdbc",
//
//     },
//     dataType: 'json',
//     success: function( response){
//         console.log(response);
//     },
//     error: function(err){
//         console.log(arguments);
//     }
// }
//
// $.ajax(settings)


// var zomatoSearch = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://danielpaschal.com/zamatoproxy.php",
//     "method": "GET",
//     data: {
//         // url: "api/v2.1/search?q=bar&count=20&lat=" +lat+ "&lon=" +long+ "&radius=5.0&cuisines=983%2C%20227&sort=real_distance"
//         url: 'api/v2.1/search?q=bar&count=20&lat=33.05&lon=-118.24&radius=1.0&cuisines=983%2C%20227&sort=real_distance'
//         },
//     "headers": {
//         "user-key": "dd384e671b6ae1836ee2ff1a1829fdbc",
//     },
//     dataType: 'json',
//     success: function (response) {
//         console.log(response);
//         var brewery = response.restaurants;
//         for(var restaurantIndex = 0; restaurantIndex < brewery.length; restaurantIndex++)
//         console.log(brewery[restaurantIndex].restaurant.location.latitude, brewery[restaurantIndex].restaurant.location.longitude)
//     },
//     error: function (err) {
//         console.log(arguments);
//     }
// };