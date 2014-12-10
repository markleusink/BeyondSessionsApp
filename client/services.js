
var app = angular.module("sessionsApp.services", []);

app.factory('SessionsFactory', function($http, dasBaseUrl, utils) {

	return {

		all : function() {

			return $http.get(dasBaseUrl + 'collections/name/sessionsAll?count=1000', {cache: true})
			.then( function(res) {
				return res.data;
			});

		},

		getByDay : function(dayId) {

			return $http.get(dasBaseUrl + 'collections/name/sessionsByDay?count=1000&category=' + dayId, {cache: true})
			.then( function(res) {
				return res.data;
			});

		},

		getByID : function(sessionId) {

			return $http.get(dasBaseUrl + 'documents/unid/' + sessionId, {cache: true})
			.then( function(res) {
				//if 'speakers' is a string: make it an array
				if (typeof res.data.speakers == 'string') {
					res.data.speakers = [res.data.speakers];
				}
				return res.data;
			});

		}, 

		getFavorites : function(doCache) {

			var favoritesUnid = utils.getFavoritesUnid();

			if (favoritesUnid == null) {
				console.log('no favorites cookies');
				return [];
			} else {

				console.log('load favorites');

				return $http.get( dasBaseUrl + 'documents/unid/' + favoritesUnid)
				.then( function(res) {

					console.log('favorites loaded');

					if (typeof res.data.favorites == 'string') {
						return [res.data.favorites];
					} else {
						return res.data.favorites;
					}
				});


			}

			
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

		saveFavorites : function(unid, favorites) {

			var config = {
				headers:  {
					'X-HTTP-Method-Override' : 'PATCH'
			    }
			};

			return $http.post( dasBaseUrl + 'documents/unid/' + unid, { 'favorites' : favorites}, config)
			.then (function(response) {
				console.log('done patching favorites document...');
			});

		}


	};

});
