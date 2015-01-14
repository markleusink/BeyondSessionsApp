angular.module('templates-main', ['partials/about.html', 'partials/feedback.html', 'partials/map.html', 'partials/nownext.html', 'partials/session.html', 'partials/sessions.html']);

angular.module("partials/about.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/about.html",
    "<div class=\"row no-gutter\">\n" +
    "\n" +
    "<div class=\"col-sm-12\">\n" +
    "\n" +
    "	<div class=\"panel panel-default\">\n" +
    "\n" +
    "	<div class=\"panel-body\">\n" +
    "\n" +
    "		<div style=\"margin-bottom:15px\">\n" +
    "			<a href=\"http://www-01.ibm.com/software/collaboration/events/connected/\" target=\"_blank\"><img class=\"img-responsive\" src=\"images/connected.png\" style=\"width:300px\" /></a>\n" +
    "		</div>\n" +
    "\n" +
    "		<p>Hi!</p>\n" +
    "		<p>This is the demo app for our session at <b><a href=\"http://www-01.ibm.com/software/collaboration/events/connected/\" target=\"_blank\">ConnectED 2015</a></b> in January in Orlando: <b>\"The Future of Web Development - Write Once, Run Everywhere with AngularJS and Domino\"</b>. It is build using AngularJS and uses an IBM Domino backend.</p>\n" +
    "\n" +
    "		<p>In our session we're going to talk about building web apps using the AngularJS JavaScript framework, with data coming from a Domino backend using REST. We will show you how an app built like this can run in multiple runtimes, like Domino, Bluemix, Connections, Microsoft Sharepoint and MobileFirst Foundation (previously Worklight).</p>\n" +
    "		\n" +
    "		<p>If you haven't registered for ConnectED yet: \n" +
    "		<a href=\"http://www-01.ibm.com/software/collaboration/events/connected/\" target=\"_blank\">register now</a> and we'll see you on Monday at 3:45 PM at the Swan - Toucan 1-2. It'll be worth it!\n" +
    "		</p>\n" +
    "\n" +
    "		<div class=\"row\" style=\"margin-top:15px\">\n" +
    "			<div class=\"col-xs-6 text-center\">\n" +
    "				<a href=\"http://xomino.com\"  target=\"_blank\">\n" +
    "					<img width=\"90\" height=\"90\" src=\"images/marky.jpg\" alt=\"That's what Marky looks like\" class=\"img-circle img-rounded\" /><br />\n" +
    "					Mark Roden\n" +
    "				</a>\n" +
    "			</div>\n" +
    "			<div class=\"col-xs-6 text-center\">\n" +
    "				<a href=\"http://linqed.eu\" target=\"_blank\">\n" +
    "					<img width=\"90\" height=\"90\" src=\"images/mark.jpg\" alt=\"That's what Mark looks like\" class=\"img-circle img-rounded\" /><br />\n" +
    "					Mark Leusink\n" +
    "				</a>\n" +
    "			</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div class=\"small well well-sm\" style=\"margin-top:10px\">\n" +
    "\n" +
    "			<img src=\"images/beer.jpeg\" class=\"img-rounded pull-right\" width=\"80\" style=\"margin-left:10px;\" />\n" +
    "\n" +
    "			<p>Here comes the fine print...</p>\n" +
    "			\n" +
    "			<p>\n" +
    "				We did our best. Worked our ass off. But take absolutely no liability for the accurateness of the data in this app. Or if the app will work at all. It probably will. We hope (if it doesn't: please <a ui-sref=\"feedback\" title=\"Feedback\">let us know</a>). If you want the ConnectED session data used by this app in a comfortable Notes database, check out the <a href=\"http://matnewman.com/webs/personal/matblog.nsf/dx/announcing-the-availability-of-the-totally-unofficial-totally-unsupported-ibm-connected-session-database\" target=\"_blank\">Totally Unofficial Totally Unsupported IBM ConnectED Session Database</a> by Mat Newman and others.\n" +
    "			</p>			\n" +
    "			<p>\n" +
    "				Oh, and if you want to know more about how this app was built: talk to us if you see us walking around. That's what a conference is all about (you seriously thought it was the sessions?). We are not scary and will talk for <i class=\"fa fa-beer\"></i> beer <i class=\"fa fa-smile-o\"></i>\n" +
    "			</p>\n" +
    "			<p>\n" +
    "				This source code of this app is publicly available on <a href=\"https://github.com/markleusink/BeyondSessionsApp\" target=\"_blank\"><i class=\"fa fa-github\"></i>GitHub</a>.\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("partials/feedback.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/feedback.html",
    "<div class=\"row\">\n" +
    "\n" +
    "<div class=\"col-sm-12\">\n" +
    "\n" +
    "	<form name=\"feedbackForm\" ng-submit=\"submit()\">\n" +
    "\n" +
    "		<p style=\"margin-top:10px\">\n" +
    "			We love to hear what you think about this app. Got remarks? Suggestions? Please let us know!\n" +
    "		</p>\n" +
    "\n" +
    "		<div ng-show=\"!submitted\" class=\"msgBox\">\n" +
    "\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"name\">Name</label>\n" +
    "				<input id=\"name\" ng-model=\"name\" class=\"form-control\" required></input>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\">\n" +
    "				<label for=\"feedback\">Feedback</label>\n" +
    "				<textarea ng-model=\"feedback\" id=\"feedback\" class=\"form-control\" style=\"height:100px\" required></textarea>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"form-group\">\n" +
    "				<button class=\"btn btn-primary\" type=\"submit\">\n" +
    "				<i class=\"fa fa-rocket\"></i>Send it!</button>\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-show=\"submitted\" class=\"alert alert-info msgBox\">\n" +
    "			Got it. Thanks for that!\n" +
    "		</div>\n" +
    "\n" +
    "	</form>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("partials/map.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/map.html",
    "<div class=\"row\">\n" +
    "\n" +
    "<div class=\"boootcards-cards col-sm-12\" style=\"padding-top:15px\">\n" +
    "\n" +
    "	<div class=\"panel panel-default\">\n" +
    "\n" +
    "	  <img src=\"images/m-swball.gif\" class=\"img-responsive\"/>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("partials/nownext.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/nownext.html",
    "<div class=\"row no-gutter\">\n" +
    "<div class=\"col-sm-12 sessions\">\n" +
    "\n" +
    "	<div style=\"margin-left: 15px;\"><h4>Now ({{sessionsNow.length}})</h4></div>\n" +
    "\n" +
    "	<div ng-show=\"sessionsNow.length == 0\" class=\"alert alert-info\">No sessions running at this time</div>\n" +
    "\n" +
    "	<div ng-show=\"sessionsNow.length > 0\">\n" +
    "		<a ng-repeat=\"session in sessionsNow | orderBy :'startTime' track by $index\" class=\"list-group-item\"\n" +
    "			ng-class=\"getClass(session.track)\"\n" +
    "			ui-sref=\"sessionDetails({ sessionId : session.unid })\">\n" +
    "\n" +
    "			<div class=\"marker\" ng-class=\"getBackgroundClass(session.track)\"></div>\n" +
    "\n" +
    "			<div class=\"label label-warning pull-right\" title=\"{{session.runsFor + ' minutes left'}}\">{{session.runsFor}}\"</div>\n" +
    "			\n" +
    "			<h4 class=\"list-group-item-heading\">{{::session.title}}</h4>\n" +
    "			<p class=\"list-group-item-text\">{{::session.startTime | date : 'EEE HH:mm'}} | {{::session.room}} | {{::session.sessionId}}</p>\n" +
    "		</a>\n" +
    "\n" +
    "	</div> \n" +
    "\n" +
    "	<div style=\"margin-left: 15px;\"><h4>Next ({{sessionsNext.length}})</h4></div>\n" +
    "\n" +
    "	<div ng-show=\"sessionsNext.length == 0\" class=\"alert alert-info\">Nothing's coming up. You're done for the day!</div>\n" +
    "\n" +
    "	<div ng-show=\"sessionsNext.length > 0\">\n" +
    "		<a ng-repeat=\"session in sessionsNext | orderBy :'startTime' track by $index\" class=\"list-group-item\"\n" +
    "			ng-class=\"getClass(session.track)\"\n" +
    "			ui-sref=\"sessionDetails({ sessionId : session.unid })\">\n" +
    "\n" +
    "			<div class=\"marker\" ng-class=\"getBackgroundClass(session.track)\"></div>\n" +
    "			\n" +
    "			<div class=\"label label-primary pull-right\" title=\"{{'Starting in ' + session.startsIn + ' minutes'}}\">{{session.startsIn}}\"</div>\n" +
    "		\n" +
    "			<h4 class=\"list-group-item-heading\">{{::session.title}}</h4>\n" +
    "			<p class=\"list-group-item-text\">{{::session.startTime | date : 'EEE HH:mm'}} | {{::session.room}} | {{::session.sessionId}}</p>\n" +
    "		</a>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "</div>");
}]);

