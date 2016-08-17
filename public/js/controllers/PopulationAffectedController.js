var app = angular.module('myApp');
app.controller('PopulationAffectedController',function($scope,DBService,ChartFactory,TotalPopService){
   /* var code=[];
    var value=[];
    var mapData=[];*/
    TotalPopService.requestTotalPop()
        .then(function(temp){
            $scope.TotalPop=temp.getTotalPop;
            var mapData=temp.getMapData;
            var code=temp.getCode;
            var value=temp.getValue;
            ChartFactory.drawStateAffected($('#mapContainer'), mapData);
            ChartFactory.DrawPopulationAffected($('#hail'),code,value);
    });
   });    
  
    
    
        
    
   
    /*DBService.getHailRawData(function(response){
        $scope.hailRawData=response;
        callback();
    });
    DBService.getStateCode(function(response){
        $scope.stateCode=response;
        callback();
    });
    var callback=function(){
        
        if($scope.hailRawData&&$scope.stateCode){
            var j=0;
            var arr=[];
            var newarr=[];
            //get all the states from hailRawData and put the data in var arr;
            for (var i = 0; i < $scope.hailRawData.length; i++) {
            if($.inArray($scope.hailRawData[i]["State"],arr)<0){
                        arr[j]=$scope.hailRawData[i]["State"];
                        j++;
                };      
                    
            };
            //according to $scope.stateCode data, append statecode to var arr, name newarr data;
            arr.forEach(function(item){
                for(var i=0;i<$scope.stateCode.length;i++){
                    if(item==$scope.stateCode[i].state){
                        newarr.push({
                            State:item,
                            StateCode:$scope.stateCode[i].statecode
                        });
                    };
                };
            });
            //put each state affectedpopulation to myData,each element of myData repesent a unique state(like myData[k])
            var myData=[];
            for(var i=0;i<newarr.length;i++){
                myData[i]=[];
            }
            var k=0;
            $scope.hailRawData.forEach(function(item,index){
                for(k=0;k<newarr.length;k++){
                    if(item.State==newarr[k].State){
                       (myData[k]).push({
                            "State": item.State,
                            "code":newarr[k].StateCode,
                            "PopulationAffected": item["Population Affected"]
                       });
                    
                        
                    };
                };
            });
            //calculate each state total affected population to var TotalPopAffected
            var TotalPop=[];
            var mapData=[];
            for(var i=0;i<newarr.length;i++){
               
                var TotalPopAffected=0;
                for(var j=0;j<myData[i].length;j++){
                   TotalPopAffected=TotalPopAffected+myData[i][j].PopulationAffected;
               };
                TotalPop.push({
                    State:newarr[i].State,
                    Code:newarr[i].StateCode,
                    TotalPopulationAffected:TotalPopAffected});
                console.log(TotalPop[i]);
                 /* $http.post('/api/PopulationAffected',TotalPop[i])
                                .success(function(response){
                                   $scope.pop=response;
                                   console.log($scope.pop);
                        });*/
            /*    if(TotalPopAffected>0){
                     mapData.push({"value":TotalPopAffected,"code":newarr[i].StateCode});
                };
            };
          */
           /* $http.post('/api/PopulationAffected',{State: "Wyoming", Code: "WY", TotalPopulationAffected: 10152})
                                .success(function(response){
                                   $scope.pop=response;
                                   console.log($scope.pop);
                        });*/
           /* for(var i=0;i<TotalPop.length;i++){
                          console.log(TotalPop[i]);
                          $http.post('/api/PopulationAffected',TotalPop[i])
                                .success(function(response){
                                   $scope.pop=response;
                                   console.log($scope.pop);
                        });
                      };*/
            
           /* ChartFactory.drawStateAffected($('#mapContainer'), mapData);
            //another way to draw chart for population affecte analysis
            var code=[];
            var value=[];
            $Scope.TotalPop.forEach(function(item){
               code.push(item.Code);
               value.push(item.TotalPopulationAffected);
            });
            ChartFactory.DrawPopulationAffected($('#hail'),code,value);
	   */


           
       
       /* };
      
    });*/
   
