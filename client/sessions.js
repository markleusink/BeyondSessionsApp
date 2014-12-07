
var sessionsAppCtrl = angular.module("sessionsApp.controllers", [])

sessionsAppCtrl.controller( "SessionsCtrl", function($rootScope, $scope, SessionsFactory, SessionsGlobals) {

	$scope.isLoading = true;

	$scope.getClass = function(track) {
		return SessionsGlobals.getColorForTrack(track) + "Border";
	};

	$rootScope.$emit( "setPageTitle", {title:"All sessions", menu : "sessionsAll"});

	SessionsFactory.all().then( function(sessions) {
		$scope.sessions = sessions;
		$scope.isLoading = false;
	});


});

sessionsAppCtrl.controller( "SessionsByDayCtrl", function($rootScope, $scope, $stateParams, SessionsFactory, SessionsGlobals) {

	$scope.isLoading = true;

	$scope.getClass = function(track) {
		return SessionsGlobals.getColorForTrack(track) + "Border";
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
		$scope.isLoading = false;
	});


});

sessionsAppCtrl.controller( "FavoritesCtrl", function($rootScope, $scope, SessionsFactory, SessionsGlobals) {

	$scope.isLoading = true;
	$scope.sessions = [];
	$scope.noDocsFound = "You don't have any favorites yet...";

	$scope.getClass = function(track) {
		return SessionsGlobals.getColorForTrack(track) + "Border";
	};

	$rootScope.$emit( "setPageTitle", {title:"Favorites", menu : "favorites"});

	SessionsFactory.all().then( function(sessions) {
		//$scope.sessions = sessions;
		$scope.isLoading = false;
	});


});

sessionsAppCtrl.controller( "SessionCtrl", function($scope, $stateParams, SessionsFactory, SessionsGlobals) {

	$scope.isLoading = true;

	$scope.getPanelClass = function(track) {
		return "panel-" + SessionsGlobals.getColorForTrack(track);
	};

	$scope.addToFavorites = function() {
		alert("todo");

	}

	SessionsFactory.getByID($stateParams.sessionId)
	.then( function(session) {
		$scope.session = session;
		$scope.isLoading = false;
	});

});

var sessionsAppFactory = angular.module("sessionsApp.services", []);

sessionsAppFactory.factory('SessionsFactory', function($http) {

	var restBaseUrl = "http://beyondtheeveryday.com/beyond/connect2015.nsf/api/data/";
	
	return {

		all : function() {

			return $http.get(restBaseUrl + 'collections/name/sessionsAll?count=100', {cache: true})
			.then( function(res) {
				return res.data;
			});

		},

		getByDay : function(dayId) {

			return $http.get(restBaseUrl + 'collections/name/sessionsByDay?count=100&category=' + dayId, {cache: true})
			.then( function(res) {
				return res.data;
			});

		},

		getByID : function(sessionId) {

			return $http.get(restBaseUrl + 'documents/unid/' + sessionId, {cache: true})
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

var sessionsAppGlobals = angular.module("sessionsApp.globals", []);

sessionsAppGlobals.factory('SessionsGlobals', function() {

	return {

		getColorForTrack : function(track) {

			if (!track) {
				return 'blue';
			}

			if (track.indexOf('Best Practices')>-1) {
				return 'green';
			} else if (track.indexOf('Application Development')>-1) {
				return 'orange';
			} else if (track.indexOf('Innovators and Thought Leaders')>-1) {
				return 'red';
			} else if (track.indexOf('Business Partner Development Day')>-1) {
				return 'gray';
			} else {
				return 'blue';
			}
		}
		
	}

});
