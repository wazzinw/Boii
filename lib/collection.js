/**
 * Created by wazzinw on 2/20/15 AD.
 */


Customers = new Mongo.Collection('customers');
Menus = new Mongo.Collection('menus');
Orders = new Mongo.Collection('orders');
OrderItems = new Mongo.Collection('orderItems');
Restaurants = new Mongo.Collection('restaurants');

//Order

/*
 {
 _id: ,
 customer_id: ,
 payment_info: ,
 total_price: ,
 status: ,
 created_at: ,
 confirm_code: ,
 orderItems_id: [ ObjectID: ,ObjectID: ]
 updated_at
 }

 orderItems
 {
 _id: ,
 quantity: ,
 menu_id
 }

 */

var Schemas = {};

Schemas.PhoneSchema = new SimpleSchema({
    type: {
        type: String,
        max: 100
    },
    number: {
        type: String,
        max: 50
    }
});

Schemas.Orders = new SimpleSchema({

    customer_id: {
        type: String,
        label: "owner of the menu"
    },
    restaurant_id:{
        type: String,
        label: "restaurant"
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
    created_at: {
        type: Date,
        label: "ordered date and time",
        optional: true
    },
    confirm_code: {
        type: String,
        label: "confirmation code for picking up the order",
        optional: true
    },
    orderItems:{
        type: [String],
        label: "reference to the order items for an order"
    },
    updated_at: {
        type: Date,
        label: "updated ordered date and time",
        optional: true
    }
});

Schemas.OrderItems =  new SimpleSchema({
    menu_id: {
        type: String,
        label: "menu_id"
    },
    quantity: {
        type: Number,
        label: "quantity of the item"
    }

});

Schemas.Restaurants =  new SimpleSchema({

/*
 name: ,
 beacon_major:,
 beacon_minor: ,
 email: ,
 address: ,
 menu: [ObjectID]
 phone: [{ type: , number: }]
 created_at: ,
 updated_at:
*/
    name: {
        type: String,
        label: "restaurant name"
    },

    beacon_major: {
        type: String,
        label: "majorID of iBeacon"
    },

    beacon_minor: {
        type: String,
        label: "minorID of iBeacon"
    },

    email: {
        type: String,
        label: "email restaurant"
    },

    address: {
        type: String,
        label: "restaurant address"
    },


    phone_numbers:{
        type: [Schemas.PhoneSchema],
        label: "reference to menuID"

    },
    menu:{
        type: [String],
        label: "reference to menuID"
    },

    created_at: {
        type: Date,
        label: "time of creation"

    },
    updated_at: {
        type: Date,
        label: "time of update"

    }

});


Schemas.Menus =  new SimpleSchema({
    /*
     name: 'Ice Cream',
     pic_url: null,
     promotion: true,
     valid_until: new Date(2015,2,3).toJSON(),
     price: 10 ,
     type: 'food',
     created_at: Date,
     updated_at: Date
*/

    name: {
        type: String,
        label: "name of menu"
    },

    pic_url: {
        type: String,
        label: "reference to the picture url",
        optional: true
    },

    promotion: {
        type: Boolean,
        label: "promotion flag"
    },

    valid_until: {
        type: Date,
        label: "promotion expiration date",
        optional: true
    },

    price: {
        type: Number,
        label: "price of the product"
    },

    type: {
        type: String,
        label: "food/drink"
    },

    restaurant_name: {
        type: String,
        label: "name of restaurant"
    },

    created_at: {
        type: Date,
        label: "time of creation"

    },
    updated_at: {
        type: Date,
        label: "time of update"

    }

    });



Orders.attachSchema(Schemas.Orders);
OrderItems.attachSchema(Schemas.OrderItems);
Restaurants.attachSchema(Schemas.Restaurants);
Menus.attachSchema(Schemas.Menus);

