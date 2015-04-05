Router.configure({
    notFoundTemplate: 'notFound',
    layoutTemplate: 'layout',
    loadingTemplate: 'loading'
});
// Wait for a subscription before rendering
// HINT:
//// waitOn can return any object with a reactive ready() function
//// you could also return an array with those objects e.g. [Authors.find(), Posts.find()]


Router.onBeforeAction('loading');

Router.onBeforeAction('dataNotFound', {only: 'menuInfo'});

var requireLogin = function() { if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
    } else {
        this.render('accessDenied');
    }
} else {
    this.next(); }
};

Router.map(function(){
    this.route('mainPage', {path: '/'});

    this.route('menuPage',
        {path: '/menus',

            before: function() {
                if(!Meteor.loggingIn() && !Meteor.user()) {
                    this.redirect("entrySignIn");
                }else if(!Meteor.loggingIn() && !Restaurants.findOne({_id: Meteor.user().profile.restaurant_id})){
                        this.redirect("cafeRegisterPage");
                    }
                else{
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
                this.redirect("entrySignIn");
            }else if(!Meteor.loggingIn() && !Restaurants.findOne({_id: Meteor.user().profile.restaurant_id})){
                this.redirect("cafeRegisterPage");
            }
            else{
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
                this.redirect("entrySignIn");
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
                this.redirect("entrySignIn");
            }else this.next();
        },
        data: function () {
            //return Restaurants.findOne(this.params._id)
        },
        fastRender: true
    });

    this.route('cafeEdit', {path: '/cafeInfo/edit',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("entrySignIn");
            }else this.next();
        },
        data: function () {
           return Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        },
        fastRender: true});

    this.route('cafeRegisterPage', {path: '/cafeRegister',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("entrySignIn");
            }else this.next();
        },
        data: function () {
            templateData = Meteor.user();
            return templateData;
        },
        fastRender: true});


    this.route('overview');

    this.route('menuInfo', {path: '/menus/:_id',
        before: function() {
            if(!Meteor.loggingIn() && !Meteor.user()) {
                this.redirect("entrySignIn");
            }else this.next();
        },
        data: function() {
            return Menus.findOne(this.params._id)
        },

        fastRender: true});

    this.route('/menus/:_id/edit', {
        name: 'menuEdit',
        data: function() { return Menus.findOne(this.params._id); }
    });

});




