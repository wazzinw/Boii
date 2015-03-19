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
        label: "restaurant name"
    },

    beacon_major: {
        type: String,
        label: "majorID of iBeacon"
    },

    beacon_minor: {
        type: String,
        label: "minorID of iBeacon"
    },

    email: {
        type: String,
        label: "email restaurant"
    },

    address: {
        type: String,
        label: "restaurant address"
    },


    phone_numbers:{
        type: [PhoneSchema],
        label: "reference to menuID"

    },
    menu:{
        type: [String],
        label: "reference to menuID"
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
