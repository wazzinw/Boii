/**
 * Created by wazzinw on 4/5/15 AD.
 */

var pic_url;

Template.cafeEdit.helpers({

    'FormatDate':function(date) {
        return moment(date).format("YYYY-MM-DD");
    }

});

Template.cafeEdit.events({
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

        var restId = Meteor.user().profile.restaurant_id;
        var currentRest = Restaurants.findOne({_id: restId});

        var options = {};

        if(pic_url){
            console.log("pic url = "+ pic_url);
            options.pic_url = pic_url;
        }


        var address = {};
        var phone ={};

        options.name = $('#name').val();
        options.email = $('#email').val();


        address.number = $('#number').val();
        address.floor = $('#floor').val();
        address.building= $('#building').val();
        address.street= $('#street').val();
        address.subDistrict= $('#subDist').val();
        address.district= $('#dist').val();
        address.province=  $('#province').val();
        address.country= $('#country').val();
        address.postalCode= $('#post').val();

        console.log(address);

        options.address = [];
        options.address.push(address);

        phone.type = "work";
        phone.number = $('#phone').val();


        options.phone_numbers = [];
        options.phone_numbers.push(phone);

        options.beacon_major = $('#major').val();
        options.beacon_minor = $('#minor').val();
        options.updated_at = new Date();
        options.ad_phrase = $('#adPhrase').val();

        if($('#requireBeacon').val()==1) options.require_beacon = true;
        else options.require_beacon = false;


        console.log(options);

        Meteor.call('restaurantUpdate',restId, options, function (error) {
            if (error) return alert(error.reason);
            else {
                window.alert("SUCCESSFULLY UPDATED");
                Router.go('cafeInfoPage');

            }
        });


    }

});

Template.cafeEdit.onRendered(function(){

    function preview(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview_image')
                    .attr('src', e.target.result)
                    .width(200)
                    .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    $('#item-image').on('change', function(){
        preview(this);
    });



});
