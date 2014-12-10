/*
TODO:
- performance of animations
- grunt task to concat JS files
- template cache?
- search is behaving strange
- implement feedback option
- off canvas: allow scroll (zindex issue)
- desktop menu options: organise
- offcanvas: collapse suboptions
- show speaker images ?
*/

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
		.state('feedback', { 	
		    url: '/feedback',
		    templateUrl: 'partials/feedback.html',
		    title : 'Feedback',
		    controller : 'FeedbackCtrl'
		})
		.state('nowNext', { 
		    url: '/nowNext',
		    templateUrl: 'partials/nowNext.html',
		    title : 'Now & Next',
		    controller : 'NowNextCtrl'
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
		    title : 'All sessions',

		  })
		   .state('sessionsByDay', { 	
			    url: '/sessionsByDay/:dayNo',
			    templateUrl: 'partials/sessions.html',
			    controller: 'SessionsByDayCtrl',
			    title : 'Sessions'
		  })
		   .state('sessionsByTrack', { 	
			    url: '/sessionsByTrack/:trackId',
			    templateUrl: 'partials/sessions.html',
			    controller: 'SessionsByTrackCtrl',
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

	$scope.getMenuOptionClass = function(track) {

		var color = utils.getColorForTrack(track);
		return color + ( $scope.activeMenu == track ? ' active' : '');
	}

	//set default active menu option
	$scope.pageTitle = "Connect 2015 Sessions";
	$scope.activeMenu = "about";

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		
		//store last state, but not for session details
		if (toState.name != 'sessionDetails') {
			ipCookie('lastState', toState.name, {path : '/', expires: 365} );
		}

		if (toState.name == 'sessionsByDay' ) {
			$scope.pageTitle = toState.title + ': ' + utils.getFullDayName(toParams.dayNo);
			$scope.activeMenu = toState.name + toParams.dayId;
		} else if (toState.name == 'sessionsByTrack' ) {
			$scope.pageTitle = toParams.trackId;
			$scope.activeMenu = toParams.trackId;
		} else {
			$scope.pageTitle = toState.title;
			$scope.activeMenu = toState.name;
		}

	} );

});

app.run( function($state, ipCookie) {

	//enable fastclick
	FastClick.attach(document.body);

	//go to last saved state or the default state)
	var lastState = ipCookie('lastState');

	if (lastState == null || lastState.length == 0) {
		lastState = 'about';
	}

	$state.go(lastState);

});
