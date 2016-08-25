/* Found tutorial on integrating gmaps using broccoli at:
    http://blog.atmartin.io/google-maps-integration-ember-cli-edition/
    https://github.com/ATMartin/ember-cli-gmaps

    Papa Parser CSV parser found at http://papaparse.com/
*/

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/gmaps.js');
app.import('vendor/gcharts.js');
app.import('vendor/papaparse.js');

module.exports = app.toTree();
