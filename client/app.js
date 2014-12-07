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
	    templateUrl: 'partials/about.html'
	})

	.state('map', { 	//map of the venue
	    url: '/map',
	    templateUrl: 'partials/map.html'
	})

	  .state('sessionsAll', { 	//all sessions
		    url: '/sessionsAll',
		    templateUrl: 'partials/sessions.html',
		    controller: 'SessionsCtrl'

	  })

	   .state('sessionsByDay', { 	
		    url: '/sessionsByDay/:dayId',
		    templateUrl: 'partials/sessions.html',
		    controller: 'SessionsByDayCtrl'
	  })

	   .state('favorites', { 	
		    url: '/favorites',
		    templateUrl: 'partials/sessions.html',
		    controller: 'FavoritesCtrl'
	  })

	  .state('sessionDetails', { 	//show session details
		    url: '/sessions/:sessionId',
		    templateUrl: 'partials/session.html',
		    controller: 'SessionCtrl'
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

	//bootcards init
	 bootcards.init( {
        offCanvasHideOnMainClick : true,
        offCanvasBackdrop : false,
        enableTabletPortraitMode : true,
        disableRubberBanding : true,
        disableBreakoutSelector : 'a.no-break-out'
      });

	//function to toggle the offcanvas (todo)
	$scope.toggleOffcanvas = function() {

		Bootcards.OffCanvas.toggle();

	};

	//set default active menu option

	$scope.pageTitle = "Connect 2015 Sessions";
	$scope.activeMenu = "about";

	//if the page title is changed, set it in the scope
	$rootScope.$on('setPageTitle', function(ev, args) { 
		$scope.pageTitle = args.title; 
		$scope.activeMenu = args.menu;
	});

	/*TODO: idea here is to store the user's last visited page in a cookie, so that if he returns, that page gets opened again

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

		console.log('to ' , toState);

	} );*/

});

app.run(function($state, $cookies) {

  $state.go('about'); // go to default view

});


