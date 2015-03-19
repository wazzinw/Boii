Template.overview.helpers({
	orders: function(){
		return Orders.find();
	},
	menus: function(){
		return Menus.find();
	},
	restaurant: function(){
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
	restaurant: function(){
		return Restaurants.find();
	},
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
	restaurant: function(){
		return Restaurants.find();
	},
	orderItems: function(){
		return OrderItems.find();
	}
});