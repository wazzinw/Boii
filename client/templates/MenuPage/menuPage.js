/**
 * Created by wazzinw on 2/21/15 AD.
 */
var cart = [];

Template.menuPage.helpers({
    foodMenu: function(){
        // var rest = Restaurants.find(Meteor.user().restaurant_id);
        var rest = Restaurants.findOne({name: "MK"});
        return Menus.find({restaurant_name: rest.name  ,type:"food"});
    },

    drinkMenu: function(){
                // var rest = Restaurants.find(Meteor.user().restaurant_id);
        var rest = Restaurants.findOne({name: "MK"});
        return Menus.find({restaurant_name: rest.name  ,type:"drink"});
    }
});

Template.menuPage.events({
    'click #drink-list': function(event){
        var item_name = $(this).find('h3').text(),
            item_price = $(this).find('h4').text(),
            count = 0;
        // Count number of item
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
    }
})

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
    $('#drink-list').on('click', 'button', function () {
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


    //remove item from cart
    $('#cd-cart-item').on('click','a', function(){          
        var total = parseInt($('.cd-cart-total span').text(),10);
        var price = parseInt($(this).closest('li').find('.cd-price').text().substr(1),10);
        var qty = parseInt($(this).closest('li').find('.cd-qty').text(),10);
        var newTotal = total-(price*qty);
        $('.cd-cart-total span').text(newTotal + ' Baht');
        $(this).closest('li').remove(); 
    });


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
    
    $('#edit_item_butt').on('click', function(){
        $('#edit-item').removeClass('invisible');
    });


    //add item to panel
    $save_on_panel.on('click', function(event){
        $shadow_layer.removeClass('is-visible');
        $add_item.removeClass('speed-in');
        if($('#type-drink').is(':checked')){
            $('#drink-list').append('<li class="drink-item"><button class="to_basket" id="menu"><h3>'
                                    + $('#name-input').val() +'</h3><h4>฿'
                                    + $('#price-input').val() 
                                    +'</h4></button></li>');
        }else{
            $('#food-list').append('<li class="food-item"><button class="to_basket" id="menu"><h3>'
                                   + $('#name-input').val() 
                                   +'</h3><h4>฿'+ $('#price-input').val() 
                                   +'</h4></button></li>');
        }
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

Template.menuPage.events({


        'change .fileInput': function (event, template) {
            FS.Utility.eachFile(event, function(file){
                var fileObject = new FS.File(file);
                Images.insert(fileObject, function(error){
                    if(error){
                        console.log(error);
                    }
                    else{
                        console.log("Successfully uploaded: " +fileObject._id);
                    }
                });
            })
        }


});

