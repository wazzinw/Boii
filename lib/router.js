
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
            skip = false;
        }

     var json = {};
     //var skip = this.params.skip? parseInt(this.params.skip): parseInt(0) ;
     var data = Restaurants.find({}, {sort : {name: -1}, limit : limit, skip: 0 }).fetch();
     var status = this.response.statusCode;
     //   var total = Restaurants.find().count();
      json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }
        console.log(data.length);
      //  console.log(total);

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


        var promotion
        var status = this.response.statusCode;

        if(query.type) {

            for (var i = 0; i < menuID_array.length; i++) {
               var menu = Menus.findOne({_id: menuID_array[i]._id, categ: String(query.type)});

                if(menu){
                    restaurant_menu.push(menu);
                }

            }

        }else if(query.promotion){
            for (var i = 0; i < menuID_array.length; i++) {
                var menu = Menus.findOne({_id: menuID_array[i]._id, promotion: String(query.promotion)});

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





