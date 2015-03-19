Menus = new Mongo.Collection('menus');


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
        label: "price of the product"
    },

    type: {
        type: String,
        label: "food/drink"
    },

    restaurant_name: {
        type: String,
        label: "name of restaurant"
    },

    created_at: {
        type: Date,
        label: "time of creation"

    },
    updated_at: {
        type: Date,
        label: "time of update"

    }

})


);
