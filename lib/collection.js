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

    customer_id: {
        type: String,
        label: "owner of the menu"
    },

    paid: {
        type: Boolean,
        label: "payment status",
        optional: true

    },

    total_price: {
        type: Number,
        label: "total_price",
        min: 0,
        optional: true

    },

    order_ready: {
        type: Boolean,
        label: "order readiness",
        optional: true

    },

    ordered_at: {
        type: Date,
        label: "ordered date and time"
    },

    confirm_code: {
        type: String,
        label: "confirmation code for picking up the order",
        optional: true

    },

    orderItems:{
        type: [Object],
        label: "reference to the order items for an order"

    }
});

Schemas.OrderItems =  new SimpleSchema({

    order_id: {
        type: String,
        label: "menu_id"
    },
    menu_id: {
        type: String,
        label: "menu_id"
    },

    quantity: {
        type: Number,
        label: "quantity of the item"
    }

});



Orders.attachSchema(Schemas.Orders)
OrderItems.attachSchema(Schemas.OrderItems);

