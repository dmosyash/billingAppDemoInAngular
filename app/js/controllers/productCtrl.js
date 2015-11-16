'use strict';

/* Controllers */

app.controller('productCtrl', ['$scope','$http','$location','productService', function($scope,$http,$location,productService) 
{	/*Add/Edit product*/
	$scope.title="Add";
	$scope.item = {};
	$scope.item.name = "";
	$scope.param_id = $location.search();
	if($scope.param_id.id!=null)
	{
		$scope.title="Update";
		$scope.item_id = productService.single_product.id;
		$scope.item.name = productService.single_product.pname;
		$scope.item.rate = parseInt(productService.single_product.prate);
	}	
	
	/*Add Item*/
	var method = 'POST';
  	var url = 'api/product.php';
    $scope.authError = "";
  	$scope.Add = function() 
	{
		var FormData = 
		{
			'action':'add',
     		'pname':$scope.item.name,
     		'prate':$scope.item.rate,
    	};
    	$http({ method: method,url: url,data: FormData,
      			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     		 }).
    		success(function(response) 
			{
				console.log(response);
        		$scope.form.$setPristine();
				$scope.item="";
			}).
    		error(function(response) 
			{
				$scope.authError = response;
        		$scope.codeStatus = response || "Request failed";	
			});
		return false;
	};
	
	/*Update Item*/
		$scope.Update = function() 
		{
			var FormData = 
			{
				'action':'update',
				'pid':$scope.item_id,
	     		'pname':$scope.item.name,
	     		'prate':$scope.item.rate,
	    	};
    		$http({ method: method,url: url,data: FormData,
      			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     		 }).
    		success(function(response) 
			{
        		$scope.param_id=null;
				$location.path("/app/invoice");
				$scope.title="Add";
			}).
    		error(function(response) 
			{
        		$scope.codeStatus = response || "Request failed";	
			});
		return false;
	};
	
}]);

