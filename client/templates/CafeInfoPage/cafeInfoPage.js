/**
 * Created by wazzinw on 3/25/15 AD.
 */

Template.cafeInfoPage.events({

    "click #regis-button": function () {



    }
});

Template.restaurant_info.helpers({
    findRestaurant : function(){
       var restID;
        if(!Meteor.loggingIn() && !Meteor.user()){
           console.log("can't find user");
        }
        else  restID = Meteor.user().profile.restaurant_id;

        return Restaurants.findOne({_id: restID});
    }

});

