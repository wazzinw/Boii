/**
 * Created by wazzinw on 2/21/15 AD.
 */

//console.log('order');
//find Menu in the restaurant
    var menu_id = Restaurants.find({name: 'McDonald'}, {fields: {_id: 0, name: 0 ,
        beaconID: 0, email: 0 , address: 0, phone: 0}}).fetch();

    //id_array = menu_id[0].menu;

    //restaurant_menu = Menus.find({_id: { $in : menu_id[0].menu} } ).fetch() ;

    //console.log(restaurant_menu.length);

