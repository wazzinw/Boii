/**
 * Created by wazzinw on 2/20/15 AD.
 */


Customers = new Mongo.Collection('customers');
Menus = new Mongo.Collection('menus');
Orders = new Mongo.Collection('orders');
OrderItems = new Mongo.Collection('orderItems');
Staff = new Mongo.Collection('staff');
Restaurants = new Mongo.Collection('restaurants');

//Order

/*
 {
 _id: ,
 customer_id: ,
 payment_info: ,
 total_price: ,
 status: ,
 ordered_at: ,
 confirm_code: ,
 orderItems_id: [ ObjectID: ,ObjectID: ]
 }

 orderItems
 {
 _id: ,
 item_name: ,
 quantity: ,
 price:

 }

 */

//Customers

var Schemas = {};

Schemas.Orders = new SimpleSchema({
    payment_status: {
        type: String,
        label: "paid, unpaid",
        max: 200
    },
    total_price: {
        type: Number,
        label: "total_price",
        min: 0
    },
    order_status: {
        type: String,
        label: "order status: finished, processing, queueing",
        max: 200
    },
    ordered_at: {
        type: Date,
        label: "ordered date and time",
        optional: true
    },

    confirm_code: {
        type: String,
        label: "confirmation code for picking up the order"

    },
    orderItems_id:{
        type: [Object],
        label: "reference to the order items for an order"



    }
});

Schemas.OrderItems =  new SimpleSchema({
    item_name: {
        type: String,
        label: "name of the menu ordered",
        max: 200
    },
    item_price: {
        type: Number,
        label: "price of the item",
        min: 0
    },
    quantity: {
        type: String,
        label: "order status: finished, processing, queueing",
        max: 200
    },

});



Orders.attachSchema(Schemas.Orders)
OrderItems.attachSchema(Schemas.OrderItems);