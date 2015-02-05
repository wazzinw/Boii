

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

//get drink list
Router.route('/api/drink', function () {

  	 var json = Menus.find({categ: 'drink'}, {sort : {name: -1} }).fetch(); // what ever data you want to return
     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));
     
}, {where: 'server'});

//get food list
Router.route('/api/food', function () {
  
  var json = Menus.find({categ: 'food'}, {sort : {name: -1} }).fetch(); // what ever data you want to return
     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));

}, {where: 'server'});

//get promotion
Router.route('/api/promotion', function () {
  
  var json = Menus.find({promotion: 'true'}, {sort : {name: -1} }).fetch(); // what ever data you want to return
     this.response.setHeader('Content-Type', 'application/json');
     this.response.end(JSON.stringify(json));

}, {where: 'server'});

}