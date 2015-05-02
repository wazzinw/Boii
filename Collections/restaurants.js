Restaurants = new Mongo.Collection('restaurants');

Meteor.methods({
    restaurantInsert: function(restAttributes) {
        //check(Meteor.userId(), String);
        var user = Meteor.user();
        var id = Restaurants.insert(restAttributes);
        console.log(id);
        Meteor.users.update( { _id: Meteor.userId() }, { $set: { "profile.restaurant_id" : id}} );

         },

    deleteMenuID: function(id, newArray){
        //check(id, String);
        //check(newArray, [String]);
        console.log("input array: "+ newArray.length);
        Restaurants.update(
            {_id: id},
            { $set: { menu: newArray }});
    },
    addMenuID: function(id, menu_id){
       //check(id, String);
       //check(menu_id, String);
        console.log("menu_id: "+ menu_id);
        Restaurants.update({_id: id},
            { $push: { menu: menu_id }});
    },
    restaurantUpdate: function(id,restAttributes) {
        //check(Meteor.userId(), String);
        console.log(restAttributes);
        Restaurants.update({_id: id}, {$set: restAttributes});
    }

});


var PhoneSchema = new SimpleSchema({
    type: {
        type: String,
        max: 100,
        allowedValues: ['work', 'home']
    },
    number: {
        type: String,
        max: 20,
        min: 8,
        regEx: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{2,3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    }
});

var AddressSchema = new SimpleSchema({
    number: {
        type: String,
        max: 10
    },
    floor: {
        type: String,
        max: 3
    },
    building: {
        type: String,
        max: 100,
        optional: true
    },
    street: {
        type: String,
        max: 100
    },
    subDistrict: {
        type: String,
        max: 100
    },
    district: {
        type: String,
        max: 100
    },
    province: {
        type: String,
        max: 50
    },
    country: {
        type: String,
        max: 100
    },
    postalCode: {
        type: String,
        regEx: /^[0-9]{5}$/
    }
});

RestaurantsSchema =  new SimpleSchema({
    name: {
        type: String,
        label: "Restaurant name"
    },
    pic_url: {
        type: String,
        label: "reference to the picture url",
        optional: true
    },
    beacon_major: {
        type: String,
        min: 0,
        max: 65535,
        label: "majorID of iBeacon",
        optional: true
    },
    beacon_minor: {
        type: String,
        label: "minorID of iBeacon",
        min: 0,
        max: 65535,
        optional: true
    },
    email: {
        type: String,
        label: "Restaurant Email",
        regEx: SimpleSchema.RegEx.Email

    },
    address: {
        type: [AddressSchema],
        label: "Address"
    },
    phone_numbers:{
        type: [PhoneSchema],
        label: "Contact"
    },
    menu:{
        type: [String],
        label: "reference to menuID",
        optional: true
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
    require_beacon: {
        type: Boolean,
        label: "Require Beacon"
    },

    ad_phrase:{
        type: String,
        label: "Advertisement Phrase when in range of iBeacon",
        optional: true
    }
});

Restaurants.attachSchema(RestaurantsSchema);
