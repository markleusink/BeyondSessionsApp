
var app = angular.module('beyondApp', []);

app.controller('SessionsCtrl', ['$scope', '$http', function($scope, $http){
	
	var baseUrl = 'http://beyondtheeveryday.com/beyond/connect2015.nsf';

	//initial call to populate the list of sessions
	getAllSessions();
	
	//function to create a session
	$scope.createSession = function() {
		$http.post( baseUrl + '/api/data/documents?form=frmSessionTest', $scope.formData)
			.success(function(data) {

				$scope.formData = {}; //clear form

				//let's make another get request to populate the list with the newly added session
				getAllSessions();
				
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	//delete a session
	$scope.deleteSession = function(session) {
		
		$http.delete( baseUrl + '/api/data/documents/unid/' + session['@unid'] )
			.success(function(data) {
				getAllSessions();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
			
	};

	function getAllSessions() {

		$http.get( baseUrl + '/api/data/collections/name/sessionsAll')
			.success( function(data) {
				$scope.sessions = data;
			});

	}
	
}]);
