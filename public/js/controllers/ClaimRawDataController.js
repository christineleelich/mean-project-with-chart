"use strict";
var app = angular.module("myApp");
app.controller('ClaimRawDataController',['$scope','$filter','ChartFactory','DBService','ClaimRawDataService',function($scope,$filter,ChartFactory,DBService,ClaimRawDataService){
    ClaimRawDataService.requestClaimData()
        .then(function(temp){
            var ClaimRawData=[];
            var CriteriaData={"State":[],"Education":[],"ClaimAmount":[],"MaritalStatus":[],"EmploymentStatus":[],"Gender":[]};
            var Catagories;
            var code=[];
            var data=[];
            var AveClaim=[];
            ClaimRawData=temp.getClaimRawData;
            Catagories=temp.getCatagories;
            CriteriaData=temp.getCriteriaData;
            code=temp.getCode;
            data=temp.getData;
            AveClaim=temp.getAveClaim;
            $scope.ClaimRawData = ClaimRawData;  
            $scope.Catagories=Catagories;
            $scope.CriteraData = CriteriaData;
            console.log($scope.CriteraData);
            $scope.AveClaim=AveClaim;
            console.log($scope.AveClaim);
            console.log(AveClaim);
            ChartFactory.DrawAverageClaimChart($('#average-claim-chart'),code,data);
            $scope.onCatagoryChange = function(item){
                console.log($scope.CriteraData);
                $scope.curDropdownData=$scope.CriteraData[item.key];
                console.log($scope.curDropdownData);
                $scope.criteriaControl.setItem(-1);
                $scope.isClaimAmount = (item.key ==='ClaimAmount');

            };
    
            $scope.onSearch = function(){
                var a=[];
                if(!$scope.isClaimAmount){
                    console.log(ClaimRawData);
                    console.log($scope.criteriaControl.getSelectedItem().desc);
                    var cri=$scope.criteriaControl.getSelectedItem().desc;
                    $scope.ClaimRawData = $filter('filter')(ClaimRawData,cri);

                }
                else{
                    ClaimRawData.forEach(function(item,index){

                        if((item.ClaimAmount>=$scope.downValue)&&(item.ClaimAmount<=$scope.upValue)){
                                    a.push(item);
                                };
                        });
                        $scope.ClaimRawData = a;

                };
    
            };
    });
   
}]);
      
   
