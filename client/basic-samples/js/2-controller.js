
var app = angular.module('beyondApp', []);

app.controller('SessionsCtrl', ['$scope', function($scope) {
	
	//$scope = access to controller from the view

	$scope.user = 'Mark';

	$scope.sessions = [
		{ 'title' : 'Domino', 'image' : 'img/grolsch.jpg'},
		{ 'title' : 'Connections', 'image' : 'img/jupiler.jpg'},
		{ 'title' : 'Worklight', 'image' : 'img/heineken.jpg'}
	];

}]);
