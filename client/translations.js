var app = angular.module("sessionsApp");

app.config( function($translateProvider) {

	$translateProvider.translations('en', {
		BACK : 'Back',
		SEARCH : 'Search',
		ABOUT : 'Welcome',
		NOWNEXT : "Now & Next",
		ALLSESSIONS : "All sessions",
		SESSION : "Session",
		MAP : "Floorplan",
		SESSIONS : "Sessions",
		FEEDBACK : 'Feedback',
		SESSIONSBYDAY : "Sessions by day",
		SESSIONSBYTRACK : "Sessions by track",
		FAVORITES : "Favorites",
		FAVORITE : "Favorite",
		SPEAKERS : "Speakers",
		MONDAY : 'Monday',
		TUESDAY : 'Tuesday',
		WEDNESDAY : 'Wednesday',
		THURSDAY : 'Thursday',
		FRIDAY : 'Friday',
		SATURDAY : 'Saturday',
		SUNDAY : 'Sunday',
		THU : 'Thu',
		FRI : 'Fri',
		NOW : 'Now',
		NEXT : 'Next',
		LOADING : "Loading",
		NODESCRIPTION : '(no description provided)',
		SENDIT : "Send it!",
	    BUTTON_LANG_EN: 'english',
	    BUTTON_LANG_DE: 'german',
	    GOLDEN_ROOM : 'Golden Room',
	    ABOUT_FULL : "<p>Hi!</p><p>This is the demo app for my session's in March 2015 at the ICS User Group event in Bremen and Engage in Ghent. The session is similar to the one I did with Mark Roden at <b><a href=\"http://www-01.ibm.com/software/collaboration/events/connected/\" target=\"_blank\">ConnectED 2015</a></b> in January in Orlando: <b>\"The Future of Web Development - Write Once, Run Everywhere with AngularJS and Domino\"</b>. The demo app is build using AngularJS and uses an IBM Domino backend. The session data comes from the ICS UG event.</p>" +
		"<p>In my session I'm going to talk about building web apps using the AngularJS JavaScript framework, with data coming from a Domino backend using REST. I'll show you how an app built like this can run in multiple runtimes, like Domino, Bluemix, Connections, Microsoft Sharepoint and MobileFirst Foundation (previously Worklight).</p>" +
		"<p>If you haven't registered yet, do that now for the <a href=\"http://www.ics.ug/en\" target=\"_blank\">ICS User Group</a> or <a href=\"http://engage.ug\" target=\"_blank\">Engage</a> and hopefully I'll see you there. It'll be worth it!</p>"
	 });
	  $translateProvider.translations('de', {
	  	BACK : 'Zurück',
	  	SEARCH : 'Suchen',
	  	ABOUT : 'Wilkommen',
	  	ALLSESSIONS : "Alle Sessions",
	  	SESSION : "Session",
	  	MAP : "Floorplan",
	  	SESSIONS : "Sessions",
	  	FEEDBACK : 'Feedback',
	  	SESSIONSBYDAY : "Sessions bei Tag",
	  	SESSIONSBYTRACK : "Sessions bei Track",
	  	FAVORITES : "Favoriten",
	  	FAVORITE : "Favorit",
	  	SPEAKERS : "Sprecher",
	  	NOWNEXT : "Jetzt & später",
	  	MONDAY : 'Montag',
		TUESDAY : 'Dienstag',
		WEDNESDAY : 'Mittwoch',
		THURSDAY : 'Donnerstag',
		FRIDAY : 'Freitag',
		SATURDAY : 'Samstag',
		SUNDAY : 'Sontag',
		THU : 'Do',
		FRI : 'Fr',
		NOW : 'Jetzt',
		NEXT : 'Später',
		LOADING : "wird geladen",
		NODESCRIPTION : '(keine Beschreibung zur Verfügung gestellt)',
		SENDIT : "Senden",
	    BUTTON_LANG_EN: 'englisch',
	    BUTTON_LANG_DE: 'deutsch',
	    GOLDEN_ROOM : 'Goldener Saal',
	    ABOUT_FULL : "<p>Hallo!</p>" + 
"<p>Dies ist die Demo-App für meine Session im März 2015 bei der ICS-User-Group-Veranstaltung in Bremen und Engage in Ghent. Die Sitzung ist ähnlich wie die, welche ich mit Mark Roden auf der <b><a href=\"http://www-01.ibm.com/software/collaboration/events/connected/\" target=\"_blank\">ConnectED</a></b> in Januar in Orlando gehalten habe: <b>\"The Future of Web Development - Write Once, Run Everywhere with AngularJS and Domino\"</b>. Die Demo-App ist mit AngularJS entwickelt und verwendet ein IBM Domino-Backend. Die Session-Informationen kommen von der ICS UG Veranstaltung.</p>" + 
"<p>In meiner Session werde ich über das Erstellen von Web-Anwendungen, die mithilfe des AngularJS-JavaScript-Framework, mit Daten aus einem Domino-Backend mit REST sprechen. Ich zeige Ihnen, wie eine App wie folgt gebaut, in mehreren Instanzen, wie Domino, Bluemix, Connections, Microsoft Sharepoint und MobileFirst Foundation (zuvor Worklight) ausgeführt werden kann.</p>" + 
"<p>Wenn Sie noch nicht angemeldet haben, können Sie es jetzt für die <a href=\"http://www.ics.ug/en\" target=\"_blank\">ICS User Group</a> oder <a href=\"http://engage.ug\" target=\"_blank\">Engage</a> tun und ich hoffe wir sehen uns dort. Es wird es Wert sein!</p>"
	  });
	  $translateProvider.preferredLanguage('en');

});