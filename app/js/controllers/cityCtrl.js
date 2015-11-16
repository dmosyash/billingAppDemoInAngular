'use strict';

app.controller('cityCtrl', function($scope, $http, $window) {
	$scope.cities = [];
	var method = 'GET';
  	var url = 'api/cityList.php';
  	$http({ method: method,url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		 }).
	success(function(response) 
	{
		$scope.cities = response;
		$scope.selected = $scope.cities[0];
		console.log($scope.cities);
	}).
	error(function(response) 
	{	
		console.log(response);
	});

	$scope.select = function(value) {
		var method = 'POST';
	  	var url = 'api/setSession.php';
	  	var FormData = 
		{
     		'city':value
    	};
	  	$http({ method: method,url: url,data: FormData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			 }).
		success(function(response) 
		{	
			$window.location.reload();
		}).
		error(function(response) 
		{	
			console.log(response);
		});
	}
});