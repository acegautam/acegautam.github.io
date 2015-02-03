/*** 	My Calendar specific script 	*/

window.ftuCalendar = (function() {
	var defaultOptions = {
			editable: true,
			header:{
				left:   'title',
			    center: '',
			    right:  ''
			},
			height: 'auto',
			contentHeight: 'auto',
			dayNamesShort: ['S','M', 'T', 'W', 'T', 'F', 'S'],
			eventMouseover: function(event, jsEvent, view) {
	            if (view.name !== 'agendaDay') {
	                $(jsEvent.target).attr('title', event.title);
	            }
	        },
			eventLimit: true // allow "more" link when too many events
		},
		currentDate = new Date(),
		customOptions = {
			defaultDate: '2014-12-12'
		},
		nextMonthDate = {
			defaultDate: currentDate.setMonth(currentDate.getMonth() + 1)
		},
		defaultEventObject = {
			title: 'Default event',
			start: currentDate
		},
		eventOptions = {
			'events': [
				{
					title: 'All Day Event',
					start: '2015-02-15'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2015-02-24'
				}
			]
		},
		allOptions = $.extend(true, {}, defaultOptions, eventOptions),
		nextMonthOptions = $.extend(true, {}, defaultOptions, nextMonthDate);
		//console.log(allOptions);

		return {
			renderCalendar: function() {
				//	Current month calendar
				var cal1 = $('#currCalendar').fullCalendar(defaultOptions);

				//	Next month calendar
				var cal2 = $('#nextCalendar').fullCalendar(nextMonthOptions);
			}
		};
})();