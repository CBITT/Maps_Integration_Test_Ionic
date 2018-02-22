// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('MapController', function ($scope) {

    google.maps.event.addDomListener(window, 'load', function () {
        var myLatlng = new google.maps.LatLng(53.342280, -6.264251);

        var mapOptions = {
            center: myLatlng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };


        var map = new google.maps.Map(document.getElementById("map"), mapOptions);


        var gyms = [
          ['Hercules Gym', 52.282751, -9.707301, 'Monavalley Industrial Estate, Tralee, Co. Kerry', 'https://www.facebook.com/hercules.tbc/'],
          ['Kerry Dance & Fitness Centre', 52.273778, -9.704659, 'Upper Rock St, Gallowsfields, Tralee, Co. Kerry', 'https://www.kerrydanceandfitness.com/'],
          ['Pro Fitness Tralee', 52.285473, -9.705125, 'CrossFit R560 Kerry, Tralee, Co. Kerry', 'https://www.facebook.com/profitnesstralee/'],
          ['Tralee Sports Complex', 52.271729, -9.691937, 'Liosdara, Cloonalour, Tralee, Co. Kerry', 'https://www.facebook.com/traleegymnasticsclub'],
          ['BTS Fitness', 52.261762, -9.6720996, 'Unit 3, Manor Park, Tralee, Co. Kerry', 'http://btsfitness.ie/'],
          ['Nisus Fitness Training Club', 52.261094, -9.688146, 'Unit 2 Killerisk Business Park, Tralee, Co. Kerry', 'http://nisusfitness.com/'],
          ['Aqua Dome', 52.264862, -9.662870, 'Tralee, Co. Kerry', 'http://aquadome.ie/'],
          ['Curves', 52.267872, -9.709532, 'Units 2&3 Hilliards Lane, Killarney, Co. Kerry', 'http://aquadome.ie/'],
            ['Tralee School Of Martial Arts', 52.269159, -9.709811, '11 High St, Tralee, Co. Kerry', 'http://aquadome.ie/'],
              ['Ballygarry House Hotel and Spa', 52.262159, -9.659775, 'Tralee, Co. Kerry', 'http://www.ballygarryhouse.com/'],
                ['An Riocht', 52.232120, -9.459254, 'Castleisland Library, Station Road, Knockananlig, Castleisland, Co. Kerry', 'http://aquadome.ie/'],
                  ['R & R Fitness', 52.229159, -9.464811, '7 Barrack St, Cahereen East, Co. Kerry', 'http://aquadome.ie/'],
                    ['Aghadoe Heights Hotel & Spa', 52.170042, -9.526158, 'Aghadoe House, High Street, Nunstown, KIllarney, Co. Kerry', 'http://aquadome.ie/'],
                      ['Castlerosse Leisure Club', 52.065837, -9.538184, 'Ring of Kerry, Fossa, Killarney, Co. Kerry', 'http://aquadome.ie/'],
                      ['Sportys Town Gym', 52.058885, -9.509497, '7 Main St, Killarney, Co. Kerry', 'http://aquadome.ie/'],
                        ['BeliefFit CrossFitKillarney', 52.060405, -9.505613, 'The Courtyard, Fair Hill, Killarney, Co. Kerry', 'http://aquadome.ie/']
        ];

        setMarkers(map, gyms)



        function setMarkers(map, gyms) {

            var marker, i

            for (i = 0; i < gyms.length; i++) {

                var gymname = gyms[i][0]
                var lat = gyms[i][1]
                var long = gyms[i][2]
                var add = gyms[i][3]
                var site = gyms[i][4]

                latlngset = new google.maps.LatLng(lat, long);

                var marker = new google.maps.Marker({
                    map: map,
                    title: gymname,
                    position: latlngset
                });
                map.setCenter(marker.getPosition())


                var content = "Gym:<strong>" + gymname + ' </strong></h3>' + "<br>Address:  <strong>" + add +
                    " </strong><br>Website: <a href=" + site + ">here</a>"

                var infowindow = new google.maps.InfoWindow()

                google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
                    return function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    };
                })(marker, content, infowindow));

            }
        }

        navigator.geolocation.getCurrentPosition(function (pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    scale: 8.5,
                    fillColor: "#6EFF33",
                    fillOpacity: 0.4,
                    strokeWeight: 0.4
                },
                map: map,
                title: "My Location"

            });

        });

        setMarkers(map);
        $scope.map = map;
    });

});
