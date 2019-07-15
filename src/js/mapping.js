var markers = new Array();
db.collection("TestPotholeLocations").get().then((snapshot) => {
    snapshot.forEach(doc => {
        // array.push([doc.data()["latitude"], doc.data()["longitude"]]);
        var position = doc.data();

        position['lat'] = position['latitude'];
        position['lng'] = position['longitude'];
        delete position['latitude'];
        delete position['longitude'];

        markers.push(new google.maps.Marker({
            position: position,
            map: map
        }))
    });

})


var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: {
        lat: 0,
        lng: 0
    }
});

console.log(markers);

// Add a marker clusterer to manage the markers.
var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
});


function dummyarray() {
    return [{
        lat: 0,
        lng: 0
    }]
}