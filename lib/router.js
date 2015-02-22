
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
Router.route('/api/restaurants/:limit/:skip', {where: 'server'})
  
  .get(function(){
     var json = {};
     var limit = parseInt(this.params.limit);
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
Router.route('/api/menus', {where: 'server'})
  
  .get(function(){
     var json = {};
     var data = Menus.find({}, {sort : {name: -1} }).fetch(); 
     var status = this.response.statusCode;
     json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }

        console.log(json.status);

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json,null,2));

  });

Router.route('/api/menus/:id', {where: 'server'})
  
  .get(function(){
     var json = {};
     var data = Restaurants.findOne({_id: this.params.id});
     var status = this.response.statusCode;


     this.response.setHeader('Content-Type', 'application/json');

        if(!data) {
            json.data = 'No records found';
            json.status = '404';
        }
        else{
            json.data = data;
            json.status = status;
        }

        this.response.end(JSON.stringify(json,null,2));
  });

//get food/drink list
Router.route('/api/menus/type/:type', {where: 'server'})

    .get(function(){
        //var type = this.params.type.toString();
       // console.log(type);
        var json = {};
        var data = Menus.find({categ: this.params.type}, {sort : {name: -1} }).fetch();
        var status = this.response.statusCode;
        var hasNext = true;

        json.data = data;
        json.status = status;
        json.hasNext = hasNext;

        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json,null,2));
    });



//get promotion
Router.route('/api/promotion', {where: 'server'})

    .get(function(){
        var json = {};
        var data = Menus.find({promotion: 'true'}, {sort : {name: -1} }).fetch();

        json.data = data;
        json.status = status;
        json.hasNext = true;

        if(data.length == 0){
            json.hasNext = false;
        }

        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify(json,null,2));

    });