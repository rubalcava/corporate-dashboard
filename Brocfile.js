/* Found tutorial on integrating gmaps using broccoli at:
    http://blog.atmartin.io/google-maps-integration-ember-cli-edition/
    https://github.com/ATMartin/ember-cli-gmaps

    Papa Parser CSV parser found at http://papaparse.com/

    Listjs found at http://www.listjs.com/examples/table
*/

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

/* This stopped working, so moving api call to index.html */
/*app.import('vendor/gmaps.js');*/
app.import('vendor/gcharts.js');
app.import('vendor/papaparse.js');
app.import('vendor/list.js');

module.exports = app.toTree();
