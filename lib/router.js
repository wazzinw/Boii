Router.configure({
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});
// Wait for a subscription before rendering
// HINT:
//// waitOn can return any object with a reactive ready() function
//// you could also return an array with those objects e.g. [Authors.find(), Posts.find()]



/*Router.onBeforeAction(function (){

 if (!Meteor.user()) {
 // if the user is not logged in, render the Login template
 this.render('mainPage');
 } else {
 // otherwise don't hold up the rest of hooks or our route/action function from running
 this.next();
 }
 });*/

Router.onBeforeAction('loading');

Router.map(function(){
    this.route('mainPage', {path: '/'});

    this.route('menuPage',
        {path: '/menu',

            before: function() {
                if(!Meteor.loggingIn() && !Meteor.user()) {
                    this.redirect("login");
                }else{
                    if(!Restaurants.findOne({_id: Meteor.user().profile.restaurant_id})){
                        this.redirect("cafeRegisterPage");
                    }

                    this.next();
                }
            },
        data: function () {
            templateData = Meteor.user();
            return templateData;
        },
        fastRender: true

        });

    this.route('orderListPage', {path: '/orders',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("login");
            }else {
                if(!Restaurants.findOne({_id: Meteor.user().profile.restaurant_id})){
                    this.redirect("cafeRegisterPage");
                }
                this.next();
            }
        },
        data: function () {
            templateData = Meteor.user();
            return templateData;
    }, fastRender: true
    });

    this.route('reportPage', {path: '/report',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("login");
            }else this.next();
        },
        data: function () {
            templateData = Meteor.user();
            return templateData
        }, fastRender: true
    });

    this.route('cafeInfoPage', {path: '/cafeInfo',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("login");
            }else this.next();
        },
        data: function () {
            templateData = Meteor.user();
            return templateData;
        },
        fastRender: true
    });

    this.route('cafeRegisterPage', {path: '/cafeRegister',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("login");
            }else this.next();
        },
        data: function () {
            templateData = Meteor.user();
            return templateData;
        },
        fastRender: true});
    //this.route('restDashboardPage', {path: '/restDashboard'});

    this.route('overview');

});




