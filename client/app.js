var app = angular.module("sessionsApp", [
		'ngResource',
		'ngAnimate',
		'ui.router',
		'sessionsApp.controllers',
		'sessionsApp.services'
	]);

app.config( function($stateProvider) {

  $stateProvider

	  .state('sessions', { 	//all sessions

		    url: '/sessions',
		    templateUrl: 'partials/sessions.html',
		    controller: 'SessionsCtrl'

	  })
	  .state('sessionDetails', { 	//show session details

		    url: '/sessions/:sessionId',
		    templateUrl: 'partials/session.html',
		    controller: 'SessionCtrl'
		});

});

app.controller("MainCtrl", function($scope) {

	$scope.toggleOffcanvas = function() {

		var offcanvas = angular.element(document.body.querySelector('.offcanvas'));
		offcanvas.toggleClass('active');
	};

});

app.run(function($state) {

  $state.go('sessions'); // go to default view

});


