function addLatLong(positionArray) {

    db.collection("TestPotholeLocations").add({
            latitude: positionArray[0],
            longitude: positionArray[1]
        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}


var watchID;
var geoLoc;
var oldLatitude
var oldLongitude

function getLocation() {
    console.log(oldLatitude + ", " + oldLongitude);
    return [oldLatitude, oldLongitude];
}

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    // alert("Latitude : " + latitude + " Longitude: " + longitude);
    oldLatitude = latitude;
    oldLongitude = longitude;
}

function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied! Maybe location services is disabled?");
    } else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getLocationUpdate(){

    if(navigator.geolocation){
        
        // timeout at 60000 milliseconds (60 seconds)
        var options = {timeout:60000};
        geoLoc = navigator.geolocation;
        watchID = geoLoc.watchPosition(showLocation, errorHandler, options);
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}

var lastPotholeTime = new Date().getTime();

// Detect movement
var oldZ = 9.8
var potholeCounter = 0

if (window.DeviceMotionEvent != undefined) {
	window.ondevicemotion = function(e) {
        var newZ = Math.abs(e.accelerationIncludingGravity.z);
		if ((newZ - oldZ) > 7) {
            console.log(newZ);
            console.log(getLocation());

            // Only report every 10 seconds
            currentTime = new Date().getTime()
            if ((currentTime - lastPotholeTime) > 10000){
                console.log("current time", new Date().getTime(), "old time", lastPotholeTime)
                addLatLong(getLocation());
                potholeCounter ++;
                document.getElementById("potholeCounter").innerHTML = potholeCounter;
                lastPotholeTime = new Date().getTime();
                

            }
            
		}
		oldZ = newZ;
		
	}
}