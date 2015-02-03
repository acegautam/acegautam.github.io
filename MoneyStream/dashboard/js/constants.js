/*** 	App Constants 	***/

(function() {
	'use strict';
	
	window.AppConstants = {};
	
	//	Dates
	var currentDate = new Date();
	AppConstants.currentDate = new Date();

	AppConstants.nextMonthDate = currentDate;
	AppConstants.nextMonthDate.setMonth(AppConstants.nextMonthDate.getMonth() + 1);

	//	Locale
	AppConstants.locale = "en-us";

	AppConstants.STEPS = {
		'Step_Add_Bill': 0,
		'Step_Connect_Bill_Start': 1,
		'Step_Enter_Creds': 2,
		'Step_Sec_Question': 3,
		'Step_Connecting': 4
	};

	AppConstants.deployScreenFor = {};
	
})();