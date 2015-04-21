
Meteor.methods({
	'pushOrderUpdate': function(id){
	var apn = Meteor.npmRequire('apn')
		var path = Meteor.npmRequire('path')
		console.log("path="+process.cwd());
		var appRootPath = "assets/app/"
		var options = {
			cert: appRootPath + "boii_aps_cer.pem",
			key: appRootPath +  "boii_aps_key.pem",
			passphrase: "boiisusu",
			production: false
		}
		var apnConnection = new apn.Connection(options)

		//Get user of current order
		try {

			var order = Orders.findOne({_id: id});
			if (order) {
				//Set deviceToken
				var user = Meteor.users.findOne({_id: order.customer_id});

				if (user) {
					console.log("Sending push to deviceToken="+user.profile.deviceToken+ " with status="+order.order_status);
					var myDevice = new apn.Device(user.profile.deviceToken);		
					//Send push notification
					var note = new apn.Notification();
					note.sound = "default";
					note.alert = "Order " + order.confirm_code + " has been " + order.order_status ;
					note.payload = {'order_id': order._id, 'order_status': order.order_status};

					apnConnection.pushNotification(note, myDevice);
				}
			}
		} catch (e) {
			console.log(e);
		}
		
	}
});
