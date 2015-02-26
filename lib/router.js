








Router.configure({
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout'

});

/*Router.onBeforeAction(function () 

 if (!Meteor.user()) {
 // if the user is not logged in, render the Login template
 this.render('Login');
 } else {
 // otherwise don't hold up the rest of hooks or our route/action function
 from running
 this.next();
 }
 });*/

Router.map(function(){
    this.route('hello', {path: '/'});
    this.route('menuPage', {path: '/menu'});
    this.route('orderList', {path: '/orders'});
    this.route('reportPage', {path: '/report'});
    this.route('cafeInfo', {path: '/cafeInfo'});
});


//restaurant with limit
Router.route('/api/restaurants', {where: 'server'})

    .get(function(){
        var json = {};
        var limit, skip;
        var query = this.params.query;

        if ( query.limit ) {
            limit = parseInt(query.limit);
            console.log(limit);
        } else {
            //default
            limit = 5;
            console.log('default');
        }
        if ( query.skip ) {
            skip = parseInt(query.skip);
        } else {
            skip = 0;
        }

        var data = Restaurants.find({}, {sort : {name: -1}, limit : limit, skip: skip }).fetch();
        var status = this.response.statusCode;

        json.data = data;
        json.status = status;

        json.hasNext = false;

        if(data.length < json.total){
            json.hasNext = true;
        }
        json.meta = {};
        json.meta.limit = limit;
        json.meta.next = "/api/restaurants?limit=" + limit + "&skip=" + (skip+5);
        json.meta.skip = skip;
        json.meta.previous = "/api/restaurants?limit=" + limit + "&skip=" + skip;
        json.meta.totalCount = Restaurants.find({}).count();


        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json,null,2));

    });

Router.route('/api/restaurants/:id', {where: 'server'})

    .get(function(){
        var json = {};
        var data = Restaurants.findOne({_id: this.params.id});
        var status = this.response.statusCode;

        json.data = data;
        json.status = status;


        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json,null,2));
    });

//Menu API
Router.route('/api/restaurants/:id/menus', {where: 'server'})

    .get(function() {
        var type, promotion;
        var query = this.params.query;
        var json = {}, restaurant_menu =[];
        var menuID_array = Restaurants.findOne({_id: this.params.id}).menu;


        var status = this.response.statusCode;

        if(query.type) {

            for (var i = 0; i < menuID_array.length; i++) {
                var menu = Menus.findOne({_id: menuID_array[i]._id, type: String(query.type)});

                if(menu){
                    restaurant_menu.push(menu);
                }

            }

        }else if(query.promotion){
            for (var i = 0; i < menuID_array.length; i++) {
                var menu = Menus.findOne({_id: menuID_array[i]._id, promotion: true});

                if(menu){
                    restaurant_menu.push(menu);
                }


            }
        }
        else{
            for (var i = 0; i < menuID_array.length; i++) {

                var menu = Menus.findOne({_id: menuID_array[i]._id});

                if(menu){
                    restaurant_menu.push(menu);
                }

            }
        }

        json.data = restaurant_menu;
        json.status = status;
        json.hasNext = true;

        /*if(data.length == 0){
         json.hasNext = false;
         }*/

        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json,null,2));

    });


//Order API

    Router.route('/api/orders', {where: 'server'})

    .post(function(){

            var genCode  = function(){
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for( var i=0; i < 4; i++ )
                    text += possible.charAt(Math.floor(Math.random() * possible.length));

                return text;
            };

            var calculatePrice = function(itemsArray){
                var sum = 0;

                for( var i = 0; i < itemsArray.length; i++){
                    var menu = Menus.findOne(itemsArray[i].menu_id ,{fields: {_id: 0, name: 0, pic_url: 0, promotion: 0,
                        valid_until: 0, type: 0, restaurant_name: 0}})

                    sum += itemsArray[i].quantity * menu.price;

                }
                return sum;
            };

            var insertOrder = this.request.body;
            console.log(this.request);

            var code = genCode();
            //var total = calculatePrice(insertOrder.orderItems);

            //insert menu items into the OrderItems collection
            Orders.insert({
                customer_id: insertOrder.customer_id,
                paid: false,
                total_price: 20,
                order_status: insertOrder.status,
                ordered_at: new Date().toJSON(),
                confirm_code: code,
                orderItems: insertOrder.orderItems
                });

            json = {};
            json.status = this.response.statusCode;
            json.success = false;
            json.orderCode = code;

            this.response.setHeader('Content-Type', 'application/json');
            this.response.end(JSON.stringify(json,null,2));
        });


Router.route('/api/orders/:id', {where: 'server'})
//edit order
    .put(function(){

        var json = {};
        //var data = Orders.findOne({_id: this.params.id});
        var status = this.response.statusCode;
        newOrder = this.response.body;
        json.data = data;
        json.status = status;

        Orders.update({_id: this.params.id},
            {$set:{ orderItems : newOrder.orderItems}

            }
        );


        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json,null,2));
    })
//remove order
    .delete(function(){
        this.response.statusCode = 200;
        this.response.setHeader("Content-Type", "application/json");
        //this.response.setHeader("Access-Control-Allow-Origin", "*");
        //this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        this.response.end('Result of deleting post is ' + JSON.stringify(
            Orders.remove({_id: this.params.id })
        ));

    });





