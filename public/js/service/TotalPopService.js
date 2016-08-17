var app = angular.module('myApp');
app.service("TotalPopService",['DBService','$q',function(DBService,$q){
    
    var requestTotalPop = function(){
          return $q(function(resolve, reject){
               var hailRawData=[];
               var stateCode=[];
               var mapData=[];
               var TotalPop=[];
               var code=[];
               var value=[];
               DBService.getHailRawData
                    .then(function(response){
                        hailRawData=response;
                        })
                    .then(function(){
                        DBService.getStateCode
                            .then(function(response){
                                stateCode=response;
                                var j=0;
                                var arr=[];
                                var newarr=[];
                                //get all the states from hailRawData and put the data in var arr;
                                for (var i = 0; i < hailRawData.length; i++) {
                                    if($.inArray(hailRawData[i]["State"],arr)<0){
                                        arr[j]=hailRawData[i]["State"];
                                        j++;
                                    };      
                                };
                            //according to $scope.stateCode data, append statecode to var arr, name newarr data;
                                arr.forEach(function(item){
                                    for(var i=0;i<stateCode.length;i++){
                                        if(item==stateCode[i].state){
                                            newarr.push({
                                                State:item,
                                                StateCode:stateCode[i].statecode
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
                                hailRawData.forEach(function(item,index){
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
                                for(var i=0;i<newarr.length;i++){
                                    var TotalPopAffected=0;
                                    for(var j=0;j<myData[i].length;j++){
                                       TotalPopAffected=TotalPopAffected+myData[i][j].PopulationAffected;
                                    };
                                    TotalPop.push({
                                        State:newarr[i].State,
                                        Code:newarr[i].StateCode,
                                        TotalPopulationAffected:TotalPopAffected});
                                    //console.log(TotalPop[i]);
                                     /* $http.post('/api/PopulationAffected',TotalPop[i])
                                                    .success(function(response){
                                                       $scope.pop=response;
                                                       console.log($scope.pop);
                                            });*/
                                    if(TotalPopAffected>0){
                                         mapData.push({"value":TotalPopAffected,"code":newarr[i].StateCode});
                                         code.push(newarr[i].StateCode);
                                         value.push(TotalPopAffected);
                                    };
                                };
                                //console.log(mapData);
                                var temp={
                                    getMapData:mapData,
                                    getTotalPop:TotalPop,
                                    getCode:code,
                                    getValue:value
                                };
                                if(temp) {
                                        resolve(temp);
                                    }
                                    else{
                                        reject('error');
                                    }
                        });
                   
                   
                    });
                   
            });
            
       };
    
    return {
		requestTotalPop: requestTotalPop
	    
	};
}]);