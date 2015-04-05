/**
 * Created by wazzinw on 3/25/15 AD.
 */

Meteor.subscribe("Images");

Template.cafeInfoPage.events({

    "click #regis-button": function () {

    }
  /*  "click #edit_info_butt": function(){

        if($('#edit_info_butt').text() === 'Edit'){
            $('#edit_info_butt').text('Done');
            $('#cafe-info').find('p').text("").append('<input type="text" value="hello"/>');
        }else{
            $('#edit_info_butt').text('Edit');
        }
    }*/
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


