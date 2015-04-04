
if(Meteor.isClient){
    Meteor.subscribe("menus");
    Meteor.subscribe("restaurants");
    Meteor.subscribe("orders");
    Meteor.subscribe("staff");
    Meteor.subscribe("orderItems");
    Meteor.subscribe("images")
}
