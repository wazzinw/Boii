OrderItems = new Mongo.Collection('orderItems');


OrderItems.attachSchema (  new SimpleSchema({
    menu_id: {
        type: String,
        label: "menu_id"
    },
    quantity: {
        type: Number,
        label: "quantity of the item"
    }

	})
);



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