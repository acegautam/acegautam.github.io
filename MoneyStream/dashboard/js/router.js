/*** 	Ember Router script 	***/

(function() {
	'use strict';
	
	App.Router.map(function() {
		this.route('calendar');
	});

	//	Calendar Route
	App.CalendarRoute = Ember.Route.extend({
		model: function() {
			var url = 'bills.json';
			return Ember.$.getJSON(url).then(function(data) {
				console.log('DATA', data);
				return data;
			});
		}
	});

	// Index route
	App.IndexRoute = Em.Route.extend({
	    redirect: function(){
	        this.transitionTo('calendar');
	    }
	});
})();