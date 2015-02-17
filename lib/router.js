
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






//get drink list
Router.route('/api/drink', {where: 'server'})
     
     .get(function(){

     json = {};
     var data = Menus.find({categ: 'drink'}, {sort : {name: -1} }); 
     var status = this.response.statusCode;
     var hasNext = true;
     
     json.data = data;
     json.status = status;
     json.hasNext = hasNext;

     if(data.length == 0){
      json.hasNext = false;
     }

     

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));
   });
     
     


//get food list
Router.route('/api/food', {where: 'server'})
  
  .get(function(){
     result = {};

     var data = Menus.find({categ: 'food'}, {sort : {name: -1} }).fetch(); 
     var status = this.response.statusCode;
     var hasNext = true;

     result.data = data;
     result.status = status;
     
     if(data == null){
      result.hasNext = false;
     }
     
     result.hasNext = hasNext;

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(result));

  });
  
  

//get promotion
Router.route('/api/promotion', {where: 'server'})
  
  .get(function(){
     json = {};
     var data = Menus.find({promotion: 'true'}, {sort : {name: -1} }).fetch(); 

     json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }
     console.log(data.length);
     //json.hasNext = hasNext;

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));

  });

//restaurant
Router.route('/api/restaurant', {where: 'server'})
  
  .get(function(){
     json = {};
     var data = Restaurant.find({}, {sort : {name: -1} }).fetch(); 
     var status = this.response.statusCode;
     json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));

  });

Router.route('/api/restaurant/:id', {where: 'server'})
  
  .get(function(){
     json = {};
     var data = Restaurant.findOne({_id: this.params.id}); 
     var status = this.response.statusCode;
     
     json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));
  });

//Menu API
Router.route('/api/menus', {where: 'server'})
  
  .get(function(){
     json = {};
     var data = Menus.find({}, {sort : {name: -1} }).fetch(); 
     var status = this.response.statusCode;
     json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));

  });

Router.route('/api/menus/:id', {where: 'server'})
  
  .get(function(){
     json = {};
     var data = Restaurant.findOne({_id: this.params.id}); 
     var status = this.response.statusCode;
     
     json.data = data;
     json.status = status;
     json.hasNext = true;

     if(data.length == 0){
       json.hasNext = false;
     }

     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));
  });

