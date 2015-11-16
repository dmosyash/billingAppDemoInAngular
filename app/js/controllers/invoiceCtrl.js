'use strict';

/* Controllers */

app.controller('invoiceCtrl', ['$scope','$http','$location','productService','salesDetailService', function($scope,$http,$location,productService,salesDetailService) 
{	
	$scope.taxChange = function() {
		/*$scope.invoice.tax = parseInt($scope.invoice.subtotal) * (.145);
		$scope.invoice.tax = parseFloat($scope.invoice.tax).toFixed(2);
		$scope.invoice.total = parseFloat(parseInt($scope.invoice.subtotal) + parseFloat($scope.invoice.tax)).toFixed(2);	*/
		$scope.invoice.total = parseInt($scope.invoice.subtotal) + parseInt($scope.invoice.extra);
	}

	$scope.init = function() {
		$scope.invoice = [];
		$scope.invoice.date = new Date();
		var method = 'GET';
	  	var url = 'api/getdata.php';
	  	$http({ method: method,url: url,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			 }).
			success(function(response) 
			{
				var invoice_no = response[0][0];
				if(invoice_no == null)
					invoice_no = 0;
				invoice_no = parseInt(invoice_no);
				invoice_no += 1;
				$scope.invoice.no = invoice_no;
			}).
			error(function(response) 
			{
			});
		$scope.invoice.extra = 0;
		$scope.products = [];
		$scope.particulars = [];
		productService.getAll(function() {
			$scope.products = productService.productCollection;
			$scope.particulars.push({
				'name' : $scope.products[0].id,
				'pname' : 'Hukka',
				'quantity' : 1,
				'amount' : $scope.products[0].prate
			});
			$scope.invoice.subtotal = parseInt($scope.products[0].prate);
			$scope.taxChange();
		});
	}
		$scope.init();

    /*Add Particulars
	
	$scope.addPart = function(particular) 
	{
		$scope.particulars.push(particular);
		$scope.particular = {};
	}
	$scope.removePart = function(particular,index)
	{
    	$scope.invoice.subtotal -= parseInt(particular.amount);
    	$scope.taxChange();
		$scope.particulars.splice(index,1);
	}
    $scope.addPart($scope.first_param);*/

    $scope.qntChange = function() {
    	var id = $scope.particulars[0].name;
    	var quant = parseInt($scope.particulars[0].quantity) | 0;
    	var old = parseInt($scope.particulars[0].amount) | 0;
    	for(var i=0;i<$scope.products.length;i++) {
    		if($scope.products[i].id == id) {
    			$scope.particulars[0].amount = parseInt($scope.products[i].prate)*quant;
    			break;
    		}
    	}
    	$scope.amtChange(old);
    }

    $scope.extra = function() {
    	$scope.invoice.extra = parseInt($scope.invoice.extra) + 100;
    	$scope.taxChange();
    }

    $scope.amtChange = function(old) {
    	$scope.invoice.subtotal += parseInt($scope.particulars[0].amount) - parseInt(old);
		$scope.taxChange();
    }

    /*$scope.setAmount = function(index) {
    	$scope.particulars[index].quantity = 1;
    	var old = parseInt($scope.particulars[index].amount) | 0;
    	var id = $scope.particulars[index].name;
    	for(var i=0;i<$scope.products.length;i++) {
    		if($scope.products[i].id == id) {
    			$scope.particulars[index].amount = parseInt($scope.products[i].prate);
    			$scope.particulars[index].pname = $scope.products[i].pname;
    			break;
    		}
    	}    	
    	$scope.amtChange(index,old);
    }*/
		
	var method = 'POST';
  	var url = 'api/bill.php';
    $scope.authError = null;
  	$scope.print = function() 
	{
		var FormData = 
		{
			'action' : 'save', 
     		'bill_no' : $scope.invoice.no,
     		'bdate' : $scope.invoice.date,
     		'particulars' : $scope.particulars,
     		'subtotal' : $scope.invoice.subtotal,
     		'extra' : $scope.invoice.extra,
     		'total' : $scope.invoice.total
    	};
    	$http({ method: method,url: url,data: FormData,
      			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
     		 }).
    		success(function(response) 
			{
				salesDetailService.setAll(FormData);
        		$scope.form.$setPristine();
				$scope.init();
				$location.path("/invoice/receipt");
			}).
    		error(function(response) 
			{
				$scope.authError = response;
        		$scope.codeStatus = response || "Request failed";	
			});
		return false;
	};
	
}]);

