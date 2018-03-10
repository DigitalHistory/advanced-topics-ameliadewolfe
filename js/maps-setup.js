// initialize the variables we need
// we do this here to make sure we can access them
// whenever we need to -- they have 'global scope'
var my_map; // this will hold the map
var my_map_options; // this will hold the options we'll use to create the map
var my_center = new google.maps.LatLng(41.8986,12.4768); // center of map
var my_markers = []; // we use this in the main loop below to hold the markers
// this one is strange.  In google maps, there is usually only one
// infowindow object -- its content and position change when you click on a
// marker.  This is counterintuitive, but we need to live with it.
var infowindow = new google.maps.InfoWindow({content: ""});
var legendHTML = "<h1>Legend</h1>";

// I'm complicating things a bit with this next set of variables, which will help us
// to make multi-colored markers
var blueURL = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
var lightblueURL = "";

var redURL = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
var lightredURL = "";

var orangeURL = "";
var lightorangeURL = "";

var purpleURL = "";
var lightpurpleURL = "";

//

var blue_markers = [];
var lightblue_markers = [];

var red_markers = [];
var lightred_markers = [];

var orange_markers = [];
var lightorange_markers = [];

var purple_markers = [];
var lightpurple_markers = [];

// this is for fun, if you want it.  With this powerful feature you can add arbitrary
// data layers to your map.  It's cool. Learn more at:
// https://developers.google.com/maps/documentation/javascript/datalayer#load_geojson

