/**
 * Created by wazzinw on 2/21/15 AD.
 */
var orderVsTime = function(month){
	var data = {};
	var orders = Orders.find({
		created_at: {
			//query for month 3
			$gt: new Date(2015, month-1, 0),
			$lte: new Date(2015, month, 0)
		}
	}, {sort: {created_at: 1}} ).fetch(); //ascending

	data.series = [[]];

	var noOfDays = new Date(2015,month,0).getDate()

	data.labels = _(noOfDays).times( function(n) {
		data.series[0][n] = 0;
		return n+1;
	});

	orders.forEach(function(order, index, array){
		var date = order.created_at.getDate();
		data.series[0][date-1]++;
	});

	new Chartist.Bar('#orderVsTime', data);
}


Template.reportPage.onRendered(function(){
	Meteor.subscribe("orders",[],{
		onReady: function(){
			var data = {};
			var orders = Orders.find({
				created_at: {
					//query for month 3
					$gt: new Date(2015, 2, 0),
					$lte: new Date(2015, 3, 0)
				}
			}, {sort: {created_at: 1}} ).fetch(); //ascending

			data.series = [[]];

			var noOfDays = new Date(2015,3,0).getDate()

			data.labels = _(noOfDays).times( function(n) {
				data.series[0][n] = 0;
				return n+1;
			});

			orders.forEach(function(order, index, array){
				var date = order.created_at.getDate();
				data.series[0][date-1]++;
			});

			new Chartist.Bar('#orderVsTime', data);
		}
	})
});

Template.reportPage.events({
	'change #orderMonthSelector': function (event) {
		// ...
		var select = $('#orderMonthSelector').val();
		console.log("selector change to " +select);
		orderVsTime(select);
	}
});



Template.reportPage.helpers({
	orderVsTime: function(){
		var data = {};
		var orders = Orders.find({
			created_at: {
				//query for month 3
				$gt: new Date(2015, 2, 0),
				$lte: new Date(2015, 3, 0)
			}
		}, {sort: {created_at: 1}} ).fetch(); //ascending

		data.series = [[]];

		var noOfDays = new Date(2015,3,0).getDate()

		data.labels = _(noOfDays).times( function(n) {
			data.series[0][n] = 0;
			return n+1;
		});

		orders.forEach(function(order, index, array){
			var date = order.created_at.getDate();
			data.series[0][date-1]++;
		});

		new Chartist.Bar('#orderVsTime', data);
		return data;
	}
});




