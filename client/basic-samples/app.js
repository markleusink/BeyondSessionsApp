var app = angular.module('beyondApp', [
	'ui.router'
]);

app.config( function( $stateProvider ) {

	$stateProvider
	.state('sessions', {
		url : '/sessions',
		templateUrl: 'partials/sessions.html',
		controller: 'SessionsCtrl'
	})
	.state('session', {
		url : '/sessions/:sessionId',
		templateUrl: 'partials/session.html',
		controller: 'SessionCtrl'
	});

});

app.controller('SessionsCtrl', ['$scope', '$http', function($scope, $http){
	
	//initial call to populate the list of sessions
	getAllSessions();
	
	//function to create a session
	$scope.createSession = function() {
		$http.post( 'http://beyondtheeveryday.com/beyond/sessions-demo.nsf/api/data/documents?form=frmSession', $scope.formData)
		.success(function(data) {

			$scope.formData = {}; //clear form

			//let's make another get request to populate the list with the newly added session
			getAllSessions();
			
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

	function getAllSessions() {

		$http.get( 'http://beyondtheeveryday.com/beyond/sessions-demo.nsf/api/data/collections/name/sessionsAll')
		.success( function(data) {
			$scope.sessions = data;
		});

	}
	
}]);

app.controller('SessionCtrl', function($scope, $http, $stateParams) {

	$http.get( 'http://beyondtheeveryday.com/beyond/sessions-demo.nsf/api/data/documents/unid/' + $stateParams.sessionId)
		.success( function(data) {
			$scope.session = data;
		});

});

