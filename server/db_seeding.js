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

if(true){
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

if (Orders.find().count() == 0 ){
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

    var nrand = function(){
        return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
    }

    var users = ['blob','glob','flob','stob','klob'];

    user_ids = users.map(function(value){
        return Accounts.createUser({
            username: value,
            password: 'password',
            email: value+ '@schmoe.com',

        })
    });

    console.log(user_ids);

    //random restaurant
    //random number of menus to order
    //random menus
    //make some orders
    restaurants = Restaurants.findOne({name: 'MK'});
    console.log(restaurants);

    var dayInMonth = []; 
    _(12).times(function(n){
        dayInMonth[n] = new Date(2015, n+1, 0).getDate();
    })

    _(10).times(function(n){
        // var idx = Math.floor(Math.random() * restaurants.length);
        // console.log(idx);
        rest = restaurants
        console.log(rest.name);

        //random num menu order
        var menuToOrder = Math.floor(Math.random() * 3) + 1;
        var menu = rest.menu;
        var menuIds = [];
        menu.sort( function() { return 0.5 - Math.random() });
        console.log("making order for rest" + rest.name);
        menu.slice(0,menuToOrder).forEach(function(value){
            console.log(value);
            var item_id =  OrderItems.insert({
                menu_id: value,
                quantity: 1
            });

            console.log("item id="+item_id);
            menuIds.push(item_id);
        });
        console.log("menu id "+menuIds);
        //random month
        var month = Math.floor(Math.random() * 3);
        //random day
        var day = Math.floor(Math.random() * dayInMonth[month]);
        //random time of day 10 - 22
        var hour = Math.floor(nrand() * 12) + 10;

        //add Order
        Orders.insert({
            customer_id: user_ids[Math.floor(Math.random() * user_ids.length)],
            restaurant_id: rest._id,
            orderItems: menuIds,
            created_at: new Date(2015,month,day,hour),
            updated_at: new Date(2015, month, day, hour),
            order_status: 'collected'
        });


    });


}
}







