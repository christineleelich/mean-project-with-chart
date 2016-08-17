var app = angular.module("myApp");
app.controller('RelationController',['$scope','ChartFactory','ClaimRawDataService','TotalPopService','$filter',function($scope,ChartFactory,ClaimRawDataService,TotalPopService,$filter){

    TotalPopService.requestTotalPop()
        .then(function(temp){
            var TotalPop= temp.getTotalPop;
            ClaimRawDataService.requestClaimData()
                .then(function(temp){
                var AveClaim=temp.getAveClaim;
                var data=[];
                AveClaim.forEach(function(item){
                    var newTotalPop=TotalPop;
                    var temp=[];
                    temp= $filter('filter')(newTotalPop,item.Code );
                    data.push({
                        State:item.State,
                        Code:item.Code,
                        TotalPopulationAffected:temp[0].TotalPopulationAffected,
                        AveClaim:item.AveClaim
                    });
                    
                });
                console.log(data);
                $scope.relation = data;
                ChartFactory.DrawRelationChart($('#relation'),data);
            });
    
        })
    
}]);