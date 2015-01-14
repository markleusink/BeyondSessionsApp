
var app = angular.module("sessionsApp.services", []);

app.factory('SessionsFactory', function($http, $q, sessionsRestUrl, favoritesRestUrl, utils, localStorageService) {

	var favorites = [];
	var favoritesLoaded = false;

	//retrieve a specific data type from the localStorage (cached for 60 minutes)
	getFromLocalCache = function(item) {

		var lastUpdate = localStorageService.get( item + 'LastUpdate' );

		if (lastUpdate != null) {
			
			var now = (new Date()).getTime();
			var diff = (now - lastUpdate ) / 1000;

			//console.log('found ' + item + ' in cache, last update: ' + diff + ' seconds ago');

			if (diff < (3600*2)) {		//cache sessions for 2 hours
				return localStorageService.get(item);
			}

		}

		return null;

	};

	getAllSessions = function() {

		var res = getFromLocalCache('sessions');

		if (res != null) {
			var deferred = $q.defer();
			deferred.resolve(res);
			return deferred.promise;
		}

		return $http.get(sessionsRestUrl + 'collections/name/sessionsAll?count=1000')
		.then (function(res) {
			
			localStorageService.set('sessions', res.data);
			localStorageService.set('sessionsLastUpdate', (new Date()).getTime() );

			return res.data;

		});

	};

	return {

		all : function() {

			return getAllSessions()
			.then( function(res) {
				return res;
			});

		},

		getByDay : function(dayNo) {

			return getAllSessions()
			.then( function(res) {

				var filtered = [];
				angular.forEach( res, function(session) {
					if (session.dayNo == dayNo) {
						filtered.push(session);
					}
				});
				return filtered;
			});

		},

		getByTrack : function(track) {

			return getAllSessions()
			.then( function(res) {

				var filtered = [];
				angular.forEach( res, function(session) {
					if (session.track == track) {
						filtered.push(session);
					}
				});
				return filtered;
			});

		},

		getByID : function(sessionId) {

			return getAllSessions()
			.then( function(res) {

				for (var i=0; i<res.length; i++) {
					if (res[i]['@unid'] == sessionId) {
						var session = res[i];
						//if 'speakers' is a string: make it an array
						if (typeof session.speakers == 'string') {
							session.speakers = [session.speakers];
						}	
						return session;
					}

				}
				return null;
			});

		}, 

		getFavorites : function() {

			var favoritesUnid = utils.getFavoritesUnid();
			var deferred;
			var _this = this;

			if (favoritesUnid == null) {

				deferred = $q.defer();
				deferred.resolve( favorites );
				return deferred.promise;

			} else {

				if (favoritesLoaded) {
					deferred = $q.defer();
					deferred.resolve( favorites );
					return deferred.promise;
				}

				//console.log('load favorites');

				return $http.get( favoritesRestUrl + 'documents/unid/' + favoritesUnid, {cache : false})
				.then( function(res) {

					//console.log('favorites loaded', res.data.favorites);
					favoritesLoaded=true;

					if (!res.data.hasOwnProperty('favorites')) {
						favorites = [];
					} else if (typeof res.data.favorites == 'string') {
						favorites = [res.data.favorites];
					} else {
						favorites = res.data.favorites;
					}

					return favorites;
					
				}, function(err) {
					//could not find favorites document (anymore): create a new one

					return _this.getFavoritesUnid()
					.then( function( unid) {
						utils.setFavoritesUnid(unid);
						return _this.getFavorites();

					});

				});


			}

			
		},

		getTracks : function() {

			var res = getFromLocalCache('tracks');

			if (res != null) {
				var deferred = $q.defer();
				deferred.resolve(res);
				return deferred.promise;
			}

			return $http.get(sessionsRestUrl + 'collections/name/tracks')
			.then (function(res) {
				
				localStorageService.set('tracks', res.data);
				localStorageService.set('tracksLastUpdate', (new Date()).getTime() );
				return res.data;

			});

		},

		getFavoritesUnid : function() {
			//create a new favorites document, return the unid

			return $http.post(favoritesRestUrl + 'documents?form=frmFavorites', { 'favorites' : ['']} )
			.then( function(response) {
				//get the unid of the newly created document from the Location header
				var location = response.headers('Location');
				var unid = location.substring( location.lastIndexOf('/')+1);
				return unid;
			}, function(err) {
				console.error(err);
			});
		},

		saveFavorites : function(unid, _favorites) {

			var config = {
				headers:  {
					'X-HTTP-Method-Override' : 'PATCH'
			    }
			};

			var _this = this;

			return $http.post( favoritesRestUrl + 'documents/unid/' + unid, { 'favorites' : _favorites}, config)
			.then (function(response) {
				//console.log('done patching favorites document, new favorites:', _favorites);

				favorites = _favorites;

			});

		},

		saveFeedback : function(form) {
			//we're saving the feedback in the same db as the favorites

			//console.log('saving feedback', form)
		
			return $http.post(favoritesRestUrl + 'documents?form=frmFeedback', form );

		}


	};

});
