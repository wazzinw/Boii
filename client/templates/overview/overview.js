Template.overview.helpers({
	orders: function(){
		return Orders.find();
	},
	menus: function(){
		return Menus.find();
	},
	restaurants: function(){
		return Restaurants.find();
	},
	orderItems: function(){
		return OrderItems.find();
	}
});

Template.orderSection.helpers({
	orders: function(){
		return Orders.find();
	},
	menus: function(){
		return Menus.find();
	},
	restaurants: function(){
		return Restaurants.find();
	},
	orderItems: function(){
		return OrderItems.find();
	}
});
Template.orderItemSection.helpers({
	orderItems: function(){
		return OrderItems.find();
	}
});
Template.menuSection.helpers({
	orders: function(){
		return Orders.find();
	},
	menus: function(){
		return Menus.find();
	},
	restaurants: function(){
		return Restaurants.find();
	},
	orderItems: function(){
		return OrderItems.find();
	}
});
Template.restaurantSection.helpers({
	restaurants: function(){
		return Restaurants.find();
	}
});