
var app = angular.module('beyondApp', []);

app.controller('SessionsCtrl', ['$scope', '$http', function($scope, $http){
	
	$http.get('http://beyondtheeveryday.com/beyond/connect2015.nsf/api/data/collections/name/sessionsAll')
	
		.success( function(data) {

			$scope.sessions = data;

		});

}]);
