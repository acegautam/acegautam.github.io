/*** 	Add Bill Controller 	***/

(function() {
	'use strict';

	App.CalendarController = Ember.ArrayController.extend({
		addedBills: [],
		reviewedBills:{
			forCurrMonth: [],
			forNextMonth: [],
			forOtherMonths: []
		},
		counter: 0,
		title: "Set Up Your Calender",
		connectBillData: {},

		dataLength: function() {
			return this.get('length');
		}.property('length'),

		billsCount: function(){
			return this.get('model.length');
		}.property('@each'),

		addedBillsCount: function(){
			return this.addedBills.length;
		}.property('@addedBills'),

		actions:{
			addBill: function(){
				var currentCounter	= this.counter,
					currentBill 	= this.model[currentCounter];

				this.addedBills.pushObject(currentBill);
				this.set('counter', this.counter + 1);

				//	pin bill to calendar
				this._pinBillToCalendar(currentBill);
				this._renderNextBill(currentBill);
			},
			showNext: function(){
				var currentCounter	= this.counter,
					currentBill 	= this.model[currentCounter];

				this.set('counter', this.counter + 1);
				this._renderNextBill(currentBill);
			},
			showConnect: function(billItem){
				console.log('billItem', billItem);
				if(!($('#connectBillId_'+billItem.id).hasClass('connected'))){
					this.set('connectBillData',billItem);
					$('.setupcal').hide();
					$('.connectDetails').hide();
					$('#connectBillStep1').show();
					$('#connectBillStep2').hide();
					$('#connectBillStep3').hide();
					//$('#billConnectedMsg').hide();
					$('#txtUsername').val('');
					$('#txtPassword').val('');
					$('.connectInnerDiv').removeClass('selected');
					$('#connectBillId_'+billItem.id).addClass('selected');

				}
				this.set('title','Connect Your Bills');
				$('#step1').removeClass('active');
				$('#step2').addClass('active');
			},

			showSecurityQuestion: function(){
				var username = $('#txtUsername').val();
				var password = $('#txtPassword').val();
				if(username !=='' && password !== ''){
					$('#secAns').val('');
					$('.setupcal').hide();
					$('#connectBillStep1').hide();
					$('#connectBillStep2').show();
					$('#connectBillStep3').hide();
				}
				else{
					alert("Enter username and password");
				}
				
			},
			connectBill: function(billItem){
				var secAns = $('#secAns').val();
				if(secAns !== ''){
					$('.setupcal').hide();
					$('#connectBillStep1').hide();
					$('#connectBillStep2').hide();
					$('#connectBillStep3').show();
					$('#connectBillId_'+billItem.id).removeClass('selected');
					Ember.$.getJSON('bills.json').then(function(data) {
						setTimeout(function(){ 
							$('#connectBillId_'+billItem.id).addClass('connected billSelected');
							$('#connectBillId_'+billItem.id + ' i.fa').addClass('fa-flag');
							$('#connectBillStep3').hide();
							//$('#billConnectedMsg').show();
						}, 6000);
					});
				}
				else{
					alert("Answer the security question to connect");
				}
			}
		},
		_pinBillToCalendar: function(bill) {
			var dueDate = new Date(bill.estDueDate),
				dueMonth = dueDate.getMonth(),
				currMonth = new Date().getMonth(),
				forCurrMonth = (dueMonth === currMonth),
				forNextMonth = (dueMonth === currMonth + 1),
				targetCalendarObj = (forCurrMonth) ? $('#currCalendar') : $('#nextCalendar'),
				eventObject = {
					title: bill.name,
					start: dueDate
				};

			targetCalendarObj.fullCalendar('renderEvent', eventObject, true);
		},
		_setScreenMappings: function() {
			AppConstants.deployScreenFor[AppConstants.STEPS.Step_Connect_Bill_Start] = this._switchToConnectBillStart;
		},
		_renderNextBill: function(currentBill) {
			//	TODO: temp call - to be removed later
			this._setScreenMappings();

			$('.billId_' + currentBill.id).hide();
			if(this.counter >= this.model.length){
				this._switchToNextStep(AppConstants.STEPS.Step_Connect_Bill_Start);
				return;
			}				
			$('.billId_' + this.model[this.counter].id).show('slow');
		},
		_switchToNextStep: function(step) {
			AppConstants.deployScreenFor[step]();
		},
		_switchToConnectBillStart: function() {
			$('h4.title').text('Connect Your Bills');
			$('.stepdetails.step1').removeClass('active');
			$('.stepdetails.step2').addClass('active');
			$('.addBillDetailsBox').addClass('hidden');
			$('.connectDetailsBox').removeClass('hidden');
		}
	});

})();