
/*Customers = new Mongo.Collection('customers');
Menus = new Mongo.Collection('menus');
Order = new Mongo.Collection('order');
Staff = new Mongo.Collection('staff');
Restaurants = new Mongo.Collection('restaurant');*/


HTTP.publish({collection: Customers}, function(data){
	return Customers.find({});
});


HTTP.publish({collection: Orders}, function(data){
	return Orders.find({});
});



