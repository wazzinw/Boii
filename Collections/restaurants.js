Restaurants = new Mongo.Collection('restaurants');

var PhoneSchema = new SimpleSchema({
    type: {
        type: String,
        max: 100
    },
    number: {
        type: String,
        max: 20,
        min:8

    }
});

var AddressSchema = new SimpleSchema({
    number: {
        type: String,
        max: 5
    },
    floor: {
        type: String,
        max: 5
    },
    building: {
        type: String,
        max: 100
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
        label: "time of creation"

    },
    updated_at: {
        type: Date,
        label: "time of update"

    }

});

Restaurants.attachSchema(RestaurantsSchema);
