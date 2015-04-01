/**
 * Created by wazzinw on 3/25/15 AD.
 */

Template.cafeRegisterPage.events({

    "click #regis-button": function () {
        console.log('register clicked');
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

            //console.log(address);

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



        var restID = Restaurants.insert(option, function(error){
            if(error) console.log(error);
            else window.alert(options.name+" is added");

        });


        console.log("New restaurant id: "+ restID);
        Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.restaurant_id': restID}} );



       // this.redirect("cafeInfoPage");


    }
});

