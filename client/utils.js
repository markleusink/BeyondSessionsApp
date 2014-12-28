
var app = angular.module("sessionApp.utils", []);

app.factory('utils', function(ipCookie) {

	var favoritesCookieName = 'favoritesUnid';

	return {

		hasFavorites : function() {
			var favoritesUnid = this.getFavoritesUnid();
			var hasFavorites = favoritesUnid != null && favoritesUnid.length>0;
			//console.log('user has favorites? ' + hasFavorites);
			return hasFavorites;
		},

		getFavoritesUnid : function() {
			return ipCookie(favoritesCookieName);
		},

		setFavoritesUnid : function(id) {
			ipCookie(favoritesCookieName, id, {path : '/', expires: 365} );
		},

		getColorForTrack : function(trackName) {

			if (!trackName) {
				return 'blue';
			}

			if (trackName.indexOf('Best Practices')>-1) {
				return 'green';
			} else if (trackName.indexOf('Application Development')>-1) {
				return 'amber';
			} else if (trackName.indexOf('Beyond')>-1) {
				return 'red';
			} else if (trackName.indexOf('Spotlight')>-1) {
				return 'gray';
			} else if (trackName.indexOf('Featured')>-1) {
				return 'pink';
			} else if ( trackName.indexOf('Strategy') > -1) {
				return 'deeporange';
			} else if ( trackName.indexOf('Partner') > -1) {
				return 'teal';
			} else if ( trackName.indexOf('Partner') > -1) {
				return 'purple';
			} else if ( trackName.indexOf('Infrastructure') > -1) {
				return 'lightgreen';
			} else if (trackName.indexOf('Master Classes')>-1) {
				return 'lime';
			} else {
				console.log('no track color found for track ' + trackName);
				return 'blue';
			}
		},

		getFullDayName : function(dayNo) {

			switch (dayNo) {
				case '0':
					return "Sunday";
				case '1':
					return "Monday";
				case '2':
					return "Tuesday";
				case '3':
					return "Wednesday";
				case '4':
					return "Thursday";
				case '5':
					return "Friday";
				case '6':
					return "Saturday";
				default:
					return "?";
			}

		}

	};

});