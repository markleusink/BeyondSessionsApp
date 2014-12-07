
var sessionsAppCtrl = angular.module("sessionsApp.controllers", []);

sessionsAppCtrl.controller( "SessionsCtrl", function($rootScope, $scope, SessionsFactory) {

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

	$rootScope.$emit( "setPageTitle", {title:"All sessions", menu : "sessionsAll"});

	SessionsFactory.all().then( function(sessions) {
		$scope.sessions = sessions;
	});


});

sessionsAppCtrl.controller( "SessionsByDayCtrl", function($rootScope, $scope, $stateParams, SessionsFactory) {

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

	var dayName;

	switch ($stateParams.dayId) {

		case "mon":
			dayName = "Monday"; break;
		case "tue":
			dayName = "Tuesday"; break;
		case "wed":
			dayName = "Wednesday"; break;
		case "thu":
			dayName = "Thursday"; break;
		case "fri":
			dayName = "Friday"; break;
		case "sat":
			dayName = "Saturday"; break;
		case "sun":
			dayName = "Sunday"; break;


	}

	$rootScope.$emit( "setPageTitle", {title:"By day: " + dayName, menu : "sessions" + $stateParams.dayId });

	SessionsFactory.getByDay($stateParams.dayId).then( function(sessions) {
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
	
	return {

		all : function() {

			return $http.get(restBaseUrl + 'collections/name/sessionsAll?count=100')
			.then( function(res) {
				return res.data;
			});

		},

		getByDay : function(dayId) {

			return $http.get(restBaseUrl + 'collections/name/sessionsByDay?count=100&category=' + dayId)
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
