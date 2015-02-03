/*** 	Add Bill Helper 	***/

(function() {
	'use strict';
	
	Handlebars.registerHelper('bill_section_tag_start', function(options) {
		var index = options.data.view.contentIndex,
			item = this.model[index],
			showBillStyle = (index === 0) ? 'style="display:block;"' : 'style="display:none;"';
		return new Handlebars.SafeString(
			'<div class="billDet billId_' + item.id +'" '+ showBillStyle +'>'
		);
	});

	Handlebars.registerHelper('canDisplay', function(options) {
		var index = options.data.view.contentIndex,
			counter = this.counter;
		console.log('index', index, 'counter', counter);

		if(index !== counter){
			return 'style="display: none;"';
		}
		
	});

	Ember.Handlebars.helper('highlight', function(value, options) {
	  var escaped = Handlebars.Utils.escapeExpression(value);
	  console.log('this', this);
	  console.log('escaped', escaped);
	  return new Ember.Handlebars.SafeString('<span class="highlight">' + escaped + '</span>');
	});

	Handlebars.registerHelper('estimatedDueDay', function(options) {
		var item = this.model[this.counter-1],
			dueDay = new Date(item.estDueDate).getDate();

		return dueDay;
	});

	Ember.Handlebars.helper('currMonthName', function(options) {
		var objDate = AppConstants.currentDate,
		    locale = AppConstants.locale,
		    month = objDate.toLocaleString(locale, { month: "long" });

		return month;
	});

	Ember.Handlebars.helper('nextMonthName', function(options) {
		var objDate = AppConstants.nextMonthDate,
		    locale = "en-us",
		    month = objDate.toLocaleString(locale, { month: "long" });

		return month;
	});
	
	Handlebars.registerHelper('addId', function(options) {
		var index = options.data.view.contentIndex,
			item = this.addedBills[index];
		return new Handlebars.SafeString(
			'<span class="connectInnerDiv" id="connectBillId_' + item.id +'"><i class="fa"></i>'
		);
	});

})();