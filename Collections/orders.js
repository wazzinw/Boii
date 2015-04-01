Orders = new Mongo.Collection('orders');
var OrdersSchema = new SimpleSchema({

    customer_id: {
        type: String,
        label: "owner of the order"
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
    },
    created_at: {
        type: Date,
        label: "ordered date and time",
        denyUpdate: true,
    },
    order_status: {
        type: String,
        label: "status of the order { 'billed','ready', 'accepted', 'rejected', 'approving'} ",
        // allowedValues: ['billed', 'ready', 'accepted','rejected','accepted','approving']
    }
});

Orders.attachSchema(OrdersSchema);

Meteor.methods({
    createOrder: function(params) {
        check(params, OrderParamsSchema); //throws error

        var genCode  = function(){
            var text = "";
            var possible = "0123456789";

            for( var i=0; i < 4; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

        var calculatePrice = function(itemsArray){
            var sum = 0;

            for( var i = 0; i < itemsArray.length; i++){
                var menu = Menus.findOne(itemsArray[i].menu_id);

                sum += itemsArray[i].quantity * menu.price;
            }
            return sum;
        };
        
            var orderItems = params["orderItems"];
            var orderItemsIds = orderItems.map(function(value, index, array){

                return OrderItems.insert(value);
            });


        params.paid = false;
        params.created_at = new Date();
        params.updated_at = params.created_at;
        params.order_status = 'approving';
        params.confirm_code = genCode();
        params.total_price = calculatePrice(params.orderItems);
        params.orderItems = orderItemsIds;
        params.customer_id = this.userId;

        console.log("params= "+params);


        return  Orders.insert(params);
    },
    markOrderReady: function(orderId) {

    },
    markOrderAccepted: function(orderId) {

    },
    markOrderRejected: function(orderId) {

    },
    markOrderBilled: function(orderId) {
        
    }


});

var OrderParamsSchema = new SimpleSchema({
    restaurant_id:{
        type: String,
        label: "restaurant"
    },
    orderItems:{
        type: [Object],
        label: "reference to the order items for an order",
        blackbox: true
    }
})