/**
 * Created by wazzinw on 4/15/15 AD.
 */

Template.loading.helpers({

    checkRest: function(){

        if(Restaurants.findOne(Meteor.user().profile.restaurant_id)){
            console.log("found restaurant");

            return true;
        }
        return false;



    },
    goCafeInfo: function(){
        Router.go('cafeInfoPage');
    }

});