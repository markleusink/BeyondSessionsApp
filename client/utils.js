
var app = angular.module("sessionApp.utils", []);

app.factory('utils', function(ipCookie) {

	var favoritesCookieName = 'favoritesUnid';

	return {

		hasFavorites : function() {
			var favoritesUnid = this.getFavoritesUnid();
			var hasFavorites = favoritesUnid != null && favoritesUnid.length>0;
			console.log('user has favorites? ' + hasFavorites);
			return hasFavorites;
		},

		getFavoritesUnid : function() {
			return ipCookie(favoritesCookieName);
		},

		setFavoritesUnid : function(id) {
			ipCookie(favoritesCookieName, id, {path : '/', expires: 365} );
		},

		getColorForTrack : function(track) {

			if (!track) {
				return 'blue';
			}

			if (track.indexOf('Best Practices')>-1) {
				return 'green';
			} else if (track.indexOf('Application Development')>-1) {
				return 'orange';
			} else if (track.indexOf('Innovators and Thought Leaders')>-1 || track.indexOf('JumpStarts and Master Classes')>-1) {
				return 'purple';
			} else if (track.indexOf('Business Partner Development Day')>-1) {
				return 'gray';
			} else if ( track.indexOf('Spotlight on IBM Business Partners') > -1) {
				return 'amber';
			} else if ( track.indexOf('Kenexa') > -1) {
				return 'lime';
			} else if ( track.indexOf('Tell') > -1) {
				return 'lime';
			} else {
				return 'blue';
			}
		},

		getFullDayName : function(dayId) {
			switch (dayId) {
				case "mon":
					return "Monday";
				case "tue":
					return "Tuesday";
				case "wed":
					return "Wednesday";
				case "thu":
					return "Thursday";
				case "fri":
					return "Friday";
				case "sat":
					return "Saturday";
				case "sun":
					return "Sunday";
				default:
					return "?";

			}

		}

	};

});