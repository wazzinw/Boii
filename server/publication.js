
if(Meteor.isServer){

    Meteor.startup(function(){
        Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({extended: false}));
    });

    Meteor.publish('customers', function() {
        return Customers.find();
    });

    /*Meteor.publish('staff', function() {
        return Staff.find();
    });*/

    Meteor.publish('menus', function() {
        return Menus.find();
    });

    Meteor.publish('restaurants', function() {
        return Restaurants.find();
    });

    Meteor.publish('orders', function() {
        return Orders.find();
    });

}



