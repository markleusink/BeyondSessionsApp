
var sessionsAppCtrl = angular.module("sessionsApp.controllers", []);

//set up a base controller containing properties/ methods that will be shared
sessionsAppCtrl.controller( "SessionsBaseCtrl", function($scope, utils) {

	$scope.allowSearch = true;
	$scope.favorites = [];
	$scope.isLoading = true;
	$scope.noDocsFound = "No sessions found...";

	$scope.isFavorite = function(session) {
	 	return $scope.favorites.indexOf(session.sessionId) > -1;
	};

	$scope.getBackgroundClass = function(track) {
		return "bg-" + utils.getColorForTrack(track);
	};

});

sessionsAppCtrl.controller( "SessionsCtrl", function($scope, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	SessionsFactory.all().then( function(sessions) {
		$scope.sessions = sessions;
		$scope.isLoading = false;

		//get favorites
		if ( utils.hasFavorites() ) {
			SessionsFactory.getFavorites().then( function(favorites) {
				$scope.favorites = favorites;
			});
		}

	});

});

sessionsAppCtrl.controller( "SessionsByDayCtrl", function($scope, $stateParams, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	SessionsFactory.getByDay($stateParams.dayNo).then( function(sessions) {
		$scope.sessions = sessions;
		$scope.isLoading = false;

		//get favorites
		if ( utils.hasFavorites() ) {
			SessionsFactory.getFavorites().then( function(favorites) {
				$scope.favorites = favorites;
			});
		}
	});

});

sessionsAppCtrl.controller( "SessionsByTrackCtrl", function($scope, $stateParams, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	$scope.allowSearch = false;

	/*$scope.trackFilter = function(item) {
    	return item.track.indexOf($stateParams.trackId)>-1;
	};*/

	SessionsFactory.getByTrack($stateParams.trackId).then( function(sessions) {
		$scope.sessions = sessions;
		$scope.isLoading = false;

		//get favorites
		if ( utils.hasFavorites() ) {
			SessionsFactory.getFavorites().then( function(favorites) {
				$scope.favorites = favorites;
			});
		}
	});

});

sessionsAppCtrl.controller( "NowNextCtrl", function($scope, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	$scope.sessionsNow = [];
	$scope.sessionsNext =[];
	
	var now = new Date();

	//debug
	now.setYear(2014);
	now.setMonth(0);
	now.setDate(29);

	//v/ar nowMs = now.getTime();
	var todayDayNo = now.getDay();

	SessionsFactory.getByDay(todayDayNo).then( function(sessions) {
		
		angular.forEach(sessions, function(session) {

			var s = new Date(session.startTime);
			var e = new Date(session.endTime);

			//console.log('session', s, e, now);

			//restrict list of sessions to sessions running now/ next
			if (s > now) {
				
				//calculate time between now & session start
				var diffMs = (s - now); // milliseconds between now & start
				session.startsIn = Math.round( diffMs / 1000 / 60 );		//minutes to start

				if (session.startsIn < 120 ) {		//only add sessions that start in the next 2 hours
					$scope.sessionsNext.push(session);
				}

			} else if (s < now && e > now ) {
				//this session has started: calculate remaining no of minutes
				
				var diffRuns = (e - now);
				session.runsFor = Math.round(diffRuns / 1000 / 60);

				$scope.sessionsNow.push(session);
			}

		});

		$scope.isLoading = false;
	});

});

sessionsAppCtrl.controller( "FavoritesCtrl", function($scope, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	$scope.sessions = [];
	$scope.allowSearch = false;
	$scope.noDocsFound = "You don't have any favorites yet...";

	if ( utils.hasFavorites() ) {

		SessionsFactory.getFavorites().then( function(fav) {

			$scope.favorites = fav;

			//get all sessions, restrict to favorites
			SessionsFactory.all().then( function(sessions) {

				var favoriteSessions = [];

				for (var i=0; i<sessions.length; i++) {
					var sessionId = sessions[i].sessionId;

					if (fav.indexOf(sessionId) >-1) {
						favoriteSessions.push( sessions[i] );
					}

				}

				$scope.sessions = favoriteSessions;
				$scope.isLoading = false;
			});

		});
	}

	SessionsFactory.all().then( function(sessions) {
		//$scope.sessions = sessions;
		$scope.isLoading = false;
	});


});

sessionsAppCtrl.controller( "SessionCtrl", function($controller, $scope, $stateParams, SessionsFactory, utils) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	$scope.toggleFavorite = function() {

		var sessionId = $scope.session.sessionId;

		//check if we have a UNID we can store the favorites in (on the server)
		var favoritesUnid = utils.getFavoritesUnid();

		if ($scope.session.isFavorite) {

			$scope.session.isFavorite = false;

			var pos = $scope.favorites.indexOf( sessionId);

			if (pos>-1){
				$scope.favorites.splice(pos, 1);
			}

			SessionsFactory.saveFavorites(favoritesUnid, $scope.favorites);

		} else {

			//mark as favorite
			$scope.session.isFavorite = true;
			$scope.favorites.push( sessionId );

			//console.log('adding favorite',  $scope.session.sessionId, 'all favorites:', $scope.favorites  );

			//TODO: make list unique

			//get the unid of this users' favorites document from localStorage
			//if no id exists, a new favorite document is created using DDS 
			//and the unid of that document is stored locally.

			if ( favoritesUnid == null || favoritesUnid.length==0 ) {
				//no favorites yet: get favorites unid
						
				SessionsFactory.getFavoritesUnid()
				.then( function(favoritesUnid) {

					utils.setFavoritesUnid(favoritesUnid);

					//now store the favorites list
					SessionsFactory.saveFavorites(favoritesUnid, $scope.favorites);

				});

			} else {

				//console.log('existing favorites unid ' + favoritesUnid);

				//store the favorites
				SessionsFactory.saveFavorites(favoritesUnid, $scope.favorites);
			}


		}

	};

	SessionsFactory.getByID($stateParams.sessionId)
	.then( function(session) {
		$scope.session = session;
		$scope.isLoading = true;

		//check if the session is a favorite
		if ( utils.hasFavorites() ) {
			SessionsFactory.getFavorites(true).then( function(favorites) {
				//console.log('check favs', favorites, session.sessionId);

				if (favorites.indexOf(session.sessionId)>-1) {
					$scope.session.isFavorite = true;
				}

				$scope.favorites = favorites;
			});
		}
	});

});

sessionsAppCtrl.controller('FeedbackCtrl', function($scope, SessionsFactory) {

	$scope.submitted = false;

	$scope.submit = function() {
		
		SessionsFactory.saveFeedback( {feedback : $scope.feedback, name: $scope.name} );
		$scope.submitted = true;

	};

});


