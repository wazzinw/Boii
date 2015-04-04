/**
 * Created by wazzinw on 4/4/15 AD.
 */

Template.menuInfo.onRendered(function(){
    //edit item
    $('#edit_item_butt').on('click', function(){
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
    });

});




