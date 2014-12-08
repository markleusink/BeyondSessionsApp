var app = angular.module("sessionsApp", [
		'ngResource',
		'ngAnimate',
		'ngCookies',
		'ui.router',
		'sessionsApp.controllers',
		'sessionsApp.services',
		'sessionsApp.globals'
	]);

app.config( function($stateProvider) {

  $stateProvider

  	.state('about', { 	//all sessions
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
		    title : 'Sessions by day'
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

app.controller("MainCtrl", function($rootScope, $scope, $cookies) {

	//load the OS specific CSS
	var userAgent = navigator.userAgent;
	var iOS = (/(iPhone|iPad|iPod)/gi).test(userAgent);
	var css = 'http://cdnjs.cloudflare.com/ajax/libs/bootcards/1.0.0/css/';

	if (iOS) {
		css += 'bootcards-ios-lite.min.css';
		$scope.iOS = true;
		$scope.Android = false;
	} else {
		css += 'bootcards-android-lite.min.css';
		$scope.iOS = false;
		$scope.Android = true;
	}
	
	var head = angular.element(document.getElementsByTagName('head')[0]);
	head.append("<link rel='stylesheet' href='" + css + "' />");

	//add custom CSS here after bootcards, so we don't have to !important everything
	head.append("<link rel='stylesheet' href='styles.css' />");

	//function to toggle the offcanvas (todo)
	$scope.hideOffcanvas = function() {
		Bootcards.OffCanvas.hide();
	};

	//set default active menu option

	$scope.pageTitle = "Connect 2015 Sessions";
	$scope.activeMenu = "about";

	//bootcards init
	 bootcards.init( {
        offCanvasHideOnMainClick : true,
        offCanvasBackdrop : false,
        enableTabletPortraitMode : true,
        disableRubberBanding : true,
        disableBreakoutSelector : 'a.no-break-out'
      });

	//fastclick
	$(function() {
	    FastClick.attach(document.body);
	});
	
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
/*TODO: idea here is to store the user's last visited page in a cookie, so that if he returns, that page gets opened again*/

		$scope.activeMenu = toState.name;

		if (toState.name == 'sessionsByDay' ) {

			$scope.pageTitle = toState.title + ': ' + toParams.dayId;
		} else {
			$scope.pageTitle = toState.title;
		}

	} );

});

app.run(function($state, $cookies) {

  $state.go('about'); // go to default view

});


