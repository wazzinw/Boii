
if(Meteor.isClient){
    Meteor.subscribe("menus");
    Meteor.subscribe("restaurants");
    Meteor.subscribe("orders");
    Meteor.subscribe("customers");
    Meteor.subscribe("staff");
    Meteor.subscribe("orderItems");
}

