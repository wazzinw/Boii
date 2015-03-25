/**
 * Created by wazzinw on 3/25/15 AD.
 */
Meteor.startup(function () {
    AccountsEntry.config({
        //logo: 'logo.png',                  // if set displays logo above sign-in options
        privacyUrl: '/privacy-policy' ,    // if set adds link to privacy policy and 'you agree to ...' on sign-up page
        termsUrl: '/terms-of-use',         // if set adds link to terms  'you agree to ...' on sign-up page
        homeRoute: '/' ,                   // mandatory - path to redirect to after sign-out
        dashboardRoute: '/orders',          // mandatory - path to redirect to after successful sign-in
        profileRoute: 'profile',
        passwordSignupFields: 'EMAIL_ONLY',
        showSignupCode: false,
        showOtherLoginServices: true,      // Set to false to hide oauth login buttons on the signin/signup pages. Useful if you are using something like accounts-meld or want to oauth for api access
        extraSignUpFields: [
            {
                field: "name",                           // The database property you want to store the data in
                name: "",                                // An initial value for the field, if you want one
                label: "Full Name",                      // The html label for the field
                placeholder: "John Doe",                 // A placeholder for the field
                type: "text",                            // The type of field you want
                required: true                           // Adds html 5 required property if true
            },


            {
                field: "address",                        // The database property you want to store the data in
                name: "",                                // An initial value for the field, if you want one
                label: "Address",                      // The html label for the field
                placeholder: "32 Rajchapruek Rd",                 // A placeholder for the field
                type: "text",                            // The type of field you want
                required: true
            },

            {
                field: "phone",                           // The database property you want to store the data in
                name: "",                                 // An initial value for the field, if you want one
                label: "Phone Number",                      // The html label for the field
                placeholder: "0819062282",                 // A placeholder for the field
                type: "text",                            // The type of field you want
                required: true
            }
            //role and point add before adding to the user
        ]
    });
});