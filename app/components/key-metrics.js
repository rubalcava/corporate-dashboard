/*
    Google charts code was found at https://developers.google.com/chart/interactive/docs/quick_start
*/

import Ember from 'ember';

export default Ember.Component.extend({
    insertOpenIssues: function() {
        function refreshNumberOfIssues() {
            Ember.$.ajax({
                url: 'open_issues/open_issues.json',
                dataType: 'json',
                success: function(response) {
                    document.getElementById('open-issues-div').innerHTML = '<p><strong>Open support issues:</strong> ' + response[0].issues + '</p>';
                },
                error: function(err) {
                    console.log(err);
                }
            });
            /* refresh every 5 seconds */
            setTimeout(refreshNumberOfIssues,5000);
        }
        refreshNumberOfIssues();
    }.on('didInsertElement'),

    insertPayingCustomers: function() {
        function refreshPayingCustomers() {
            Ember.$.ajax({
                url: 'paying_customers/paying_customers.json',
                dataType: 'json',
                async: false,
                success: function(response) {
                    /* organize data the way Visualization API needs */
                    var chart_data = [];
                    for (var i=0; i<response.length; i++) {
                        var temp_array = [];
                        temp_array.push(response[i].month);
                        temp_array.push(response[i].customers);
                        chart_data.push(temp_array);
                    }
                    /* end of organizing data */

                    /*
                    The following was moved to index.html because charts.load() can only be called once and switching back and forth between routes was re-calling it:

                    google.charts.load('current', {'packages':['corechart']}); */

                    /* Set a callback to run when the Google Visualization API is loaded. */
                    google.charts.setOnLoadCallback(drawChart);

                    /* Callback that creates and populates a data table,
                     instantiates the pie chart, passes in the data and
                     draws it. */
                    function drawChart() {

                        /* Create the data table. */
                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Month');
                        data.addColumn('number', 'Customers');
                        data.addRows(chart_data);

                        /* Set chart options */
                        var options = {'title':'Paying customers',
                                       'width':400,
                                       'height':300};

                        /* Instantiate and draw our chart, passing in some options. */
                        var chart = new google.visualization.LineChart(document.getElementById('paying-customers-div'));
                        chart.draw(data, options);
                      }
                },
                error: function(err) {
                    console.log(err);
                }
            });
            /* refresh every 5 seconds */
            setTimeout(refreshPayingCustomers,5000);
        }
        refreshPayingCustomers();
    }.on('didInsertElement'),

    insertReportedIssues: function() {
        function refreshReportedIssues() {
            Ember.$.ajax({
                url: 'reported_issues/reported_issues.json',
                dataType: 'json',
                success: function(response) {
                    /* organize data the way Visualization API needs */
                    var chart_data = [];
                    for (var i=0; i<response.length; i++) {
                        var temp_array = [];
                        temp_array.push(response[i].month);
                        temp_array.push(response[i].issues);
                        chart_data.push(temp_array);
                    }
                    /* end of organizing data */

                    /*
                    The following was moved to index.html because charts.load() can only be called once and switching back and forth between routes was re-calling it:

                    google.charts.load('current', {'packages':['corechart']}); */

                    /* Set a callback to run when the Google Visualization API is loaded. */
                    google.charts.setOnLoadCallback(drawChart);

                    /* Callback that creates and populates a data table,
                     instantiates the pie chart, passes in the data and
                     draws it. */
                    function drawChart() {

                        /* Create the data table. */
                        var data = new google.visualization.DataTable();
                        data.addColumn('string', 'Month');
                        data.addColumn('number', 'Issues');
                        data.addRows(chart_data);

                        /* Set chart options */
                        var options = {'title':'Reported Issues',
                                       'width':400,
                                       'height':300};

                        /* Instantiate and draw our chart, passing in some options. */
                        var chart = new google.visualization.LineChart(document.getElementById('reported-issues-div'));
                        chart.draw(data, options);
                      }
                },
                error: function(err) {
                    console.log(err);
                }
            });
            /* refresh every 5 seconds */
            setTimeout(refreshReportedIssues,5000);
        }
        refreshReportedIssues();
    }.on('didInsertElement')
});
