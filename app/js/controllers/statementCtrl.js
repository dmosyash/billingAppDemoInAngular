'use strict';

app.controller('statementCtrl', function($scope, billService) {
	$scope.changeFormat = function(date) {
		var dd = date.getDate();
		var mm = parseInt(date.getMonth())+1;
		var yy = date.getFullYear();
		return dd+"/"+mm+"/"+yy;
	}

	$scope.init = function() {
		$scope.allBill = [];
		$scope.billStatement = [];
		billService.getAll(function() {
			$scope.allBill = billService.billStatement;
			for(var i=0;i<$scope.allBill.length;i++) {
				var sdate = new Date($scope.allBill[i].sdate);
				$scope.allBill[i].sdate = $scope.changeFormat(sdate);
				$scope.billStatement.push($scope.allBill[i]);
			}
		});
		$scope.statement = [];
		$scope.statement.from = new Date();
		$scope.statement.to = new Date();
	}
	$scope.init();

	$scope.filter = function(stmt) {
		$scope.billStatement = [];
		stmt.from.setHours(0,0,0,0);
		stmt.to.setHours(0,0,0,0);
		for(var i=0;i<$scope.allBill.length;i++) {
			var sdate = new Date($scope.allBill[i].sdate);
			sdate.setHours(0,0,0,0);
			if(sdate >= stmt.from && sdate <= stmt.to){
				$scope.allBill[i].sdate = $scope.changeFormat(sdate);
				$scope.billStatement.push($scope.allBill[i]);
			}
		}
	}

	$scope.removeBill = function(index) {
		var bill_no = $scope.billStatement[index].bill_no;
		console.log(bill_no);
		$scope.billStatement.splice(index,1);
    	billService.removeBill(bill_no);
	}
});