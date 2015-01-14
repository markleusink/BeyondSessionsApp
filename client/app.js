/*
TODO:
- grunt task to concat JS files / template cache (performance optimization)
- full screen: issue on iOS (needs top padding)
*/

/*
	ngResource
	ngAnimate: animations
	ui.rooter: router
	ui.bootstrap: dropdowns
	LocalStorage: store favorites unid
*/

var app = angular.module("sessionsApp", [
		'templates-main',
		'ngResource',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'LocalStorageModule',
		'sessionApp.utils',
		'sessionsApp.controllers',
		'sessionsApp.services'
	]);

app.constant('sessionsRestUrl', 'http://beyondtheeveryday.com/beyond/connect2015.nsf/api/data/');
app.constant('favoritesRestUrl', 'http://beyondtheeveryday.com/beyond/favorites.nsf/api/data/');

app.config( function($stateProvider, localStorageServiceProvider) {

	/*setup the routes*/
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
		    templateUrl: 'partials/nownext.html',
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

		/*set up local storage*/
		localStorageServiceProvider
	    	.setPrefix('bte');
    	
});

app.controller("MainCtrl", function($rootScope, $scope, $timeout, utils, localStorageService, SessionsFactory) {
	
	//function to toggle/hide/show the offcanvas
	$scope.toggleOffCanvas = function() {
		//we add the noscroll class to the body so it can't be scrolled
		//while the offcanvas is opened
		angular.element( document.body).toggleClass('noscroll');
		angular.element( document.getElementById('offcanvas')).toggleClass('active');
		angular.element( document.getElementById('container')).toggleClass('active');
	};
	$scope.hideOffCanvas = function() {
		angular.element( document.body).removeClass('noscroll');
		angular.element( document.getElementById('offcanvas')).removeClass('active');
		angular.element( document.getElementById('container')).removeClass('active');
	};

	$scope.tracks = [];

	//load the tracks and get the color for every track
	SessionsFactory.getTracks().then( function(tracks) {

		angular.forEach( tracks, function(track) {

			var color = utils.getColorForTrack(track.name);
			track.clazz = 'bg-' + color + ( $scope.activeMenu == track.name ? ' active' : '');

		});

		$scope.tracks = tracks;
	});

	$scope.menuDays = [
		{id: '0', label:'Sunday'},
		{id: '1', label:'Monday'},
		{id: '2', label:'Tuesday'},
		{id: '3', label:'Wednesday'}
	];

	//set default active menu option
	$scope.pageTitle = "ConnectED 2015 Sessions";
	$scope.activeMenu = "about";

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		
		if (fromState.name.indexOf('sessions') == 0 ) {
			$rootScope.yOffset = window.pageYOffset;
		}

		//store last state, but not for session details
		if (toState.name != 'sessionDetails') {
			localStorageService.set('lastState', toState.name, {path : '/', expires: 365} );
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

	$rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
		
		$timeout( function() {

			var yOffset = 0;

			if (toState.name.indexOf('sessions') == 0 && $rootScope.yOffset) {
				yOffset = $rootScope.yOffset;
			}

			window.scrollTo(0, yOffset);

		}, 0);


	});


});

app.run( function($state, localStorageService) {

	//enable fastclick
	FastClick.attach(document.body);

	//go to last saved state or the default state)
	var lastState = localStorageService.get('lastState');

	if (lastState == null || lastState.length == 0) {
		lastState = 'about';
	}

	$state.go(lastState);

});
