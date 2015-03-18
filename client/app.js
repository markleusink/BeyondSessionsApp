var app = angular.module("sessionsApp", [
		'templates-main',
		'ngResource',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',
		'pascalprecht.translate',
		'LocalStorageModule',
		'sessionApp.utils',
		'sessionsApp.controllers',
		'sessionsApp.services'
	]);

app.service('configService', function () {
  this.sessionsRestUrlEN = 'http://beyondtheeveryday.com/beyond/icsug.nsf/api/data/collections/name/sessionsEN?count=1000';
  this.sessionsRestUrlDE = 'http://beyondtheeveryday.com/beyond/icsug.nsf/api/data/collections/name/sessionsDE?count=1000';
  this.tracksRestUrlEN = 'http://beyondtheeveryday.com/beyond/icsug.nsf/api/data/collections/name/tracks?count=100';
  this.tracksRestUrlDE = 'http://beyondtheeveryday.com/beyond/icsug.nsf/api/data/collections/name/tracks?count=100';
  this.favoritesRestUrl = 'http://beyondtheeveryday.com/beyond/favorites.nsf/api/data/';
});

app.config( function($stateProvider, localStorageServiceProvider) {

	/*setup the routes*/
	$stateProvider

	  	.state('about', { 	//about the app
		    url: '/about',
		    templateUrl: 'partials/about.html',
		    title : 'ABOUT',
		    controller : 'AboutCtrl'
		})
		.state('feedback', { 	
		    url: '/feedback',
		    templateUrl: 'partials/feedback.html',
		    title : 'FEEDBACK',
		    controller : 'FeedbackCtrl'
		})
		.state('nowNext', { 
		    url: '/nowNext',
		    templateUrl: 'partials/nownext.html',
		    title : 'NOWNEXT',
		    controller : 'NowNextCtrl'
		})
		.state('map', { 	//map of the venue
		    url: '/map',
		    templateUrl: 'partials/map.html',
		    title : 'MAP'
		})
		.state('sessionsAll', { 	//all sessions
		    url: '/sessionsAll',
		    templateUrl: 'partials/sessions.html',
		    controller: 'SessionsCtrl',
		    title : 'ALLSESSIONS',

		  })
		   .state('sessionsByDay', { 	
			    url: '/sessionsByDay/:dayNo',
			    templateUrl: 'partials/sessions.html',
			    controller: 'SessionsByDayCtrl',
			    title : 'SESSIONS'
		  })
		   .state('sessionsByTrack', { 	
			    url: '/sessionsByTrack/:trackId',
			    templateUrl: 'partials/sessions.html',
			    controller: 'SessionsByTrackCtrl',
			    title : 'SESSIONS'
		  })
		   .state('favorites', { 	
			    url: '/favorites',
			    templateUrl: 'partials/sessions.html',
			    controller: 'FavoritesCtrl',
			    title : 'FAVORITES'
		  })
		  .state('sessionDetails', { 	//show session details
			    url: '/sessions/:sessionId',
			    templateUrl: 'partials/session.html',
			    controller: 'SessionCtrl',
			    title : 'SESSION'
			});

		/*set up local storage*/
		localStorageServiceProvider
	    	.setPrefix('bte');

});

app.controller("MainCtrl", function($rootScope, $scope, $state, $timeout, $translate, utils, 
	localStorageService, SessionsFactory) {
	
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
		{id: '4', label:$translate.instant('THURSDAY') },
		{id: '5', label:$translate.instant('FRIDAY') }
	];

	//set default active menu option
	$scope.pageTitle = $translate.instant("SESSIONS");
	$scope.activeMenu = "about";

	$scope.setLanguage = function(toLan) {
		localStorageService.set('language', toLan);
		$translate.use(toLan);
		localStorageService.set( 'sessionsLastUpdate', null );
		$scope.hideOffCanvas();
		$state.transitionTo($state.current, $state.$current.params, { reload: true, inherit: true, notify: true });

	}

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
		
		if (fromState.name.indexOf('sessions') == 0 ) {
			$rootScope.yOffset = window.pageYOffset;
		}

		//store last state, but not for session details
		if (toState.name != 'sessionDetails') {
			localStorageService.set('lastState', toState.name, {path : '/', expires: 365} );
		}

		if (toState.name == 'sessionsByDay' ) {
			$scope.pageTitle = utils.getFullDayName(toParams.dayNo);
			$scope.activeMenu = toState.name + toParams.dayId;
		} else if (toState.name == 'sessionsByTrack' ) {
			$scope.pageTitle = toParams.trackId;
			$scope.activeMenu = toParams.trackId;
		} else {
			$scope.pageTitle = $translate.instant(toState.title);
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

	$scope.isLanEN = function() {
		return $translate.use() == 'en';
	}


});

app.run( function($state, $rootScope, $translate, localStorageService) {

	//enable fastclick
	FastClick.attach(document.body);

	//go to last saved state or the default state)
	var lastState = localStorageService.get('lastState');

	if (lastState == null || lastState.length == 0) {
		lastState = 'about';
	}

	var lan = localStorageService.get('language');
	if (lan == null) {
		lan = "en";		//default
	}

	$rootScope.language = lan;
	$translate.use(lan);

	$state.go(lastState);


});

app.filter( "dayNameFilter", function($translate) {
	return function(dayNo) {
		switch (dayNo) {
			case 4:
				return $translate.instant('THU');
			case 5:
				return $translate.instant('FRI');

		}
	};
});
