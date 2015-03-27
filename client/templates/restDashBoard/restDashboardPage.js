/**
 * Created by wazzinw on 3/27/15 AD.
 */




Template.restDashboardPage.helpers({
    findRestaurant : function(){
        var rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        return Restaurants.find({_id: rest._id});
    },

    countMenu : function(){
        var rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        return rest.menu.length;

    },

    countOrder : function(){
        var rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        var order = Orders.find({
                restaurant_id: rest._id,
                order_status: {$in: ['ready', 'accepted', 'approving']},
            }

        );
        return order.count();

    },

    foodMenu: function(){
        var rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        var menu = Menus.find({restaurant_name: rest.name  ,type:"food"});
        return menu.count();
    },

    drinkMenu: function(){
        var rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        var menu = Menus.find({restaurant_name: rest.name  ,type:"drink"});
        return menu.count();
    }


});