
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
        return Orders.find({
            restaurant_id: Restaurants.findOne({name:"MK"})._id }, 
            {
                limit: 10, 
                sort: {updated_at: -1}
            });
    });
    Meteor.publish('orderItems', function() {
        return OrderItems.find({});
    });

    Meteor.publish('myOrders', function() {
        return Orders.find({customer_id: this.userId});
    })

}



