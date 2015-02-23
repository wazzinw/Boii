/**
 * Created by wazzinw on 2/18/15 AD.
 */

//Restaurants
/*
 _id: ,
 name: ,
 beaconID: ,
 email: ,
 address: ,
 menu: [ObjectID()]
 phone: [{ type: , number: }]*/

if(Restaurants.find().count() == 0) {
    Restaurants.insert(
        {

            name: 'MK',
            beaconID: '123456',
            email: 'mk@gmail.com',
            address: 'Siam Center',
            phone: [{type: 'work', number: '021678345'}],
            menu: []

        }
    );
    Restaurants.insert(

        {

            name: 'McDonald',
            beaconID: '123456',
            email: "mcD@gmail.com",
            address: 'Siam Center' ,
            phone: [{type: 'work', number: '021678345'}],
            menu: []

        }
    );

    Restaurants.insert(

        {

            name: 'KFC',
            beaconID: '235656',
            email: 'kfc@gmail.com',
            address: 'Siam Center' ,
            phone:
                [{ type: 'work' , number: '021678345' }],
            menu : []
        }


    );


}

//Menu

/*_id: ,
 name: ,
 pic_url: ,
 promotion: ,
 valid_until: ,
 price: ,
 type:
 restaurant_name:,
 */

if(Menus.find().count() == 0){

    data =  [{
        //_id: ObjectID('AAAA'),
        name: 'McChicken',
        pic_url: null,
        promotion: true,
        valid_until: new Date(2015,2,3).toJSON(),
        price: 20 ,
        type: 'food',
        restaurant_name: 'McDonald'

    },

        {
            // _id: ObjectID('BBBB'),
            name: 'McFish',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 20 ,
            type: 'food',
            restaurant_name: 'McDonald'


        },

        {
            //_id: ObjectID('AAAA'),
            name: 'McHappy',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 100 ,
            type: 'food',
            restaurant_name: 'McDonald'

        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Est',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 60 ,
            type: 'drink',
            restaurant_name: 'McDonald'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Roasted Duck',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 200 ,
            type: 'drink',
            restaurant_name: 'MK'


        },

        {
            //_id: ObjectID('AAAA'),
            name: 'Dim Sum',
            pic_url: null,
            promotion: true,
            valid_until: new Date(2015,2,3).toJSON(),
            price: 100 ,
            type: 'food',
            restaurant_name: 'MK'

        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Watermelon Juice',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 20 ,
            type: 'drink',
            restaurant_name: 'MK'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Apple Juice',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 20 ,
            type: 'drink',
            restaurant_name: 'MK'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Chicky',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 200 ,
            type: 'drink',
            restaurant_name: 'KFC'


        },

        {
            //_id: ObjectID('AAAA'),
            name: 'Ice Cream',
            pic_url: null,
            promotion: true,
            valid_until: new Date(2015,2,3).toJSON(),
            price: 10 ,
            type: 'food',
            restaurant_name: 'KFC'

        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Sprite',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 30 ,
            type: 'drink',
            restaurant_name: 'KFC'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Milo',
            pic_url: null,
            promotion: false,
            valid_until: '',
            price: 30 ,
            type: 'drink',
            restaurant_name: 'KFC'


        }];


    for(var i = 0; i < data.length; i++){

        Menus.insert(data[i]);
        console.log("Number of Menus: " + Menus.find().count());
    }

}



Restaurants.update({name: 'MK'},
    {$addToSet: { menu : {$each: Menus.find({restaurant_name: 'MK'},{fields: {name: 0, pic_url: 0, promotion: 0,
        valid_until: 0, price: 0, type: 0, restaurant_name: 0}}).fetch()} } }
);

Restaurants.update({name: 'McDonald'},
    {$addToSet: { menu : {$each: Menus.find({restaurant_name: 'McDonald'}, {fields: {name: 0, pic_url: 0, promotion: 0,
        valid_until: 0, price: 0, type: 0, restaurant_name: 0}}).fetch()} } }
);

Restaurants.update({name: 'KFC'},
    {$addToSet: { menu : {$each: Menus.find({restaurant_name: 'KFC'}, {fields: {name: 0, pic_url: 0, promotion: 0,
        valid_until: 0, price: 0, type: 0, restaurant_name: 0}}).fetch()} } }
);

//Order

/*
 {
 _id: ,
 custID: ,
 paymentInfo: ,
 total: ,
 status: ,
 date: ,
 time: ,
 confirm_code: ,
 orderItems: [ ObjectID: ,ObjectID: ]
 }

 orderItems
 {
 _id: ,
 name: ,
 quantity: ,
 price:

 }

 */

//Customers
