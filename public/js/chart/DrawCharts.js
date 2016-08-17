"use strict";

var app = angular.module('myApp');
app.factory('ChartFactory',function(USMapData){
	
	return {
	   drawStateAffected: function (selector, data){

          selector.highcharts('Map', {
            chart : {
                borderWidth : 1
            },

            title : {
                text : 'Population Affected Since Hail Whether in the Period of ......'
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 1,
                type: 'logarithmic',
                minColor: '#EEEEFF',
                maxColor: '#000022',
                stops: [
                    [0, '#EFEFFF'],
                    [0.67, '#4444FF'],
                    [1, '#000022']
                ]
            },

            series : [{
                animation: {
                    duration: 1000
                },
                data : data,
                mapData: USMapData,
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.code}'
                },
                name: 'Population Affected',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}'
                }
            }]
        });		
	},

	DrawPopulationAffected: function(selector,code,value){
	    selector.highcharts({
	        title: {
	            text: 'Total State Population of Affected by Hail in 2014',
	            x: -20 //center
	        },
	        subtitle: {
	            text: '',
	            x: -20
	        },
	        xAxis: {
	            categories: code
	        },
	        yAxis: {
	            title: {
	                text: 'State Population of Affected by Hail in 2014'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: ' people'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Affected Population',
	            data: value
	        }]
	    });
	},


	DrawAverageClaimChart: function(selector,code,data) {
    	selector.highcharts({
	        chart: {
            type: 'column'
        },
        title: {
            text: 'Average Claim'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: code,
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Average Claim ($)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Average Claim: <b>{point.y:.2f} $</b>'
        },
        series: [{
            name: 'State',
            data: data, 
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
     });
    },

    
	DrawRelationChart: function(selector,data) {
    	selector.highcharts({
	      chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'Correlation Analysis Between Insurance Claim Data and Hail Data in 2014'
        },
        
        xAxis: {
            title: {
                enabled: true,
                text: 'Total Affected Population by Hail 2014'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Average Insurance Claim Amount ($)'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 700,
            y: 200,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}, {point.y}'
                }
            }
        },
        series: [{
            name: 'KS',
            color: 'black',
            data: [[data[0].TotalPopulationAffected,data[0].AveClaim]]

        },
            {
            name: 'NE',
            color: 'green',
            data: [[data[1].TotalPopulationAffected,data[1].AveClaim]]

        },
            {
            name: 'OK',
            color: 'yellow',
            data: [[data[2].TotalPopulationAffected,data[2].AveClaim]]

        },
            {
            name: 'MO',
            color: 'blue',
            data: [[data[3].TotalPopulationAffected,data[3].AveClaim]]

        },
            {
            name: 'IA',
            color: 'rgba(223, 83, 83, .5)',
            data: [[data[4].TotalPopulationAffected,data[4].AveClaim]]

        }

        ]

    
	});  //for return 
  }
};
});
