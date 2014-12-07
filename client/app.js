var app = angular.module("sessionsApp", [
		'ngResource',
		'ngAnimate',
		'ui.router',
		'sessionsApp.controllers',
		'sessionsApp.services',
		'sessionsApp.globals'
	]);

app.config( function($stateProvider) {

  $stateProvider

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

app.controller("MainCtrl", function($rootScope, $scope) {

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

	 bootcards.init( {
        offCanvasHideOnMainClick : true,
        offCanvasBackdrop : false,
        enableTabletPortraitMode : true,
        disableRubberBanding : true,
        disableBreakoutSelector : 'a.no-break-out'
      });

	$scope.toggleOffcanvas = function() {

		var offcanvas = angular.element(document.body.querySelector('.offcanvas'));
		offcanvas.toggleClass('active');
	};

	$scope.pageTitle = "Connect 2015 Sessions";
	$scope.activeMenu = "sessionsAll";

	$rootScope.$on('setPageTitle', function(ev, args) { 
		$scope.pageTitle = args.title; 
		$scope.activeMenu = args.menu;
	});

});

app.run(function($state) {

  $state.go('sessionsAll'); // go to default view

});


