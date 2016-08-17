var app = angular.module('myApp');
app.service('DBService', function($http,$q){
    var getRawData = function(request){
        var handleSuccess = function(response){
			if (angular.isObject(response.data)) {
				return response.data;
			} else {
				return ($q.reject("System Error Occured."));
			}
		};

        var handleError = function(response){

			if (!angular.isObject(response.data)  || !angular.isObject(response.Error)) {
				return $q.reject("Unkown Error.");
			}

			return $q.reject(response.error);
		};


		var promise = request.then(
			handleSuccess, 
			handleError
			);
      return promise;

  };
    var getHailRawDataRequest = $http({
			url:  '/api/weather',
			method: 'GET',
            cache:true
			});
    var getClaimRawDataRequest =$http({
			url:  '/api/websites',
			method: 'GET',
            cache:true
			});
    var getStateCodeRequest =$http({
			url:  '/api/state',
			method: 'GET',
            cache:true
			});
    var getHailRawData=getRawData(getHailRawDataRequest);
    var getClaimRawData=getRawData(getClaimRawDataRequest);
    var getStateCode=getRawData(getStateCodeRequest);
    
  return {
    getHailRawData: getHailRawData,  
    getClaimRawData:getClaimRawData,
    getStateCode:getStateCode
  };
});