var myGeoJSON= {
  "type":"FeatureCollection",
  "features":

  [{"type":"Feature",
  "properties":{myColor: 'blue'},
  "myColor" : "blue",
  "geometry":{"type":"Polygon",
  "coordinates":[[[-0.840128, 35.546473], [-0.808099, 35.599194]]]}},

  {"type":"Feature",
  "properties":{myColor: 'lightblue'},
  "myColor" : "lightblue",
  "geometry":{"type":"Polygon",
  "coordinates":[[[-0.306607, 36.057603],[-0.132636, 35.758390]]]}},

  {"type":"Feature",
    "properties":{myColor: 'red'},
    "myColor" : "red",
    "geometry":{"type":"Polygon",
                "coordinates":[[[-0.831378,35.62070]]]}},

   {"type":"Feature",
    "properties":{myColor: 'lightred'},
    "myColor" : "lighred",
     "geometry":{"type":"Polygon",
                 "coordinates":[[[-0.605016, 35.282651]]]}},

{"type":"Feature",
  "properties":{myColor: 'orange'},
  "myColor" : "orange",
  "geometry":{"type":"Polygon",
              "coordinates":[[[-0.826182, 35.856544],[-0.784982, 35.757378]]]}},

{"type":"Feature",
  "properties":{myColor: 'lightorange'},
  "myColor" : "lightorange",
  "geometry":{"type":"Polygon",
              "coordinates":[[[-0.746426, 35.790545],[-0.707110, 35.508220]]]}},


{"type":"Feature",
  "properties":{myColor: 'purple'},
  "myColor" : "purple",
  "geometry":{"type":"Polygon",
              "coordinates":[[[-0.68333, 35.11871]]]}}

{"type":"Feature",
  "properties":{myColor: 'lightputple'},
  "myColor" : "lightpurple",
  "geometry":{"type":"Polygon",
                "coordinates":[[[-0.3666652, 35.2999988]]]}};




/* a function that will run when the page loads.  It creates the map
 and the initial marker.  If you want to create more markers, do it here. */
function initializeMap() {
    my_map_options = {
        center:  my_center, // to change this value, change my_center above
        zoom: 13,  // higher is closer-up
        mapTypeId: google.maps.MapTypeId.HYBRID // you can also use TERRAIN, STREETMAP, SATELLITE
    };

    // this one line creates the actual map
    my_map = new google.maps.Map(document.getElementById("map_canvas"),
                                 my_map_options);
    // this is an *array* that holds all the marker info
    var all_my_markers =
            [{position: new google.maps.LatLng(-0.840128, 35.546473),
              map: my_map,
              icon: blueURL,
              title: "first Marker",
              window_content: "<h3>Marker1: Maasai A Post-Contact</h3><p>Recent Maasai settlement at Melilo - second half of the century</p>"
             },
             {position: new google.maps.LatLng(-0.808099, 35.599194),
              map: my_map,
              icon: blueURL, 
              title: "second Marker",
              window_content: "<h3>Marker2: Maasai B Post-Contact</h3><p> and <a href='http://something'>this would</a>Recent Maasai settlement at Oleshepani - second half of the century</p>"
              },
              {position: new google.maps.LatLng(-0.306607, 36.057603),
               map: my_map,
               icon: lightblueURL,
               title: "third Marker",
               window_content: "<h3>Marker3: Maasai A at Contact</h3><p>Old Maasai settlement at Nakuru - first half of the century</p>"
              },
                {position: new google.maps.LatLng(-0.132636, 35.758390),
              map: my_map,
              icon: lightblueURL,
              title: "fourth Marker",
              window_content: "<h3>Marker4: Maasai B at Contact</h3><p>Old Maasai settlement at Baringo - first half of the century </p>"
                },
              {position: new google.maps.LatLng(-0.831378, 35.62070),
               map: my_map,
               icon: redURL,
               title: "fifth Marker",
               window_content: "<h3>Marker5: Kipsigis Post-Contact</h3><p>Recent Kipsigis settlement East of Amala Tributary (Mara River) at Nkaroni - second half of the century</p>"
              },
              {position: new google.maps.LatLng(-0.605016, 35.282651),
              map: my_map,
              icon: lightredURL,
              title: "sisxth Marker",
                window_content: "<h3>Marker6: Kipsigis at Contact</h3><p>Old Kipsigis settlement West of Amala Tributary (Mara River)- first half of the century</p>"
              },
              {position: new google.maps.LatLng(-0.826182, 35.856544),
               map: my_map,
               icon: orangeURL,
               title: "seventh Marker",
               window_content: "<h3>Marker7: Okiek A(Kaplelach) Post-Contact </h3><p>Recent Okiek settlement: Kaplelach tribe on Mau Escarpment forest edge - second half of the century</p>"
               },
               {position: new google.maps.LatLng(-0.784982, 35.757378),
                map: my_map,
                icon: orangeURL,
                title: "eigth Marker",
                window_content: "<h3>Marker8: Okiek B(Kipchorwonek) Post-Contact </h3><p>Recent Okiek settlement: Kipchorwonek tribe on Mau Escarpment forest edge - second half of the century</p>"
              },
              {position: new google.maps.LatLng(-0.746426, 35.790545),
               map: my_map,
               icon: lightorangeURL,
               title: "ninth Marker",
               window_content: "<h3>Marker9: Okiek A(Kaplelach) at Contact</h3><p>Old Okiek settlement 1 deep in Mau Forest - first half of the century</p>"
                 },
             {position: new google.maps.LatLng(-0.707110, 35.508220),
              map: my_map,
              icon: lightorangeURL,
              title: "tenth Marker",
              window_content: "<h3>Marker10: Okiek B(Kipchorwonek) at Contact </h3><p>Old Okiek settlement 2 deep in Mau Forest - first half of the century</p>"
            },
                {position: new google.maps.LatLng(-0.68333, 35.11871),
             map: my_map,
             icon: purpleURL,
             title: "eleventh Marker",
             window_content: "<h3>Marker11: British Settlment Post-Contact </h3><p>Recent British settlement at Sotik - second half of the century </p>"
           },
             {position: new google.maps.LatLng(-0.3666652, 35.2999988),
              map: my_map,
              icon: lightpurpleURL,
              title: "twelfth Marker",
              window_content: "<h3>Marker12: British Settlelment at Contact </h3><p>Old British settlement at Kericho - first half of the century</p>"
            },
            ];

    for (j = 0; j < all_my_markers.length; j++) {
        var marker =  new google.maps.Marker({
            position: all_my_markers[j].position,
            map: my_map,
            icon: all_my_markers[j].icon,
            title: all_my_markers[j].title,
            window_content: all_my_markers[j].window_content});

        // this next line is ugly, and you should change it to be prettier.
        // be careful not to introduce syntax errors though.
      legendHTML +=
        "<div class=\"pointer\" onclick=\"locateMarker(my_markers[" + j + "])\"> " +
          marker.window_content + "</div>";
        marker.info = new google.maps.InfoWindow({content: marker.window_content});
        var listener = google.maps.event.addListener(marker, 'click', function() {
            // if you want to allow multiple info windows, uncomment the next line
            // and comment out the two lines that follow it
            //this.info.open(this.map, this);
            infowindow.setContent (this.window_content);
            infowindow.open(my_map, this);
        });
        my_markers.push({marker:marker, listener:listener});
        if (all_my_markers[j].icon == blueURL ) {
            blue_markers.push({marker:marker, listener:listener});
        } else if (all_my_markers[j].icon == redURL ) {
            red_markers.push({marker:marker, listener:listener});
        }

    }
    document.getElementById("map_legend").innerHTML = legendHTML;
  my_map.data.addGeoJson(myGeoJSON);

  var romeCircle = new google.maps.Rectangle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    // in general, we always have to *set the map* when we
    // add features.
    map: my_map,
    bounds: {
      north: 42.685,
      south: 40.671,
      east: 12.501,
      west: 12.485
    },

    center: {"lat": 41.9000, "lng":12.5000},
    radius: 1000
  });
  my_map.data.setStyle(function (feature) {
    var thisColor = feature.getProperty("myColor");
    return {
      fillColor: thisColor,
      strokeColor: thisColor,
      strokeWeight: 5
    };

});
}

// this hides all markers in the array
// passed to it, by attaching them to
// an empty object (instead of a real map)
function hideMarkers (marker_array) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(null);
    }
}
// by contrast, this attaches all the markers to
// a real map object, so they reappear
function showMarkers (marker_array, map) {
    for (var j in marker_array) {
        marker_array[j].marker.setMap(map);
    }
}

//global variable to track state of markers

var markersHidden = false;

function toggleMarkers (marker_array, map) {
  for (var j in marker_array) {
    if (markersHidden) {
      marker_array[j].marker.setMap(map);
    } else {
      marker_array[j].marker.setMap(null);
    }
  }
  markersHidden = !markersHidden;
}


// I added this for fun.  It allows you to trigger the infowindow
// from outside the map.
function locateMarker (marker) {
    console.log(marker);
    my_map.panTo(marker.marker.position);
    google.maps.event.trigger(marker.marker, 'click');
}
