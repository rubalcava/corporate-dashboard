/* Code for Papa Parse found at http://papaparse.com/ */
import Ember from 'ember';

export default Ember.Component.extend({
    runAll: null,
    csvData: null,
    tableHeader: ['Submit Time', 'Cust Name', 'Cust Email', 'Description', 'Open/Closed', 'Closed Time', 'Employee Assigned'],
    responsiveTable: null,
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
                        _component.set('header', _component.tableHeader);
                        if (_component.responsiveTable !== null) {
                            _component.responsiveTable.clear();
                            _component.responsiveTable.rows.add(csvFile);
                            _component.responsiveTable.draw();
                        }
                    }
                });
            },
            error: function(err) {
                console.log(err);
            }
        });

    }.on('didInsertElement'),

    didInsertElement() {
        this.runAll = Ember.run.later(this, function() {
            this.initTable();
            this.runAll = Ember.run.later(this, this.runAll, 10000);
        }, 10000);
    },

    didUpdate() {
        var self = this;
        Ember.$(document).ready(function() {
            self.responsiveTable = Ember.$('#data-table').DataTable({
                destroy: true,
                responsive: false,
                scrollX: 200,
                deferRender: true,
                scroller: true
            });
        });
    },

    didDestroyElement() {
        Ember.run.cancel(this.runAll);
    }
});