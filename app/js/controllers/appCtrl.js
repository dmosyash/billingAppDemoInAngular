'use strict';

app.controller('appCtrl', function($scope, $location, $http, $window) {
	$scope.admin = false;
	$scope.city = [];
	var method = 'GET';
  	var url = 'api/getSess.php';
  	$http({ method: method,url: url,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		 }).
	success(function(response) 
	{
		if(response.length > 2) {
			$scope.admin = response[2];
			$scope.city.id = response[1];
			var json = JSON.parse(response[0]);
			for(var i=0;i<json.length;i++) {
					console.log(json[i].cname," ",$scope.city.id);
				if(json[i].id == response[1]) {
					$scope.city.name = json[i].cname;
					break;
				}
			}
		}
		if(response.length == 2) {
			$scope.city.id = response[0];
		}
	}).
	error(function(response) 
	{	
		console.log(response);
	});

	$scope.logout = function() {
		var method = 'GET';
	  	var url = 'api/logout.php';
	  	$http({ method: method,url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			 }).
		success(function(response) 
		{
			console.log("LoggedOut Successfully");
			$window.location.reload();
		}).
		error(function(response) 
		{	
			console.log(response);
		});
	}
});