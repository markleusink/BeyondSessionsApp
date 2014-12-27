
var app = angular.module("sessionsApp.services", []);

app.factory('SessionsFactory', function($http, $q, dasBaseUrl, utils) {

	var favorites = [];
	var favoritesLoaded = false;

	return {

		all : function() {

			return $http.get(dasBaseUrl + 'collections/name/sessionsAll?count=1000', {cache: true})
			.then( function(res) {
				return res.data;
			});

		},

		getByDay : function(dayNo) {

			return $http.get(dasBaseUrl + 'collections/name/sessionsAll?count=1000', {cache: true})
			.then( function(res) {

				var filtered = [];
				angular.forEach( res.data, function(session) {
					if (session.dayNo == dayNo) {
						filtered.push(session);
					}
				});
				return filtered;
			});

		},

		getByTrack : function(track) {

			return $http.get(dasBaseUrl + 'collections/name/sessionsAll?count=1000', {cache: true})
			.then( function(res) {

				var filtered = [];
				angular.forEach( res.data, function(session) {
					if (session.track == track) {
						filtered.push(session);
					}
				});
				return filtered;
			});

		},

		getByID : function(sessionId) {

			return $http.get(dasBaseUrl + 'collections/name/sessionsAll?count=1000', {cache: true})
			.then( function(res) {

				for (var i=0; i<res.data.length; i++) {
					if (res.data[i]['@unid'] == sessionId) {
						var session = res.data[i];
						//if 'speakers' is a string: make it an array
						if (typeof session.speakers == 'string') {
							session.speakers = [session.speakers];
						}	
						return session;
					}

				}
				return null;
			});

			/*
			return $http.get(dasBaseUrl + 'documents/unid/' + sessionId, {cache: true})
			.then( function(res) { 
				//if 'speakers' is a string: make it an array
				if (typeof res.data.speakers == 'string') {
					res.data.speakers = [res.data.speakers];
				}
				return res.data;
			});*/

		}, 

		getFavorites : function() {

			var favoritesUnid = utils.getFavoritesUnid();
			var deferred;

			if (favoritesUnid == null) {

				console.log('no favorites cookie');
				deferred = $q.defer();
				deferred.resolve( favorites );
				return deferred.promise;

			} else {

				if (favoritesLoaded) {
					deferred = $q.defer();
					deferred.resolve( favorites );
					return deferred.promise;
				}

				console.log('load favorites');

				return $http.get( dasBaseUrl + 'documents/unid/' + favoritesUnid, {cache : false})
				.then( function(res) {

					console.log('favorites loaded', res.data.favorites);
					favoritesLoaded=true;

					if (typeof res.data.favorites == 'string') {
						favorites = [res.data.favorites];
					} else {
						favorites = res.data.favorites;
					}

					return favorites;
					
				});


			}

			
		},

		getTracks : function() {

			return $http.get(dasBaseUrl + 'collections/name/tracks', {cache: true})
			.then( function(res) {
				return res.data;
			});

		},

		getFavoritesUnid : function() {

			return $http.post(dasBaseUrl + 'documents?form=frmFavorites', { 'a' : 'b'} )
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

			return $http.post( dasBaseUrl + 'documents/unid/' + unid, { 'favorites' : _favorites}, config)
			.then (function(response) {
				console.log('done patching favorites document, new favorites:', _favorites);

				favorites = _favorites;

			});

		},

		saveFeedback : function(form) {

			console.log('saving feedback', form)
		
			return $http.post(dasBaseUrl + 'documents?form=frmFeedback', form );

		}


	};

});
