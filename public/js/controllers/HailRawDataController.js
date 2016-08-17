var app = angular.module('myApp');
app.controller('HailRawDataController',function($scope,$http,$filter,DBService){ 
    //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    var hailRawData=[];
    DBService.getHailRawData.then(function(response){
        response.forEach( function( item,index ) {
                    hailRawData.push({
                        "No": index + 1, 
                        "Date": new Date(item.Data).toISOString().slice(0, 10),
                        "State": item.State,
                        "HailSize": item["Hail Size"],
                        "PopulationAffected": item["Population Affected"]
                    });	
                    //console.log(hailRawData[index]);
                   
    
            });
        
       // var parameter = JSON.parse(JSON.stringify({"No":100,"State":"aa","PopulationAffected":34}));
    // console.log(parameter);
    /* $http.post('/api/newweather',hailRawData[0])
                            .success(function(response){
                                $scope.NewWeather=response;
                                console.log($scope.NewWeather);
                               })
                            .error(function(){
                                alert("error!!");
                                })
       
         
    });*/
    /*$http.get('/api/weather')
        .success(function(response){
                response.forEach( function( item,index ) {
                    hailRawData.push({
                        "No": index + 1, 
                        "Date": new Date(item.Data).toISOString().slice(0, 10),
                        "State": item.State,
                        "Hail Size": item["Hail Size"],
                        "Population Affected": item["Population Affected"]
                    });	
    
            });
        $scope.hailRawData=hailRawData;
    });*/
    $scope.hailRawData=hailRawData;
    $scope.title="this is for test";
    //console.log(hailRawData);
    //console.log($scope.hailRawData);
    $scope.refreshData = function() {
        //console.log(hailRawData);
  		$scope.hailRawData = $filter('filter')(hailRawData, $scope.searchContent);
	};
    
                                                                                    

}) ;
    
});






   


   

