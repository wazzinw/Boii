/**
 * Created by wazzinw on 2/18/15 AD.
 */

//Restaurants
/*
 name: ,
 beacon_major:,
 beacon_minor: ,
 email: ,
 address: ,
 menu: [ObjectID]
 phone: [{ type: , number: }]
 created_at: ,
 updated_at:
 */

if(Restaurants.find().count() == 0) {
    Restaurants.insert(
        {

            name: 'MK',
            beacon_major: '123456',
            beacon_minor: '234516',
            email: 'mk@gmail.com',
            address: 'Siam Center',
            phone_numbers: [{type: 'work', number: '021678345'}],
            menu: [],
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        }
    );

    Restaurants.insert(

        {

            name: 'McDonald',
            beacon_major: '12456',
            beacon_minor: '124456',
            email: "mcD@gmail.com",
            address: 'Siam Center' ,
            phone_numbers: [{type: 'work', number: '021678345'}],
            menu: [],
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        }
    );

    Restaurants.insert(

        {
            name: 'KFC',
            beacon_major: '235656',
            beacon_minor: '333333',
            email: 'kfc@gmail.com',
            address: 'Siam Center' ,
            phone_numbers:
                [{ type: 'work' , number: '021678345' }],
            menu: [],
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()
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
 created_at: ,
 updated_at
 */

if(Menus.find().count() == 0){

    data =  [
        {

            name: 'McChicken',
            pic_url: null,
            promotion: true,
            valid_until: new Date(2015,2,3).toJSON(),
            price: 20 ,
            type: 'food',
            restaurant_name: 'McDonald',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        },

        {

            name: 'McFish',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 20 ,
            type: 'food',
            restaurant_name: 'McDonald',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        },

        {

            name: 'McHappy',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 100 ,
            type: 'food',
            restaurant_name: 'McDonald',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        },

        {

            name: 'Est',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 60 ,
            type: 'drink',
            restaurant_name: 'McDonald',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        },

        {

            name: 'Roasted Duck',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 200 ,
            type: 'drink',
            restaurant_name: 'MK',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        },

        {

            name: 'Dim Sum',
            pic_url: null,
            promotion: true,
            valid_until: new Date(2015,2,3).toJSON(),
            price: 100 ,
            type: 'food',
            restaurant_name: 'MK',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        },

        {

            name: 'Watermelon Juice',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 20 ,
            type: 'drink',
            restaurant_name: 'MK',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        },

        {

            name: 'Apple Juice',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 20 ,
            type: 'drink',
            restaurant_name: 'MK',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        },

        {

            name: 'Chicky',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 200 ,
            type: 'drink',
            restaurant_name: 'KFC',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        },

        {

            name: 'Ice Cream',
            pic_url: null,
            promotion: true,
            valid_until: new Date(2015,2,3).toJSON(),
            price: 10 ,
            type: 'food',
            restaurant_name: 'KFC',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()

        },

        {

            name: 'Sprite',
            pic_url: null,
            promotion: false,
            valid_until: null,
            price: 30 ,
            type: 'drink',
            restaurant_name: 'KFC',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        },

        {

            name: 'Milo',
            pic_url: null,
            promotion: false,
            valid_until: '',
            price: 30 ,
            type: 'drink',
            restaurant_name: 'KFC',
            created_at: new Date().toJSON(),
            updated_at: new Date().toJSON()


        }];


    for(var i = 0; i < data.length; i++){
        Menus.insert(data[i]);
        console.log("Number of Menus: " + Menus.find().count());
    }

}

var rest = ['MK', 'McDonald', 'KFC'];
rest.forEach(function(restname){
    var menusToAdd = Menus.find({restaurant_name: restname}, {fields:{_id:1}}).fetch();
    var menuIds = menusToAdd.map(function(value, index, array){
        return value._id;
    });


    Restaurants.update({name: restname},
        {$set: { menu : menuIds} }
    ); 
})


// Restaurants.update({name: 'McDonald'},
//     {$addToSet: { menu : {$each: Menus.find({restaurant_name: 'McDonald'},
//         {fields: {name: 0, pic_url: 0, promotion: 0,
//              valid_until: 0, price: 0, type: 0, restaurant_name: 0}}).fetch()} } }
// );

// Restaurants.update({name: 'KFC'},
//     {$addToSet: { menu : {$each: Menus.find({restaurant_name: 'KFC'},
//         {fields: {name: 0, pic_url: 0, promotion: 0,
//             valid_until: 0, price: 0, type: 0, restaurant_name: 0}}).fetch()} } }
// );

