if (Meteor.isServer) {
    Meteor.startup(function() {

        Restivus.configure({
            useAuth: true,
            prettyJson: true
        });

        //post /api/orders
        Restivus.addRoute('orders', {authRequired: true}, {
            post: {
                action: function () {
                    console.log('Got POST request at /api/orders');

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
                            var menu = Menus.findOne(itemsArray[i].menu_id ,{fields: {_id: 0, name: 0, pic_url: 0, promotion: 0,
                                valid_until: 0, type: 0, restaurant_name: 0}});

                            sum += itemsArray[i].quantity * menu.price;
                        }
                        return sum;
                    };


                    var requestData = this.request.body;
                    console.log(requestData);

                    var orderItems = requestData["orderItems"];
                    var orderItemsIds = orderItems.map(function(value, index, array){
                        return OrderItems.insert(value);
                    });

                    var code = genCode();
                    var order_id = Orders.insert({
                            customer_id: requestData.customer_id,
                            restaurant_id: requestData.restaurant_id,
                            paid: false,
                            total_price: calculatePrice(orderItems),
                            //order_status: requestData.status,
                            created_at: new Date().toJSON(),
                            updated_at: new Date().toJSON(),
                            order_status: "approving",
                            confirm_code: code,
                            orderItems: orderItemsIds
                        });

                    console.log("order_id ="+order_id);

                    if( order_id ) {
                        //if order insert successful
                        return {
                            status: 'success',
                            order_code: code,
                            order_id: order_id
                        }
                    } else {
                        return {
                            statusCode: 404,
                            body: {
                                status: 'fail',
                                message: 'failed to add order'
                            }
                        }
                    }
                }
            },

            get: function() {
                /*
                    input - Restaurants (restaurant_id), Customer (customer_id)
                    output - Order for that restaurants from Customer that is approving or accepted
                */
                // var querySchema = new SimpleSchema({
                //     restaurant_id: {
                //         type: String,
                //         label: "restaurant_id",
                //     }
                // });
                try {
                    var query = this.params.query;
                    console.log("get /api/orders with "+query);

                    // check(query, querySchema)

                    rest_id = query.restaurant_id;
                    statusToInclude = ["accepted", "approving", "ready"]

                    console.log("includeRejected = " +query.includeRejected );
                    if( query.includeRejected === "true" ) {
                        console.log("Including rejected orders");
                        statusToInclude.push("rejected");
                    }

                    var orders = Orders.find({
                            restaurant_id: rest_id, 
                            customer_id: this.userId,
                            order_status: {$in: statusToInclude}
                        },{
                            sort: {created_at: 1}
                        }
                    ).fetch();

                    // Convert OrderItems into iPhone format (list of ids)
                    orders.forEach(function(order, index, array) {
                        // console.log(order)
                        var orderedMenus = [];
                        order.orderItems.forEach(function(orderItemId, idx, arr) {
                            orderItem = OrderItems.findOne(orderItemId)
                            
                            var quantity = orderItem.quantity;
                            for(var i=0; i < quantity; i++){

                                orderedMenus.push(orderItem.menu_id);
                            }
                            // console.log(quantity);
                            // console.log(orderedMenus);
                        });

                        order.orderItems = orderedMenus
                    });

                    return {
                        statusCode: 200,
                        body: {
                            status: "success",
                            data: orders
                        }
                    }
                } catch (e) {
                    return {
                        statusCode: e.error,
                        body: {
                            status: 'fail',
                            message: e.message
                        }
                    }
                }
            }
        });

        //PUT/DELETE /api/orders/:id
        Restivus.addRoute('orders/:id', {authRequired: true}, {
            put: function(){
                console.log("Got PUT request");

                var updatedOrder = this.request.body;

                if(Orders.update({_id: this.params.id},
                        {$set:{ orderItems : updatedOrder.orderItems}}
                    )) {
                    //if order insert successful
                    return {
                        status: 'success'
                       // order_code: code
                    }
                }else {
                    return {
                        statusCode: 404,
                        body: {
                            status: 'fail',
                            message: 'failed to edit order'
                        }
                    }
                }
            },

            delete: function(){
                console.log("Got DELETE request");

                if(Orders.remove({_id: this.params.id })) {
                    return {
                        status: 'success'
                    }
                }
                else {
                    return {
                        statusCode: 404,
                        body: {
                            status: 'fail',
                            message: 'failed to edit order'
                        }
                    }
                }
            }

        });

        Restivus.addRoute('restaurants', {authRequired: false}, {
            get:  function(){
                console.log ("GET request for /api/restaurants");
                    var total = Restaurants.find({}).count();
                    var limit, skip;
                    var query = this.params.query;
                    var filter = {};
                    console.log(query)

                    if ( query.limit ) {
                        limit = parseInt(query.limit);
                        console.log(limit);
                    } else {
                        //default
                        limit = 5;
                        console.log('default');
                    }

                    if( query.beacon_major || query.beacon_minor) {
                        filter.beacon_major = query.beacon_major;
                        filter.beacon_minor = query.beacon_minor;
                    }

                    if( query.id ) filter._id = query.id;
                    

                    if ( query.skip ) {
                        skip = parseInt(query.skip);
                    } else {
                        skip = 0;
                    }
                    var restaurants = Restaurants.find(filter, {sort : {name: -1}, limit : limit, skip: skip }).fetch();

                    if(restaurants){
                        return {
                            status: 'success', data: restaurants,
                            meta: {
                                limit: limit,
                                next: "/api/restaurants?limit=" + limit + "&skip=" + (skip + 5),
                                skip: skip,
                                previous: "/api/restaurants?limit=" + limit + "&skip=" + skip,
                                totalCount: total
                            }
                        }
                    }
                    else{
                        return {
                            statusCode: 404,
                            body: {
                                status: 'fail',
                                message: 'failed to edit order'
                            }
                        }
                    }
                }
        });

         Restivus.addRoute('restaurants/:id', {authRequired: false}, {
            get: function(){
                console.log ("GET request for /api/restaurants/" + this.params.id);

                var data = Restaurants.findOne({_id: this.params.id});

                if(data){
                    return{
                        status: 'success', data: data

                    }
                } else {
                    return{
                        statusCode: 404,
                        body: {
                            status: 'fail',
                            message: 'failed to edit order'
                        }
                    }
                }
            }
        });

        Restivus.addRoute('restaurants/:id/menus', {authRequired: false}, {
            get: function(){
                console.log ("GET request for /api/restaurants/" + this.params.id + "/menus");

                var type, promotion;
                var query = this.params.query;
                var json = {}, restaurant_menu =[];

                if(menuIds = Restaurants.findOne({_id: this.params.id}).menu) {
                    var selector = {};
                    if (query.type) selector.type = query.type;
                    if (query.promotion) selector.promotion = query.promotion;

                    var menu;
                    menuIds.forEach(function(id){
                        selector._id = id;
                        menu = Menus.findOne(selector);
                        if (menu) restaurant_menu.push(menu);
                    });
                    return {
                        status: "success",
                        data: restaurant_menu
                    }
                }else{
                    return{
                        statusCode: 404,
                        body: {
                            status: 'fail',
                            message: 'failed to edit order'
                        }
                    }
                }
            }
        });

        Restivus.addRoute('users', {authRequired: false} ,{
            // CREATE user
            post: function(){
                console.log("POST request for /api/users");
                var params = this.request.body;
                params.role = 'customer';
                var response = {};
                console.log(params);
                var valid = Match.test(params, CreateUserApiSchema)
                //check if params valid
                console.log("is Params valid? "+valid);
                if( valid ){
                    try{
                        var userId = Accounts.createUser(params);
                        if( userId ){
                            var authToken = Accounts._generateStampedLoginToken()
                            Meteor.users.update(userId, {$push: {'services.resume.loginTokens': authToken }});

                            response.statusCode = 200;
                            response.body = {
                                status: "success",
                                userId: userId,
                                authToken: authToken
                            };
                        } else {
                            response.statusCode = 400;
                            response.body = {status: "fail", message: 'failed to create user'};
                        }
                    } catch (e) {
                        console.log(e);
                        return {
                            statusCode: e.error,
                            body: {
                                status: 'fail',
                                message: e.message
                            }
                        }
                    }
                } else {
                    response.statusCode = 400;
                    response.body = {status: "fail", message: 'Invalid parameters'};
                }
                return response;
            },
            //update user e.g. token
            put: function(){
                console.log("PUT request for /api/users");
                var params = this.request.body;
                try {
                    console.log(params);
                    check(params, UpdateUserApiSchema)

                    var userId = this.request.headers['x-user-id']
                    var token = this.request.headers['x-auth-token']
                    console.log(userId)
                    console.log(token)

                    if( userId && token ) {
                        console.log("this user= "+ userId);
                        var user = Meteor.users.findOne({_id: userId});
                        var profile = user.profile;
                        console.log(profile);
                        console.log(user);

                        profile.deviceToken = params.deviceToken;

                        Meteor.users.update({_id: userId}, {$set: {'profile': profile}});

                        console.log(Meteor.users.findOne(userId));

                        return {
                            statusCode: 200,
                            body: {
                                status: 'success',
                            }
                        }
                    } else {
                        console.log("fucking auth requried")
                    }

                    

                } catch (e) {
                    console.log(e)
                    return {
                        statusCode: e.error,
                        body: {
                            status: 'fail',
                            message: e.message
                        }
                    }
                }
            }
        });

    });
}

var CreateUserApiSchema = new SimpleSchema({
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        min: 6,
        max: 40
    },
    role:{
        type: String,
        optional: true
    }
});

var UpdateUserApiSchema = new SimpleSchema({
    deviceToken: {
        type: String,
        label: "APN device token",
        min: 64,
        max: 64
    }
})
