
Meteor.publish('customers', function() { 
	return Customers.find();
});

Meteor.publish('staff', function() { 
	return Staff.find();
});

Meteor.publish('menus', function() { 
	return Menus.find();
});

Meteor.publish('restaurant', function() { 
	return Restaurant.find();
});

Meteor.publish('order', function() { 
	return Order.find();
});