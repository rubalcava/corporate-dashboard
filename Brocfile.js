/* Found tutorial on integrating gmaps using broccoli at:
    http://blog.atmartin.io/google-maps-integration-ember-cli-edition/
    https://github.com/ATMartin/ember-cli-gmaps

    Papa Parser CSV parser found at http://papaparse.com/

    DataTables found at https://www.datatables.net/
*/

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

app.import('vendor/gcharts.js');
app.import('vendor/papaparse.js');
app.import('vendor/datatables.js');
app.import('vendor/datatablesresponsive.js');
app.import('vendor/datatablesscroller.js');

module.exports = app.toTree();
