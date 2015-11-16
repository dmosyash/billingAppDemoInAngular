'use strict';

var app = angular.module('emdApp',[
	'ngRoute'
	]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/login',{templateUrl:'partials/login.html', controller: 'loginCtrl'});
	$routeProvider.when('/signup',{templateUrl:'partials/signup.html', controller: 'signupCtrl'});
	$routeProvider.when('/product/add',{templateUrl:'partials/tpl/product.tpl.html', controller: 'productCtrl'});
	$routeProvider.when('/product/list',{templateUrl:'partials/tpl/product_list.tpl.html', controller: 'productListCtrl'});
	$routeProvider.when('/product/update',{templateUrl:'partials/tpl/product.tpl.html', controller: 'productCtrl'});
	$routeProvider.when('/city',{templateUrl:'partials/city.html', controller: 'cityCtrl'});
	$routeProvider.when('/invoice',{templateUrl:'partials/invoice.html', controller: 'invoiceCtrl'});
	$routeProvider.when('/invoice/statement',{templateUrl:'partials/tpl/bill_statement.tpl.html', controller: 'statementCtrl'});
	$routeProvider.when('/invoice/receipt',{templateUrl:'partials/tpl/invoice.tpl.html', controller: 'receiptCtrl'});
	$routeProvider.otherwise({redirectTo : '/login'});
}]);