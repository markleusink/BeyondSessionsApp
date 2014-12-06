var app = angular.module("sessionsApp", [
		'ngResource',
		'ngAnimate',
		'ui.router',
		'sessionsApp.controllers',
		'sessionsApp.services'
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

	  .state('sessionDetails', { 	//show session details

		    url: '/sessions/:sessionId',
		    templateUrl: 'partials/session.html',
		    controller: 'SessionCtrl'
		});

});

app.controller("MainCtrl", function($rootScope, $scope) {

	$scope.toggleOffcanvas = function() {

		
		var offcanvas = angular.element(document.body.querySelector('.offcanvas'));
		offcanvas.toggleClass('active');
	};

	$scope.pageTitle="";

	$rootScope.$on('setPageTitle', function(ev, args) { $scope.pageTitle = args.title; });

});

app.run(function($state) {

  $state.go('sessionsAll'); // go to default view

});


