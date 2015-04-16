/**
 * Created by wazzinw on 4/15/15 AD.
 */

Template.loading.helpers({

    checkRest: function(){

        return Restaurants.findOne(Meteor.user().profile.restaurant_id);

    },
    goCafeInfo: function(){
        Router.go('cafeInfoPage');
    }

});