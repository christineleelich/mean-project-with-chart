var app = angular.module('myApp',[
    'ui.router',
    'ui.grid'
    
    
   ]);
/*app.filter('reverse',[function(){
    return function(string){
        return string.split('').reverse().join('');
    
    };

}]);*/

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider
    .when('/',['$state', function($state){
		$state.go("home");
	}])
        .otherwise("/");
    
	$stateProvider
		
		.state('home',{
           //it is very important to refer views
            views:{
                'home':{
                    url:'/',
                    templateUrl:"views/home.html",
                    controller:"HomeController"
                }
        
            }
        })

		.state("home.HailRawData", {
			parent:'home',
            url:'/HailRawData',
			templateUrl: "views/HailRawData.html",
			controller: "HailRawDataController"
		})
        .state("home.ClaimRawData", {
			parent:'home',
            url:'/ClaimRawData',
			templateUrl: "views/ClaimRawData.html",
			controller: "ClaimRawDataController"
		})
        .state("home.PopulationAffectedA", {
			parent:'home',
            url:'/PopulationAffectedA',
			templateUrl: "views/PopulationAffectedA.html",
			controller: "PopulationAffectedController"
		})
	   .state("home.PopulationAffectedB", {
			parent:'home',
            url:'/PopulationAffectedB',
			templateUrl: "views/PopulationAffectedB.html",
			controller: "PopulationAffectedController"
		})
         .state("home.AverageClaim", {
			parent:'home',
            url:'/AverageClaim',
			templateUrl: "views/AverageClaim.html",
			controller: "ClaimRawDataController"
		})
        .state("home.Relation", {
			parent:'home',
            url:'/Relation',
			templateUrl: "views/relation.html",
			controller: "RelationController"
		})
        



}]);
//app.controller('masterController', []);
//app.controller('hailRawDataController', []);
//app.controller('homeController', []);

/*app.controller('myCtrl',function($scope,$http){
    
    $http.get('/api/websites')
    .success(function(response){
        $scope.websites = response;
    });
    $scope.remove=function(id){
        $http.delete('/api/websites/'+id)
        .success(function(response){
            $scope.websites=response;
        });
    };
    $scope.add=function(site){
        $http.post('/api/websites',site)
        .success(function(response){
             $scope.websites=response;
        });
    };
    $http.get('/rest/developer')
    .success(function(response){
        $scope.developers = response;
    });
    $scope.remove = function(index){
        $http.delete('/rest/developer/'+index)
        .success(function(response){
            $scope.developers =response;
        });
    };
    $scope.add =function(dev){
        $http.post('/rest/developer',dev)
        .success(function(response){
            $scope.developers=response;
        });
    };
    $scope.select =function(index){
        
        $scope.applications=$scope.developers[index].apps;
    }
});*/