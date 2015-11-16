'use strict';

app.factory("productService",function($http) {
	var obj = {};
	obj.productCollection = ['uu'];
	obj.single_product = [];
	obj.getAll = function(callback) {
		var method = 'GET';
	  	var url = 'api/productList.php';
	  	$http({ method: method,url: url,
  			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 		 }).
		success(function(response) 
		{
			obj.productCollection = response;
			callback();
		}).
		error(function(response) 
		{	
			productCollection = response;
		});
	};
	obj.removeProduct = function(item_id) {
		var method = 'POST';
	  	var url = 'api/product.php';
	  	var FormData = 
			{
				'action':'delete',
				'pid':item_id,
    	};
		$http({ method: method,url: url,data: FormData,
  			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 		 }).
		success(function(response) 
		{
			console.log("row deleted")
		}).
		error(function(response) 
		{	
			console.log(response);
		});
	}
	return obj;
});