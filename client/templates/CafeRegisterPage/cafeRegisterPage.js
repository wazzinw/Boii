/**
 * Created by wazzinw on 3/25/15 AD.
 */

Template.cafeRegisterPage.events({

    "click #regis-button": function () {
        console.log('register clicked');
        var option = {};
        var address = '';
        var phone ={};

        option.name = $('#name').val();
        option.email = $('#email').val();

        address = $('#number').val()+
        " flr"+$('#floor').val()+" "+
        $('#building').val()+ " "+
        $('#street').val()+ " " +
        $('#subDist').val()+" "+
        $('#dist').val()+" "+
        $('#province').val()+ " "+
        $('#country').val()+" "+
        $('#post').val();
        //console.log(address);

        option.address = address;

        phone.type = "work";
        phone.number = $('#phone').val();

        //console.log(phone);

        option.phone_numbers = [];
        option.phone_numbers.push(phone);

        option.beacon_major = "";
        option.beacon_minor = "";
        option.menu = [];
        option.created_at = new Date();
        option.updated_at = new Date();



        var restID = Restaurants.insert(option, function(error){
            if(error) console.log(error);
            else console.log("Successfully added restaurant");

        });



        console.log("New restaurant id: "+ restID);
        Meteor.users.update( { _id: Meteor.userId() }, { $set: { 'profile.restaurant_id': restID}} );

        this.redirect("cafeInfoPage");


    }
});

