
Meteor.methods({
	'pushOrderUpdate': function(){
		var apn = Meteor.npmRequire('apn')
		var path = Meteor.npmRequire('path')
		console.log(process.cwd())
		var appRootPath = "../../../../../"
		var options = {
			cert: appRootPath + "private/boii_aps_cer.pem",
			key: appRootPath + "private/boii_aps_key.pem",
			passphrase: "boiisusu",
			production: false
		}
		var apnConnection = new apn.Connection(options)

		var myDevice = new apn.Device("3fa36d95e69e522a0b11856c22a72da26524aee304965c3ded59c5850598e902");
		
		var note = new apn.Notification();
		note.sound = "default";
		note.alert = "Hi boat";
		note.payload = {'order_id': 'adsfjkh23r8offdf', 'order_status':'accepted'};

		apnConnection.pushNotification(note, myDevice);

		return "HEllO"
	}
});
