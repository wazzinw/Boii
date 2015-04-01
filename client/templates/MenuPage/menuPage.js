/**
 * Created by wazzinw on 2/21/15 AD.
 */
var cart = [];
var order ={};
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
            rest = Restaurants.findOne({_id: user.profile.restaurant_id});
        }
        else{
            console.log("food: no user found");
        }

        return Menus.find({restaurant_name: rest.name ,type: "food"});
    },

    drinkMenu: function(){
        var rest;
        if(userAvailable()){
            var user = Meteor.user();
            rest = Restaurants.findOne({_id: user.profile.restaurant_id});
        }
        else{
            console.log("food: no user found");
        }

        return Menus.find({restaurant_name: rest.name  , type:"drink"});
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
            console.log("sum = "+ cart[value] +"*"+ menu.price);

        });

        return sum;
    }
});

Template.menuPage.events({
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

        Session.set('cart', cart )
        console.log("Cart: " + Session.get('cart').toString());

    },'click button.food-menu': function(event){
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
        }

        Meteor.call('createOrder', params, function(error, result){
            if(!error){
                Session.set('cart', {});
            }
        });
    },

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



     'click #add-to-save-butt': function(e,t){
        var user = Meteor.user();
        console.log("add button clicked");
        var rest = Restaurants.findOne({_id: user.profile.restaurant_id});

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

        if($('#type-drink').is(':checked')){
            /* $('#drink-list').append('<li class="drink-item"><button class="to_basket" id="menu"><h3>'
             + $('#name-input').val() +'</h3><h4>฿'
             + $('#price-input').val()
             +'</h4></button></li>'); */
            options.type = "drink";
        }else{
            /* $('#food-list').append('<li class="food-item"><button class="to_basket" id="menu"><h3>'
             + $('#name-input').val()
             +'</h3><h4>฿'+ $('#price-input').val()
             +'</h4></button></li>');*/
            options.type = "food";
        }

        var menu_id = Menus.insert(options, function(error){
            console.log(error);
        });

        console.log("menu_id: "+ menu_id);

        Restaurants.update({_id: rest._id}, { $push: { menu: menu_id }});


    }

});

Template.menuPage.onRendered(function(){

    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    //var $L = 1200,
    var $menu_navigation = $('#main-nav'),
        $cart_trigger = $('#cd-cart-trigger'),
        //	$hamburger_icon = $('#cd-hamburger-menu'),
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


    //add item to cart
  /*  $('#drink-list').on('click', 'button', function () {
        var item_name = $(this).find('h3').text(),
            item_price = $(this).find('h4').text(),
            count = 0;
        for(i = 0; i <= cart_length; i++) {
            if($('#item'+i).find('.cd-name').text() === item_name){
                var val = parseInt($('#item'+i).find('.cd-qty').text(),10);
                var newVal = val+1;
                $('#item'+i).find('.cd-qty').text(newVal+'x');
                count++;
                var total = parseInt($('.cd-cart-total span').text(),10);
                var newTotal = total+parseInt(item_price.substr(1),10);
                $('.cd-cart-total span').text(newTotal+' Baht');
            }
        }
        if(count == 0)
        {
            var qty = 0; 
            $cart_list.append('<li class="item"><span class="cd-qty">' + (++qty) + 'x</span><span class="cd-name">' + item_name + '</span><div class="cd-price">' + item_price + '</div><a href="#0" class="cd-item-remove"><span>Remove</span></a></li>');
            $('li').last().attr('id', 'item'+(cart_length++) );
            var total = parseInt($('.cd-cart-total span').text(),10);
            var newTotal = total+parseInt(item_price.substr(1),10);
            $('.cd-cart-total span').text(newTotal+' Baht');
        }
    });
*/

    //remove item from cart
    // $('#cd-cart-item').on('click','a', function(){          
    //     var total = parseInt($('.cd-cart-total span').text(),10);
    //     var price = parseInt($(this).closest('li').find('.cd-price').text().substr(1),10);
    //     var qty = parseInt($(this).closest('li').find('.cd-qty').text(),10);
    //     var newTotal = total-(price*qty);
    //     $('.cd-cart-total span').text(newTotal + ' Baht');
    //     $(this).closest('li').remove(); 
    // });


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
    $('#edit_item_butt').on('click', function(){
        if($('#edit_item_butt').text() === 'Edit'){
            $('#drink-list').find('h3').text('').append('<input class="item-name" type="text" value="Late"' + 'Late' + '/>');
            $('#drink-list').find('h4').text('').append('<input class="item-price" type="text" value=""' + '$50' + '/>');
            $('#edit_item_butt').text('Save');
        }else{
            $('#edit_item_butt').text('Edit');
            $('#drink-list').find('h3').text($('.item-name').val());
            $('#drink-list').find('h4').text($('.item-price').val());
        }
    });

    //delete item from panel
    $('#delete_item_butt').on('click', function(){
        if($('#delete_item_butt').text() === 'Delete'){
            $('.delete-btn').css('display','inherit');
            $('#delete_item_butt').text('Done');
        }else{
            $('.delete-btn').css('display','none');
            $('#delete_item_butt').text('Delete');
        }
    $('.delete-btn').on('click', function(){
        $(this).closest('li').remove();
    });
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
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
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
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
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

    /*	//move #main-navigation inside header on laptop
	//insert #main-navigation after header on mobile
	move_navigation( $menu_navigation, $L);
	$(window).on('resize', function(){
		move_navigation( $menu_navigation, $L);
		if( $(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
			$menu_navigation.removeClass('speed-in');
			$shadow_layer.removeClass('is-visible');
			$('body').removeClass('overflow-hidden');
		}
	});*/



//preview image
$('#item-image').on('change', function(){
    preview(this);
});

function toggle_panel_visibility ($lateral_panel, $background_layer, $body) {
    /*if( $lateral_panel.hasClass('speed-in') ) {
		// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
		$lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', 
        function(){
			$body.removeClass('overflow-hidden');});
		$background_layer.removeClass('is-visible');
	} else {*/
    $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',                         function(){
        $body.addClass('overflow-hidden');});
    $background_layer.addClass('is-visible');
    //}
}
/*function move_navigation( $navigation, $MQ) {
	if ( $(window).width() >= $MQ ) {
		$navigation.detach();
		$navigation.appendTo('header');
	} else {
		$navigation.detach();
		$navigation.insertAfter('header');
	}
}*/
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


