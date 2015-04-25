/**
 * Created by wazzinw on 4/5/15 AD.
 */

var pic_url;

Template.menuEdit.helpers({

    'FormatDate':function(date) {
        return moment(date).format("YYYY-MM-DD");
    }

});

Template.menuEdit.events({
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

    'click #save-btn': function(event,template){

        console.log("Submit form");
        var menuId = $('#title').data('id');
        console.log("current menu id = " + menuId);
        var restId = Meteor.user().profile.restaurant_id;
        var currentMenu = Menus.findOne({_id: menuId});

        options = {};
        options.name = $('#name').val();

        if(pic_url){
            console.log("pic url = "+ pic_url);
            options.pic_url = pic_url;
        }


        options.valid_until = $('#validTill').val();
        options.price = $('#price').val();
        options.updated_at = new Date();

        if($('#avail').val() == "1"){
            options.available = true;
        }else{
            options.available = false;
        }

        if ($('#promotion').is(':checked')) {
            options.promotion = true;
        } else options.promotion = false;


        console.log(options);

        Meteor.call('menuUpdate', options, menuId, function (error) {
            if (error) return alert(error.reason);
            else {
                window.alert("SUCCESSFULLY UPDATED");
                Router.go('menuInfo', currentMenu);

            }
        });


    },

    'click #promotion': function(event){

        if($('#promotion').is(':checked')) {
            $('#valid-div').removeClass('invisible');
        }else{
            $('#valid-div').addClass('invisible');
        }

    }


});

Template.menuEdit.onRendered(function(){

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

    $('#item-image').on('change', function(){
        preview(this);
    });



});
