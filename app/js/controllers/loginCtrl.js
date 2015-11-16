'use strict';

app.controller('loginCtrl', function($scope, $http, $location, $window) {
	$scope.init = function() {
		var method = 'GET';
	  	var url = 'api/getSess.php';
	  	$http({ method: method,url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			 }).
		success(function(response) 
		{
			if(response.length >= 2) {
				$location.path("/invoice");
			}
		}).
		error(function(response) 
		{	
			console.log(response);
		});
	}
	$scope.init();

	$scope.login = function(user) {
		var method = 'POST';
	  	var url = 'api/login.php';
	    $scope.authError = "";
		var FormData = 
		{
			'action':'login',
     		'uemail':$scope.user.email,
     		'upass':$scope.user.password
    	};
    	$http({ method: method,url: url,data: FormData,
      			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     		 }).
    		success(function(response) 
			{
				if(response.length == 0) {
					$scope.authError = "Invalid Username/Password";
				}
				else {
					$window.location.reload();
				}
			}).
    		error(function(response) 
			{
				$scope.authError = response;
        		$scope.codeStatus = response || "Request failed";	
			});
    }
});