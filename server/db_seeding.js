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
pic: ,
promotion: ,
valid_until: ,
price: ,
categ: ,
*/

if(Menus.find().count() == 0){

       data =  [{
            //_id: ObjectID('AAAA'),
            name: 'McChicken',
            pic: '',
            promotion: 'true',
            valid_until: new Date(2015,2,3),
            price: '20' ,
            categ: 'food',
            restName: 'McDonald'

        },

        {
           // _id: ObjectID('BBBB'),
            name: 'McFish',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '20' ,
            categ: 'food',
            restName: 'McDonald'


        },

        {
            //_id: ObjectID('AAAA'),
            name: 'McHappy',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '100' ,
            categ: 'food',
            restName: 'McDonald'

        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Est',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '60' ,
            categ: 'drink',
            restName: 'McDonald'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Roasted Duck',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '200' ,
            categ: 'drink',
            restName: 'MK'


        },

        {
            //_id: ObjectID('AAAA'),
            name: 'Dim Sum',
            pic: '',
            promotion: 'true',
            valid_until: '02/08/2015',
            price: '100' ,
            categ: 'food',
            restName: 'MK'

        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Watermelon Juice',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '20' ,
            categ: 'drink',
            restName: 'MK'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Apple Juice',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '20' ,
            categ: 'drink',
            restName: 'MK'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Chicky',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '200' ,
            categ: 'drink',
            restName: 'KFC'


        },

        {
            //_id: ObjectID('AAAA'),
            name: 'Ice Cream',
            pic: '',
            promotion: 'true',
            valid_until: '02/08/2015',
            price: '10' ,
            categ: 'food',
            restName: 'KFC'

        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Sprite',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '30' ,
            categ: 'drink',
            restName: 'KFC'


        },

        {
            // _id: ObjectID('BBBB'),
            name: 'Milo',
            pic: '',
            promotion: 'false',
            valid_until: '',
            price: '30' ,
            categ: 'drink',
            restName: 'KFC'


        }];


    for(var i = 0; i < data.length; i++){

        Menus.insert(data[i]);
        console.log("Number of Menus: " + Menus.find().count());
    }







}


Restaurants.update({name: 'MK'},
    {$addToSet: { menu : {$each: Menus.find({restName: 'MK'}).fetch()} } }
);

Restaurants.update({name: 'McDonald'},
    {$addToSet: { menu : {$each: Menus.find({restName: 'McDonald'}).fetch()} } }
);

Restaurants.update({name: 'KFC'},
    {$addToSet: { menu : {$each: Menus.find({restName: 'KFC'}).fetch()} } }
);

//Order

/*_id: ,
custID: ,
paymentInfo: ,
total: ,
status: ,
date: ,
time: ,
confirm_code: ,
orderItems: [ ObjectID: ,ObjectID: ]

orderItems
{
  _id: ,
  name: ,
  quantity: ,
  price:

}*/

//Customers
