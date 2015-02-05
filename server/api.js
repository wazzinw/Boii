
Customers = new Mongo.Collection('customers');
Menus = new Mongo.Collection('menus');
Order = new Mongo.Collection('order');
Staff = new Mongo.Collection('staff');
Restaurant = new Mongo.Collection('resturant');

HTTP.publish({collection: Customers}, function(data){
	return Customers.find({});
});

HTTP.publish({collection: Menus}, function(data){
	return Menus.find({});
});

HTTP.publish({collection: Order}, function(data){
	return Order.find({});
});

HTTP.publish({collection: Staff}, function(data){
	return Staff.find({});
});

HTTP.publish({collection: Restaurant}, function(data){
	return Restaurant.find({});
});

