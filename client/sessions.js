
var sessionsAppCtrl = angular.module("sessionsApp.controllers", []);

//set up a base controller containing properties/ methods that will be shared
sessionsAppCtrl.controller( "SessionsBaseCtrl", function($scope, utils) {

	$scope.favorites = [];
	$scope.isLoading = true;
	$scope.noDocsFound = "No sessions found...";

	$scope.isFavorite = function(session) {
	 	return $scope.favorites.indexOf(session.sessionId) > -1;
	};

	$scope.getClass = function(track) {
		return utils.getColorForTrack(track) + "Border";
	};

});

sessionsAppCtrl.controller( "SessionsCtrl", function($rootScope, $scope, SessionsFactory, utils, $controller) {

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

sessionsAppCtrl.controller( "SessionsByDayCtrl", function($rootScope, $scope, $stateParams, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	SessionsFactory.getByDay($stateParams.dayId).then( function(sessions) {
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

sessionsAppCtrl.controller( "SessionsByTrackCtrl", function($rootScope, $scope, $stateParams, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	$scope.trackFilter = function(item) {
    	return item.track.indexOf($stateParams.trackId)>-1;
	};

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


sessionsAppCtrl.controller( "FavoritesCtrl", function($rootScope, $scope, SessionsFactory, utils, $controller) {

	// instantiate base controller
	$controller('SessionsBaseCtrl', { $scope: $scope });

	$scope.sessions = [];
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

sessionsAppCtrl.controller( "SessionCtrl", function($scope, $stateParams, SessionsFactory, utils) {

	$scope.isLoading = true;
	$scope.favorites = [];

	$scope.getPanelClass = function(track) {
		return "panel-" + utils.getColorForTrack(track);
	};

	$scope.toggleFavorite = function() {

		console.log('toggle favorite');

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

			console.log('adding favorite',  $scope.session.sessionId, 'all favorites:', $scope.favorites  );

			//TODO: make list unique

			//get the unid of this users' favorites document from a cookie
		//if no id exists, a new favorite document is created using DDS 
		//and the unid of that document is stored locally in a cookie.

			if ( favoritesUnid == null || favoritesUnid.length==0 ) {
				//no favorites yet: get favorites unid
						
				SessionsFactory.getFavoritesUnid()
				.then( function(favoritesUnid) {

					utils.setFavoritesUnid(favoritesUnid);

					//now store the favorites list
					SessionsFactory.saveFavorites(favoritesUnid, $scope.favorites);

				});

			} else {

				console.log('existing favorites unid ' + favoritesUnid);

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
				console.log('check favs', favorites, session.sessionId);

				if (favorites.indexOf(session.sessionId)>-1) {
					$scope.session.isFavorite = true;
				}

				$scope.favorites = favorites;
			});
		}
	});

});

sessionsAppCtrl.controller('FeedbackCtrl', function($scope, SessionsFactory) {

	//TODO

	//TODO: check if form is valid
	SessionsFactory.saveFeedback( {feedback : $scope.feedback} );

});


