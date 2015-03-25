/**
 * Created by wazzinw on 2/21/15 AD.
 */

//console.log('order');
//find Menu in the restaurant
Template.orderListPage.helpers({
	orders: function(){
		var rest = Restaurants.findOne({name: "MK"});

		return Orders.find({
				restaurant_id: rest._id,
				order_status: {$in: ['ready', 'accepted', 'approving']},
			},
			{
				sort: {updated_at: -1}
			}
		);
	},
	orderItemWithId: function(id){
		return orderItem = OrderItems.findOne(id);
	},
	menuWithId: function(id){
		return menu = Menus.findOne(id);
	},
	menuWithOrderItemId: function(id){
		var orderItem = OrderItems.findOne(id);
		return Menus.findOne(orderItem.menu_id);
	},
	isReady: function(order_status){
		return order_status === 'ready';
	},
	isAccepted: function(order_status){
		return order_status === 'accepted';
	},
	isApproving: function(order_status){
		return order_status ==='approving';
	}
});

Template.orderListPage.events({
	'click button#bill_but': function(event){
		var order_id = $(event.currentTarget).closest(".order_row").data('id');
		Orders.update({_id: order_id}, {$set: {order_status:'billed'}});
	},
	'click button#accept_but': function(event){
		var order_id = $(event.currentTarget).closest(".order_row").data('id');
		Orders.update({_id: order_id}, {$set: {order_status:'accepted'}});
	},
	'click button#reject_but': function(event){
		var order_id = $(event.currentTarget).closest(".order_row").data('id');
		Orders.update({_id: order_id}, {$set: {order_status:'rejected'}});
	}
});