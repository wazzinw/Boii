
Cart = new Mongo.Collection(null);

Push.allow({
	send: function(userId, notification){
		return true;
	}
})