angular.module("partials/session.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/session.html",
    "<div class=\"row no-gutter\">\n" +
    "\n" +
    "	<div class=\"col-sm-12\">\n" +
    "\n" +
    "		<div class=\"panel panel-default\">\n" +
    "\n" +
    "			<div class=\"panel-heading\" ng-class=\"getBackgroundClass(session.track)\">\n" +
    "		  		<h4>{{session.title}}</h4>\n" +
    "				<div><small>{{::session.startTimeDesc}} - {{::session.endTimeDesc}} in {{::session.room}} | {{::session.sessionId}}</small></div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div class=\"panel-body\">\n" +
    "\n" +
    "				<div style=\"margin-bottom:10px\">\n" +
    "					\n" +
    "					<button class=\"pull-right btn\" ng-class=\"{'btn-default' : !session.isFavorite, 'btn-primary btn-flip' : session.isFavorite}\" ng-click=\"toggleFavorite()\">\n" +
    "						<i class=\"fa\" ng-class=\"session.isFavorite ? 'fa-star' : 'fa-star-o'\"></i>Favorite\n" +
    "					</button>\n" +
    "\n" +
    "					<a class=\"btn btn-default\" href=\"javascript:history.go(-1);\"><i class=\"fa fa-angle-left\"></i>Back</a>\n" +
    "				</div>\n" +
    "\n" +
    "				<div>\n" +
    "					{{::session.description}}\n" +
    "				</div>\n" +
    "\n" +
    "				<div style=\"margin:10px 0\"><a ui-sref=\"sessionsByTrack({trackId: session.track})\"><span class=\"label\" ng-class=\"getBackgroundClass(session.track)\">{{::session.track}}</span></a></div>\n" +
    "\n" +
    "				<div style=\"margin: 10px 0; font-weight: bold;\"><u>Speakers</u></div>\n" +
    "\n" +
    "				<div class=\"row\" ng-repeat=\"speaker in session.speakers\">\n" +
    "			\n" +
    "					<div class=\"col-xs-12 col-sm-12\">\n" +
    "						{{speaker}}\n" +
    "					</div>\n" +
    "			\n" +
    "				</div>\n" +
    "\n" +
    "			</div>\n" +
    "\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/sessions.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/sessions.html",
    "<div class=\"row no-gutter\">\n" +
    "\n" +
    "	<div class=\"col-sm-12 no-gutter sessions\">\n" +
    "\n" +
    "		<div ng-show=\"isLoading\" class=\"list-group-item\">\n" +
    "			<div><i class=\"fa fa-spin fa-refresh\"></i>Loading...</div>\n" +
    "		</div>\n" +
    "\n" +
    "		<div ng-show=\"!isLoading && sessions.length == 0\" class=\"list-group-item\">{{noDocsFound}}</div>\n" +
    "\n" +
    "		<div ng-show=\"!isLoading && sessions.length > 0\">\n" +
    "\n" +
    "			<div ng-show=\"allowSearch\">\n" +
    "				<input class=\"form-control\" ng-model=\"searchField\" placeholder=\"Search...\" />\n" +
    "			</div>\n" +
    "\n" +
    "			<a ng-repeat=\"session in sessions | orderBy : 'startTime' | filter : searchField track by session['@unid']\" \n" +
    "				class=\"list-group-item\" 	\n" +
    "				ui-sref=\"sessionDetails({ sessionId : session.unid })\">\n" +
    "\n" +
    "				<div class=\"marker\" ng-class=\"getBackgroundClass(session.track)\"></div>\n" +
    "\n" +
    "				<i class=\"pull-right no-text fa \" ng-class=\"isFavorite(session) ? 'fa-star' : 'fa-angle-right'\"></i>\n" +
    "\n" +
    "				<h4 class=\"list-group-item-heading\">{{::session.title}}</h4>\n" +
    "				<!-- <p class=\"list-group-item-text\">{{::session.sessionId}}</p> -->\n" +
    "				<p class=\"list-group-item-text\">{{::session.startTimeDesc}} - {{::session.endTimeDesc}} | {{::session.room}} | {{::session.sessionId}}</p>\n" +
    "\n" +
    "			</a>\n" +
    "			\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "</div>");
}]);
