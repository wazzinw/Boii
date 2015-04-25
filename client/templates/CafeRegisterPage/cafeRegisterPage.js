/**
 * Created by wazzinw on 3/25/15 AD.
 */
var pic_url = "";



Template.cafeRegisterPage.onRendered(function(){
    console.log("user "+ Meteor.user());

    if(Meteor.user().profile.restaurant_id){
        Router.go("cafeInfoPage");
    }else{
        console.log("No restaurant registered");
    }
    //preview image

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

Template.cafeRegisterPage.events({

    "click #regis-button": function () {
        //console.log('register clicked');
        var option = {};
        var address = {};
        var phone ={};

        option.name = $('#name').val();
        option.email = $('#email').val();


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

        option.address = [];
        option.address.push(address);

        phone.type = "work";
        phone.number = $('#phone').val();

        //console.log(phone);

        option.phone_numbers = [];
        option.phone_numbers.push(phone);

        option.beacon_major = $('#major').val();
        option.beacon_minor = $('#minor').val();
        option.menu = [];
        option.created_at = new Date();
        option.updated_at = new Date();
        option.pic_url = pic_url;

       Meteor.call('restaurantInsert', option, function(error, result) {
            if (error){
                window.alert(error.reason);
                Router.go('cafeRegisterPage');
            }
            else{
                window.alert(option.name+" is added");
                //console.log("New restaurant id: "+ restID);
                location.reload();
            }
        });


      /*  var restID = Restaurants.insert(option, function(error){
            if(error) {
                console.log(error);
            } else {
                window.alert(option.name+" is added");
                console.log("New restaurant id: "+ restID);
                Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.restaurant_id': restID}} );

                Router.go('cafeInfoPage');



        });


*/


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

    }
});






