var autocomplete, map, marker;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById("map"), {
          center: center,
          scrollwheel: false,
          zoom: 12
        });

        var input = document.getElementById("search");
        autocomplete = new google.maps.places.Autocomplete(input);
      },
      function() {
        document.getElementById("map").innerHTML =
          "Error in the geolocation service.";
      }
    );
  } else {
    document.getElementById("map").innerHTML =
      "Browser does not support geolocation.";
  }
}

$(document).ready(function() {
  $("#btn-search").on("click", function(event) {
    event.preventDefault();
    loadGoogleInfo();
  });
});

var loadGoogleInfo = function() {
  // Clear markers if they are setted
  if (marker) {
    marker.setMap(null);
  }

  // Center the map
  var place = autocomplete.getPlace();
  map.setCenter({
    lat: place.geometry.location.lat(),
    lng: place.geometry.location.lng()
  });

  // Create the new marker
  marker = new google.maps.Marker({
    position: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    },
    map: map,
    title: place.name
  });

  // Set farm information
  $("#farm-info").removeClass("hidden");
  $("#farm-info")
    .find(".js-farm-name")
    .html(place.name);
  loadFarmInfo(place.name);
};

var loadFarmInfo = function(name) {
  $.ajax({
    url: "/farm",
    method: "POST",
    data: { name: name },
    dataType: "json",
    complete: function(result) {
      // $("#farm-info")
      //   .find(".flags")
      //   .find("button")
      //   .removeClass("selected");
      if (result.status === 200) {
        var farm = JSON.parse(result.responseText);

        // var color = farm.flag;
        var date = farm.date;

        // $("#farm-info")
        //   .find(".flags")
        //   .find("[data-color='" + color + "']")
        //   .addClass("selected");
        $("#farm-info")
          .find(".date-container")
          .find(".js-date")
          .html(date);
      }
    }
  });
};
