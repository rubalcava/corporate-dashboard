/* Code for Papa Parse found at http://papaparse.com/ */

import Ember from 'ember';

export default Ember.Component.extend({
    runAll: null,
    csvData: null,
    initTable: function() {
            var _component = this;
            var csvFile;
            Ember.$.ajax({
                url: 'open_issues_data/open_issues_data.csv',
                dataType: 'text',
                async: false,
                success: function(response) {
                    csvFile = response;

                    Papa.parse(csvFile, {
                        complete: function(results) {
                            csvFile = results.data;

                            this.csvData = csvFile;
                            _component.set('issues', this.csvData);
                        }
                    });
                },
                error: function(err) {
                    console.log(err);
                }
            });

            /* TODO uncomment when table figured out
            var options = {
                valueNames: ["issue_number", "customer_id", "date_reported", "location"]
            };

            var myList = new List("table-div", options);
            */
    }.on('didInsertElement'),

    didInsertElement() {
        this.runAll = Ember.run.later(this, function() {
            this.initTable();
            this.runAll = Ember.run.later(this, this.runAll, 5000);
        }, 5000);
    },

    didDestroyElement() {
        Ember.run.cancel(this.runAll);
    }
});
