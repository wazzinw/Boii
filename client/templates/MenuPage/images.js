    /**
 * Created by wazzinw on 3/23/15 AD.
 */


var imageStore = new FS.Store.S3("imageStore");

Images = new FS.Collection('images', {
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

    Images.allow({
        insert: function(userId, doc) {
            // only allow posting if you are logged in
            return !! userId;
        },
        download: function(userId, doc) {
            // only allow posting if you are logged in
            return !! userId;
        },
        update: function(userId, doc) {
            // only allow posting if you are logged in
            return !! userId; },

        remove: function(userId, doc) {
            // only allow posting if you are logged in
            return false
        }

    });

    if(Meteor.isClient){
        Meteor.subscribe('images');
    }