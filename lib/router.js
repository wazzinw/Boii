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
    this.route('overview');
});




