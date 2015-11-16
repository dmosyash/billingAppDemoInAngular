'use strict';

app.controller('receiptCtrl', function($scope, salesDetailService) {
	$scope.changeFormat = function(date) {
		var dd = date.getDate();
		var mm = parseInt(date.getMonth())+1;
		var yy = date.getFullYear();
		return dd+"/"+mm+"/"+yy;
	}

	$scope.init = function() {
		$scope.invoice = [];
		$scope.particulars = [];
		var details = salesDetailService.details;
		$scope.invoice.no = details.bill_no;
		$scope.invoice.real_date = $scope.changeFormat(details.bdate);
		$scope.particulars = details.particulars;
		$scope.invoice.subtotal = details.subtotal;
		$scope.invoice.extra = details.extra;
		//$scope.invoice.tax = parseInt($scope.invoice.subtotal) * (.145);
		//$scope.invoice.tax = parseFloat($scope.invoice.tax).toFixed(2);
		$scope.invoice.total = details.total;
	}
	$scope.init();
});