/**
 * Created by wazzinw on 3/25/15 AD.
 */
Accounts.onCreateUser(function(options, user) {
    if (!options.profile) {
        options.profile = {};
        options.role = {}
        options.deviceToken = {}
    }
    options.profile.point = 0;
    options.profile.restaurant_id = "";
    options.role ="owner";
    options.deviceToken = "";

    if (options.profile) {
        user.profile = options.profile;
        user.role = options.role;
        user.deviceToken = options.deviceToken;
    }

    return user;
});