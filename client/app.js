var app = angular.module("sessionsApp", [
		'ngResource',
		'ngAnimate',
		'ui.router',
		'ipCookie',
		'sessionApp.utils',
		'sessionsApp.controllers',
		'sessionsApp.services'
	]);

app.constant('dasBaseUrl', 'http://beyondtheeveryday.com/beyond/connect2015.nsf/api/data/');

app.config( function($stateProvider) {

	$stateProvider

	  	.state('about', { 	//about the app
		    url: '/about',
		    templateUrl: 'partials/about.html',
		    title : 'About'
		})
		.state('map', { 	//map of the venue
		    url: '/map',
		    templateUrl: 'partials/map.html',
		    title : 'Swan Map'
		})
		.state('sessionsAll', { 	//all sessions
			    url: '/sessionsAll',
			    templateUrl: 'partials/sessions.html',
			    controller: 'SessionsCtrl',
			    title : 'All sessions'

		  })
		   .state('sessionsByDay', { 	
			    url: '/sessionsByDay/:dayId',
			    templateUrl: 'partials/sessions.html',
			    controller: 'SessionsByDayCtrl',
			    title : 'Sessions'
		  })
		   .state('favorites', { 	
			    url: '/favorites',
			    templateUrl: 'partials/sessions.html',
			    controller: 'FavoritesCtrl',
			    title : 'Favorites'
		  })

		  .state('sessionDetails', { 	//show session details
			    url: '/sessions/:sessionId',
			    templateUrl: 'partials/session.html',
			    controller: 'SessionCtrl',
			    title : 'Session'
			});

});

app.controller("MainCtrl", function($rootScope, $scope, utils, ipCookie) {
	
	//function to toggle/hide/show the offcanvas
	$scope.toggleOffCanvas = function() {
		angular.element( document.getElementById('offcanvas')).toggleClass('active');
		angular.element( document.getElementById('container')).toggleClass('active');
	};
	$scope.hideOffCanvas = function() {
		angular.element( document.getElementById('offcanvas')).removeClass('active');
		angular.element( document.getElementById('container')).removeClass('active');
	};

	//set default active menu option
	$scope.pageTitle = "Connect 2015 Sessions";
	$scope.activeMenu = "about";

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		
		//store last state
		ipCookie('lastState', toState.name, {path : '/', expires: 365} );

		if (toState.name == 'sessionsByDay' ) {
			$scope.pageTitle = toState.title + ' : ' + utils.getFullDayName(toParams.dayId);
			$scope.activeMenu = toState.name + toParams.dayId;
		} else {
			$scope.pageTitle = toState.title;
			$scope.activeMenu = toState.name;
		}

	} );

});

app.run( function($state, ipCookie) {

	FastClick.attach(document.body);

	//go to last state (or the default state)
	var lastState = ipCookie('lastState');

	if (lastState === null || lastState.length===0) {
		lastState = 'about';
	}

	$state.go(lastState);

});
