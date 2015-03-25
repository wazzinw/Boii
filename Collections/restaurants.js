Restaurants = new Mongo.Collection('restaurants');

var PhoneSchema = new SimpleSchema({
    type: {
        type: String,
        max: 100
    },
    number: {
        type: String,
        max: 50
    }
});


RestaurantsSchema =  new SimpleSchema({
    name: {
        type: String,
        label: "Restaurant name"
    },

    beacon_major: {
        type: String,
        label: "majorID of iBeacon",
        optional: true
    },

    beacon_minor: {
        type: String,
        label: "minorID of iBeacon",
        optional: true

    },

    email: {
        type: String,
        label: "Restaurant Email"
    },

    address: {
        type: String,
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
        label: "time of creation"

    },
    updated_at: {
        type: Date,
        label: "time of update"

    }

});

Restaurants.attachSchema(RestaurantsSchema);
