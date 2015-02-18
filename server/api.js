
Customers = new Mongo.Collection('customers');
Menus = new Mongo.Collection('menus');
Order = new Mongo.Collection('order');
Staff = new Mongo.Collection('staff');
Restaurant = new Mongo.Collection('restaurant');


HTTP.publish({collection: Customers}, function(data){
	return Customers.find({});
});


HTTP.publish({collection: Order}, function(data){
	return Order.find({});
});



