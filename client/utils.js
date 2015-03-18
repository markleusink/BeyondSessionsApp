
var utils = angular.module("sessionApp.utils", []);

utils.factory('utils', function(localStorageService, $translate) {

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

			if (trackName.indexOf('Other')>-1) {
				return 'red';

			} else if (trackName.indexOf('Admin')>-1) {
				return 'brown';
				//return 'purple';
			} else if (trackName.indexOf('Development')>-1) {
				return 'icsug';
			} else if (trackName.indexOf('Commercial')>-1) {
				return 'amber';
			} else if (trackName.indexOf('Spotlight')>-1) {
				return 'gray';
			} else if (trackName.indexOf('Break')>-1) {
				return 'purple';
				//return 'green';
				//return 'pink';
			} else if ( trackName.indexOf('Strategy') > -1) {
				return 'blue';
				//return 'gray';
				return 'deeporange';
			/*} else if ( trackName.indexOf('Commercial') > -1) {
				//return 'teal';
			//	return 'purple';
			} else if ( trackName.indexOf('Partner') > -1) {
				return 'purple';
			} else if ( trackName.indexOf('Infrastructure') > -1) {
				return 'lightgreen';
			} else if (trackName.indexOf('Master Classes')>-1) {
				return 'lime';
				*/
			} else {
				console.log('no track color found for track ' + trackName);
				return 'blue';
			}
		},

		getFullDayName : function(dayNo) {

			var lan = $translate.use();

			switch (dayNo) {
				case '0':
					return $translate.instant("SUNDAY");
				case '1':
					return $translate.instant("MONDAY");
				case '2':
					return $translate.instant("TUESDAY");
				case '3':
					return $translate.instant("WEDNESDAY");
				case '4':
					return $translate.instant("THURSDAY");
				case '5':
					return $translate.instant("FRIDAY");
				case '6':
					return $translate.instant("SATURDAY");
				default:
					return "?";
			}

		}

	};

});