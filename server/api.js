


HTTP.publish({collection: Customers}, function(data){
	return Customers.find({});
});

/*
HTTP.publish({collection: Orders}, function(data){
	return Orders.find({});
});

HTTP.publish({collection: OrderItems}, function(data){
    return OrderItems.find({});
});
*/


