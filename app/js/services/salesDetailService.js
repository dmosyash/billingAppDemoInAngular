'use strict';

app.factory("salesDetailService",function($http) {
	var obj = {};
	obj.details = [];
	obj.setAll = function(data) {
		obj.details = data;
	}
	return obj;
});