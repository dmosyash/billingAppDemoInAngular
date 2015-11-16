'use strict';

app.factory("billService",function($http) {
	var obj = {};
	obj.billStatement = [];
	obj.getAll = function(callback) {
		var method = 'GET';
	  	var url = 'api/billList.php';
	  	$http({ method: method,url: url,
  			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 		 }).
		success(function(response) 
		{
			obj.billStatement = response;
			callback();
		}).
		error(function(response) 
		{	
			console.log(response);
		});
	}

	obj.removeBill = function(bill_id) {
		var method = 'POST';
	  	var url = 'api/bill.php';
	  	var FormData = 
			{
				'action':'delete',
				'bill_no':bill_id,
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