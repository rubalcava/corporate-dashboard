/* Code for Papa Parse found at http://papaparse.com/ */

import Ember from 'ember';

export default Ember.Component.extend({
    initTable: function() {
        function buildTable() {
            var csvFile;
            Ember.$.ajax({
                url: 'open_issues_data/open_issues_data.csv',
                dataType: 'text',
                async: false,
                success: function(response) {
                    csvFile = response;
                },
                error: function(err) {
                    console.log(err);
                }
            });

            Papa.parse(csvFile, {
                complete: function(results) {
                    csvFile = results.data;
                }
            });
            var title_row = '';
            var entire_table = '';
            for (var i=0; i<csvFile.length; i++) {
                entire_table = entire_table + '<tr>';
                /* don't want to add listjs classes to first row*/
                if (i!== 0) {
                    for (var j=0; j<csvFile[i].length; j++) {
                        if (j === 0) {
                            entire_table = entire_table + '<td class="issue_number">' + csvFile[i][j] + '</td>';
                        }
                        else if (j === 1) {
                            entire_table = entire_table + '<td class="customer_id">' + csvFile[i][j] + '</td>';
                        }
                        else if (j === 2) {
                            entire_table = entire_table + '<td class="date_reported">' + csvFile[i][j] + '</td>';
                        }
                        else {
                            entire_table = entire_table + '<td class="location">' + csvFile[i][j] + '</td>';
                        }
                    }
                }
                /* first row only */
                else {
                    for (var k=0; k<csvFile[i].length; k++) {
                        title_row = title_row + '<td><strong>' + csvFile[i][k] + '</strong></td>';
                    }
                }
                entire_table = entire_table + '</tr>';
            }
            document.getElementById('table-titles-row').innerHTML = title_row;
            document.getElementById('table-body').innerHTML = entire_table;

            var options = {
                valueNames: ["issue_number", "customer_id", "date_reported", "location"]
            };

            var myList = new List("table-div", options);
        }
        buildTable();
    }.on('didInsertElement')
});
