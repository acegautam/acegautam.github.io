/*** 	Ember Views 	***/

(function() {
	'use strict';
	
	App.CalendarView = Ember.View.extend({
		templateName: 'calendar',
		didInsertElement: function() {
			ftuCalendar.renderCalendar();
		}
	});
	
})();