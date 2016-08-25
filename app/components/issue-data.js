/* Code for Papa Parse found at http://papaparse.com/ */

import Ember from 'ember';

export default Ember.Component.extend({
    initTable: function() {
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

        var entire_table = '';
        for (var i=0; i<csvFile.length; i++) {
            entire_table = entire_table + '<tr>';
            for (var j=0; j<csvFile[i].length; j++) {
                entire_table = entire_table + '<td>' + csvFile[i][j] + '</td>'
            }
            entire_table = entire_table + '</tr>';
        }
        document.getElementById('data-table').innerHTML = entire_table;
    }.on('didInsertElement')
});
