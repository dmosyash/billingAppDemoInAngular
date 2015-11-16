'use strict';

/* Controllers */

app.controller('productListCtrl', ['$scope','$http','$location','productService', function($scope,$http,$location,productService) 
{
	productService.getAll(function() {
		$scope.productCollection = productService.productCollection;
	});

	$scope.editItem = function(index) {
		productService.single_product = $scope.productCollection[index];
		console.log(productService.single_product)
    	var item_id = $scope.productCollection[index].id;
	    $location.path("product/update").search({id:item_id});
	}

	$scope.removeItem = function(index) {
		productService.single_product = $scope.productCollection[index];
    	var item_id = $scope.productCollection[index].id;
		$scope.productCollection.splice(index,1);
    	productService.removeProduct(item_id);
	}
}]);