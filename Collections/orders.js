Orders = new Mongo.Collection('orders');
var OrdersSchema = new SimpleSchema({

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

Orders.attachSchema(OrdersSchema);
