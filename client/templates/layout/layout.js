/**
 * Created by wazzinw on 4/6/15 AD.
 */

Template.layout.helpers({
    newOrder : function(){
        var restID = Meteor.user().profile.restaurant_id;
        var newOrder = Orders.find({restaurant_id: restID, order_status: 'approving'});
        return newOrder.count();
    }

});

Template.registerHelper('equals',
    function(v1, v2) {
        return (v1 === v2);
    }
);

