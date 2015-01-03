
var utils = angular.module("sessionApp.utils", []);

utils.factory('utils', function(localStorageService) {

	var favoritesCookieName = 'favoritesUnid';

	return {

		hasFavorites : function() {
			var favoritesUnid = this.getFavoritesUnid();
			var hasFavorites = favoritesUnid != null && favoritesUnid.length>0;
			return hasFavorites;
		},

		getFavoritesUnid : function() {
			return localStorageService.get('favoritesId');
		},

		setFavoritesUnid : function(id) {
			localStorageService.set('favoritesId', id);
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