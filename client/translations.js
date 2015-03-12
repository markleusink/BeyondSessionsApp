var app = angular.module("sessionsApp");

app.config( function($translateProvider) {

	$translateProvider.translations('en', {
		BACK : 'Back',
		SEARCH : 'Search',
		ABOUT : 'Welcome',
		NOWNEXT : "Now & Next",
		ALLSESSIONS : "All sessions",
		FEEDBACK : 'Feedback',
		SESSIONSBYDAY : "Sessions by day",
		SESSIONSBYTRACK : "Sessions by track",
		FAVORITES : "Favorites",
		MONDAY : 'Monday',
		TUESDAY : 'Tuesday',
		THURSDAY : 'Thursday',
		FRIDAY : 'Friday',
		THU : 'Thu',
		FRI : 'Fri',
		NODESCRIPTION : '(no description provided)',
	    BUTTON_LANG_EN: 'english',
	    BUTTON_LANG_DE: 'german'
	  });
	  $translateProvider.translations('de', {
	  	BACK : 'Zurück',
	  	SEARCH : 'Suchen',
	  	ABOUT : 'Wilkommen',
	  	ALLSESSIONS : "Alle Sessions",
	  	FEEDBACK : 'Rückkopplung',
	  	SESSIONSBYDAY : "Sessions bei Tag",
	  	SESSIONSBYTRACK : "Sessions bei track",
	  	FAVORITES : "Favoriten",
	  	NOWNEXT : "Jetzt & später",
	  	MONDAY : 'Montag',
		TUESDAY : 'Dienstag',
		THURSDAY : 'Donnerstag',
		FRIDAY : 'Freitag',
		THU : 'Do',
		FRI : 'Fr',
		NODESCRIPTION : '(keine Beschreibung zur Verfügung gestellt)',
	    BUTTON_LANG_EN: 'englisch',
	    BUTTON_LANG_DE: 'deutsch'
	  });
	  $translateProvider.preferredLanguage('en');

});