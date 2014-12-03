
var sessionsAppCtrl = angular.module("sessionsApp.controllers", []);

sessionsAppCtrl.controller( "SessionsCtrl", function($scope, SessionsFactory) {

	$scope.getClass = function(track) {
		switch(track) {
			case 'Best Practices':
				return 'greenBorder';
			case 'Application Development':
				return 'orangeBorder';
			default:
				return 'blueBorder';

		}

	};

	SessionsFactory.all().then( function(sessions) {
		$scope.sessions = sessions;
	});


});

sessionsAppCtrl.controller( "SessionCtrl", function($scope, $stateParams, SessionsFactory) {

	$scope.getPanelClass = function(track) {

		switch(track) {
			case 'Best Practices':
				return 'panel-green';
			case 'Application Development':
				return 'panel-orange';
			default:
				return 'panel-blue';
		}

	};

	SessionsFactory.getByID($stateParams.sessionId)
	.then( function(session) {
		$scope.session = session;
	});


	
});

var sessionsAppFactory = angular.module("sessionsApp.services", []);

sessionsAppFactory.factory('SessionsFactory', function($http) {

	var restBaseUrl = "http://beyondtheeveryday.com/beyond/connect2015.nsf/api/data/";
	var allSessionsUNID = "BB9CB6153C3A508EC1257DA2003C7E4F";
	
	return {

		all : function() {

			return $http.get(restBaseUrl + 'collections/unid/' + allSessionsUNID + '?count=100')
			.then( function(res) {
				return res.data;
			});

		},

		getByID : function(sessionId) {

			return $http.get(restBaseUrl + 'documents/unid/' + sessionId)
			.then( function(res) {
				//if 'speakers' is a string: make it an array
				if (typeof res.data.speakers == 'string') {
					res.data.speakers = [res.data.speakers];
				}
				return res.data;
			});

		}


	};

});
