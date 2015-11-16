'use strict';

app.directive('loginDirective', function() {
	return {
		templateUrl : 'partials/tpl/login.tpl.html'
	};
});

app.directive('invoiceDirective', function() {
	return {
		templateUrl : 'partials/tpl/bill.tpl.html'
	};
});

app.directive('popup', function() {
	return {
		templateUrl : 'partials/tpl/city.tpl.html'
	};
});