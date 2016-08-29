/* Found tutorial on integrating gmaps using broccoli at:
    http://blog.atmartin.io/google-maps-integration-ember-cli-edition/
    https://github.com/ATMartin/ember-cli-gmaps
*/

import Ember from 'ember';

export default Ember.Component.extend({
  insertMap: function() {
      function redrawMap(self) {
          var container = self.$('.map-canvas')[0];
          var options = {
            center: new window.google.maps.LatLng(
              self.get('latitude'),
              self.get('longitude')
            ),
            zoom: 3
          };

          var myMap = new window.google.maps.Map(container, options);

          /* Pull data for markers */

          var locations;
          var markers = [];

          Ember.$.ajax({
              url: 'locations/locations.json',
              dataType: 'json',
              async: false,
              success: function(response) {
                  locations = response;
              },
              error: function(err) {
                  console.log(err);
                  alert('Error loading office location data');
              }
          });

          /* End of marker ajax call */

          /* define function map marker click listener*/

          function popInfoWindow(index, marker) {
              marker.addListener('click', function() {
                  fillInfoWindow(this, myInfoWindow, locations[index]);
              });
          }

          /* end function marker click listener*/

          /* define function to fill infowindow */

          function fillInfoWindow(marker, infowindow, locationObject) {
              if (infowindow.marker !== marker) {
                  infowindow.marker = marker;
                  // Make sure the marker is cleared when the infowindow is closed.
                  infowindow.addListener('closeclick', function() {
                      infowindow.marker = null;
                  });
                  infowindow.setContent('<div>' + locationObject.city + '</div>' + '<div>' + locationObject.type + '</div>' +
                      '<div>Employees: ' + locationObject.employees + '</div>');
                  if (infowindow.marker.getAnimation() !== null) {
                      infowindow.marker.setAnimation(null);
                  } else {
                      infowindow.marker.setAnimation(google.maps.Animation.BOUNCE);
                      var stopBouncing = function() {
                          infowindow.marker.setAnimation(null);
                      };
                      setTimeout(stopBouncing, 600);
                  }
                  infowindow.open(myMap, marker);
              }
          }

          /* end fill infowindow function */

          /* begin marker creation */

          for (var i=0; i<locations.length; i++) {
              var title = locations[i].city;
              var position = locations[i].coordinates;

              var marker = new google.maps.Marker({
                  position: position,
                  title: title,
                  animation: google.maps.Animation.DROP,
                  id: i
              });

              var myInfoWindow = new google.maps.InfoWindow();
              popInfoWindow(i, marker);
              //fillInfoWindow(marker, myInfoWindow, locations[i]);

              markers.push(marker);
          }

          /* end marker creation */

          /* begin map bounds creation */
          var bounds = new google.maps.LatLngBounds();
          for (var k = 0; k < markers.length; k++) {
              markers[k].setMap(myMap);
              bounds.extend(markers[k].position);
          }
          myMap.fitBounds(bounds);
          /* end map bounds work */
      }
      redrawMap(this);
    }.on('didInsertElement')
});
