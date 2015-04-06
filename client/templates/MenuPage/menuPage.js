/**
 * Created by wazzinw on 2/21/15 AD.
 */
var cart = [];
var order = {};
var cart_length = 0;
Cart = new Mongo.Collection(null);
var pic_url = "";


function userAvailable() {
    // use Meteor.user() since it's available
    if (Meteor.user())
        return Meteor.user().profile;
}


Template.menuPage.helpers({
    foodMenu: function(){
        var rest;
        if(userAvailable()){
            var user = Meteor.user();
            rest = Restaurants.find().fetch();
        }
        else{
            console.log("food: no user found");
        }

        return Menus.find({restaurant_name: rest[0].name , type: "food"});
    },

    drinkMenu: function(){
        var rest;
        if(userAvailable()){
            var user = Meteor.user();
            //rest = Restaurants.findOne({_id: user.profile.restaurant_id});
            rest = Restaurants.find().fetch();
            console.log("HELLOOOOOOOOO");

        }else{
            console.log("drink: no user found");
        }

        return Menus.find({restaurant_name: rest[0].name   , type: "drink"});
    },

    cartItems: function(){
        var cart = Session.get('cart');

        if(!cart){
            Session.set('cart', {});
            return [];
        }

        var keys = Object.keys(cart);

        var cartList = keys.map(function(value, index, array){

            var menu = Menus.findOne(value);

            return {
                _id: value,
                quantity: cart[value],
                name: menu.name,
                price: menu.price
            }
        });
        //For each key, make an array entry

        return cartList
    },

    images: function(){
        return Images.find();
    },

    totalPrice: function(){
        var cart = Session.get('cart');

        if(!cart){
            Session.set('cart', {});
            return [];
        }
        var sum = 0;

        var keys = Object.keys(cart);

        var cartList = keys.map(function(value, index, array) {

            var menu = Menus.findOne(value);
            sum += cart[value]* menu.price;
            //console.log("sum = "+ cart[value] +"*"+ menu.price);

        });

        return sum;
    }



});

Template.menuPage.events({


    //open drink category
    'click button.menu': function(event){
        console.log("drink menu clicked");

        var id = $(event.currentTarget).closest('.drink-item').data('id');
        console.log(id);

        var cart = Session.get('cart') || {};

        if ( cart[id] ){
            cart[id] += 1;
        } else {
            cart[id] = 1;
        }

        Session.set('cart', cart );
        console.log("Cart: " + Session.get('cart').toString());
    },


    //open food category
    'click button.food-menu': function(event){
        console.log("food menu clicked");

        var id = $(event.currentTarget).closest('.food-item').data('id');

        console.log(id);

        var cart = Session.get('cart') || {};

        if ( cart[id] ){
            cart[id] += 1;
        } else {
            cart[id] = 1;
        }

        Session.set('cart', cart );

        console.log("Cart: " + Session.get('cart').toString());

    },


    //send order to order page
    'click a.checkout-btn': function(event){
        var cart = Session.get('cart');

        var rest;
        if(userAvailable()){
            rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});
        }
        else{
            console.log("food: no user found");
        }
        if(!cart){
            Session.set('cart', {});
            return [];
        }

        var keys = Object.keys(cart);

        var cartList = keys.map(function(value, index, array){
            var menu = Menus.findOne(value);
            return {
                menu_id: value,
                quantity: cart[value]
            }
        });

        var params = {
            restaurant_id: Restaurants.findOne({name: rest.name})._id,
            orderItems: cartList
        };

        Meteor.call('createOrder', params, function(error, result){
            if(!error){
                Session.set('cart', {});
            }
        });
    },

    //remove item from cart
    'click .cd-item-remove': function(event){
        //remove the select row out of cart
        console.log("remove button clicked");

        var id = $(event.currentTarget).closest('.item').data('id');
        console.log("clicked id: "+id);
        var cart = Session.get('cart');

        if(!cart){
            Session.set('cart', {});
            return [];
        }

        delete cart[id];

        Session.set('cart', cart);

        console.log(cart);

    },

    //get picture
    'change .fileInput': function (event, template) {
        FS.Utility.eachFile(event, function(file){
            var fileObject = new FS.File(file);
            Images.insert(fileObject, function(error){
                if(error){
                    console.log(error);
                }
                else{
                    console.log("Successfully uploaded: " +fileObject._id);

                    pic_url =  '/cfs/files/images/' + fileObject._id;
                }
            });
        })
    }, 


    //add item to menu panel
    'click #add-to-save-butt': function(e,t){
        var user = Meteor.user();
        console.log("add button clicked");
        var rest = Restaurants.findOne({_id: user.profile.restaurant_id});
        var menu_id;
        options = {};
        options.name = $('#name-input').val();
        options.pic_url = pic_url;
        options.valid_until = $('#validTill').val();
        options.price = $('#price-input').val();
        options.restaurant_name = rest.name;
        options.created_at = new Date();
        options.updated_at = new Date();
        

        if($('#promotion').is(':checked')){
            options.promotion = true;
        }else options.promotion = false;

        console.log($('#type').val());

        if($('#type').val() == "1"){
            options.type = "drink";
        }else{
            options.type = "food";
        }

        options.available = true;

        Meteor.call('menuInsert', options, function(error) {
            if (error) return alert(error.reason);
            else{
                alert("SUCCESSFULLY UPDATED");

            }
        });


        //console.log("after: "+ menu_id);

        window.alert(options.name+" is added");
        $('#cd-shadow-layer').removeClass('is-visible');
        $('#add_item').removeClass('speed-in');

        //clear input value
        $("#name-input").val('');
        $('#validTill').val('');
        $('#price-input').val('');


    }

});

    function checkAvail(){

            //var menuArray = Menus.find();


    }


