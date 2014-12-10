
var sessionsAppCtrl = angular.module("sessionsApp.controllers", []);

sessionsAppCtrl.controller( "SessionsCtrl", function($rootScope, $scope, SessionsFactory, utils) {

	$scope.isLoading = true;
	$scope.favorites = [];

	$scope.getClass = function(track) {
		return utils.getColorForTrack(track) + "Border";
	};

	$scope.isFavorite = function(session) {
		return $scope.favorites.indexOf(session.sessionId) > -1;
	}
	
	SessionsFactory.all().then( function(sessions) {
		$scope.sessions = sessions;
		$scope.isLoading = false;

		//get favorites
		if ( utils.hasFavorites() ) {
			SessionsFactory.getFavorites(true).then( function(favorites) {
				console.log('got the favs...', favorites);
				$scope.favorites = favorites;
			});
		}

	});

});

sessionsAppCtrl.controller( "SessionsByDayCtrl", function($rootScope, $scope, $stateParams, SessionsFactory, utils) {

	$scope.isLoading = true;
	$scope.favorites = [];

	$scope.getClass = function(track) {
		return utils.getColorForTrack(track) + "Border";
	};

	SessionsFactory.getByDay($stateParams.dayId).then( function(sessions) {
		$scope.sessions = sessions;
		$scope.isLoading = false;

		//get favorites
		if ( utils.hasFavorites() ) {
			SessionsFactory.getFavorites(true).then( function(favorites) {
				$scope.favorites = favorites;
			});
		}
	});

});

sessionsAppCtrl.controller( "FavoritesCtrl", function($rootScope, $scope, SessionsFactory, utils) {

	$scope.isLoading = true;
	$scope.sessions = [];
	$scope.favorites = [];
	$scope.noDocsFound = "You don't have any favorites yet...";

	if ( utils.hasFavorites() ) {

		SessionsFactory.getFavorites(false).then( function(fav) {

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

	$scope.getClass = function(track) {
		return utils.getColorForTrack(track) + "Border";
	};

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

