
if(Meteor.isServer){

    Meteor.startup(function(){
        Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({extended: false}));

    });

    Meteor.users.allow({
        update: function (userId, user) {
            return userId === user._id;
        }
    });

    Meteor.publish('menus', function() {
        if (this.userId) {
            var restID = Meteor.users.findOne({_id: this.userId}).profile.restaurant_id;
            var restName = Restaurants.findOne({_id: restID}).name;
        }
        return Menus.find({restaurant_name: restName});
    });

    Meteor.publish('restaurants', function() {
        if (this.userId) {
            var restID = Meteor.users.findOne({_id: this.userId}).profile.restaurant_id;
        }
        return Restaurants.find({_id: restID});
    });

    Meteor.publish('orders', function() {

        if (this.userId) {
            var restID = Meteor.users.findOne({_id: this.userId}).profile.restaurant_id;
        }
       if(restID)
            return Orders.find({restaurant_id: restID}, {limit: 10, sort: {updated_at: -1}});
        else return Orders.find();

    });


    Meteor.publish('orderItems', function() {

        return OrderItems.find({});
    });

    Meteor.publish('myOrders', function() {
        return Orders.find({customer_id: this.userId});
    })

};