Template.menuPage.onRendered(function(){
    var $menu_navigation = $('#main-nav'),
        $cart_trigger = $('#cd-cart-trigger'),
        $lateral_cart = $('#cd-cart'),
        $shadow_layer = $('#cd-shadow-layer'),
        $add_item = $('#add_item'),
        $add_item_butt = $('#add_item_butt'),
        $save_on_panel = $('#add-to-save-butt'),
        $drink_butt = $('#drink-butt'),
        $food_butt = $('#food-butt'),
        $to_basket = $('.to_basket'),
        $cart_list = $('#cd-cart-item'),
        cart_length = 0,
        i;



    //choose category
    $food_butt.on('click',function(){
        $drink_butt.removeClass('selected');
        $food_butt.addClass('selected');
        $('#food-list').removeClass('invisible');
        $('#drink-list').addClass('invisible');
    });
    $drink_butt.on('click', function() {
        $food_butt.removeClass('selected');
        $drink_butt.addClass('selected');
        $('#drink-list').removeClass('invisible');
        $('#food-list').addClass('invisible');
    });

    //edit item
 /*   $('#edit_item_butt').on('click', function(){
        if($('#edit_item_butt').text() === 'Edit'){
            $('#drink-list').find('.menu').prop('disabled',true);
            $('#drink-list').find('.menu').css('active','disabled');
            $('#drink-list').find('h4').text('').append('<button class="edit-item-btn">Edit</button>');
            $('#edit_item_butt').text('Done').css('background', 'green');

            $('.edit-item-btn').on('click', function(){
                toggle_panel_visibility($add_item, $shadow_layer, $('body'));
                $("#name-input").val('');
                $('#validTill').val('');
                $('#price-input').val('');
                $('#promotion');
                $('#type-drink');

            });
        }else{
            $('#drink-list').find('h4').text('$50');
            $('#edit_item_butt').text('Edit').css('background', '#24A8AF');
            $('#drink-list').find('.menu').prop('disabled',false);
        }
    });*/

    //delete item from panel UI
    $('#delete_item_butt').on('click', function(){
        if($('#delete_item_butt').text() === 'Delete'){
            $('.delete-btn').css('display','inherit');
            $('#delete_item_butt').text('Done').css('background', 'green');
        }else{
            $('.delete-btn').css('display','none');
            $('#delete_item_butt').text('Delete').css('background', '#D9534F');
        }
    });

    //delete item from panel
    $('.delete-btn').on('click', function(){
        console.log("delete button clicked");
        var rest = Restaurants.findOne({_id: Meteor.user().profile.restaurant_id});

        //$(this).closest('li').remove();
        var id = $(event.currentTarget).closest('li').data('id');
        console.log("id: " + id);

        //Menus.remove({_id: id});
        Meteor.call('menuDelete', id, function(error) {
            if (error) return alert(error.reason);
        });



        //Restaurants.update({_id: Meteor.user().profile.restaurant_id}, { $set: { menu: menuArray }});

    });



    //open add item pop-up
    $add_item_butt.on('click', function(event){
        event.preventDefault();
        toggle_panel_visibility($add_item, $shadow_layer, $('body'));

    });


    //close add item pop-up
    $('#cancel-add-butt').on('click', function(event){
        $shadow_layer.removeClass('is-visible');
        $add_item.removeClass('speed-in');
    });
    $shadow_layer.on('click', function(){
        $shadow_layer.removeClass('is-visible');
        if( $lateral_cart.hasClass('speed-in') ) {
            $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('body').removeClass('overflow-hidden');
            $lateral_cart.removeClass('speed-in');
            $add_item.removeClass('speed-in');
        }
    });


    //open cart
    $cart_trigger.on('click', function(event){
        event.preventDefault();
        toggle_panel_visibility($lateral_cart, $shadow_layer, $('body'));
        $shadow_layer.removeClass('is-visible');
    });

    //close lateral cart
    $('.close-cart-btn').on('click', function(){
        $shadow_layer.removeClass('is-visible');
        if( $lateral_cart.hasClass('speed-in') ) {
            $lateral_cart.removeClass('speed-in').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
            });
        } else {
            $('body').removeClass('overflow-hidden');
            $lateral_cart.removeClass('speed-in');
            $add_item.removeClass('speed-in');
        }
    });

    //preview image
    $('#item-image').on('change', function(){
        preview(this);
    });


    
    function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
        $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',                         function(){
            $body.addClass('overflow-hidden');});
        $background_layer.addClass('is-visible');
        //}
    }

    function preview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview_image')
                    .attr('src', e.target.result)
                    .width(250)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }


});


