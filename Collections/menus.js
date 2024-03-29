Menus = new Mongo.Collection('menus');

Meteor.methods({
    menuInsert: function(menuAttributes) {
      //  check(Meteor.userId(), String);
        //var user = Meteor.user();

        var menuID = Menus.insert(menuAttributes);

        var restID = Meteor.user().profile.restaurant_id;

        Meteor.call('addMenuID', restID, menuID,function(error) {
            if (error) return alert(error.reason);
            else console.log("restaurant updated");
        });

    },

    menuDelete: function(id){
       // check(id, String);

        console.log("removed"+ Menus.remove({_id: id}));

        var menuArray = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id}).menu;
        var index = menuArray.indexOf(id);
        console.log("index: "+ index);
        console.log("before: "+ menuArray.length);

        if (index > -1) {
            menuArray.splice(index, 1);
            console.log("after: "+ menuArray.length);

            Meteor.call('deleteMenuID', id,menuArray,function(error) {
                if (error) return alert(error.reason);
                else console.log("SUCCESSFULLY UPDATED!!!!");
            });
        }
        else console.log("id not found");


    },

    menuUpdate: function(menuAttributes,menuId){
        console.log("Updating Menu");
        console.log(menuAttributes);
        Menus.update({_id: menuId}, {$set: menuAttributes});


    }
});

Menus.attachSchema( new SimpleSchema({
    name: {
        type: String,
        label: "name of menu"

    },

    pic_url: {
        type: String,
        label: "reference to the picture url",
        optional: true
    },

    promotion: {
        type: Boolean,
        label: "promotion flag"
    },

    valid_until: {
        type: Date,
        label: "promotion expiration date",
        optional: true
    },

    price: {
        type: Number,
        label: "price of the product",
        min: 0,
        max: 1000000
    },

    type: {
        type: String,
        label: "food/drink",
        allowedValues: ["food", "drink"]

    },

    restaurant_name: {
        type: String,
        label: "name of restaurant",
        max: 50
    },

    created_at: {
        type: Date,
        label: "time of creation",
        denyUpdate: true


    },
    updated_at: {
        type: Date,
        label: "time of update"
    },

    available: {
        type: Boolean,
        label: "menu availability"
    }

})


);
