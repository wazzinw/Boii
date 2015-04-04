/**
 * Created by wazzinw on 3/23/15 AD.
 */

//run with Meteor --settings settings.json

    var imageStore = new FS.Store.S3("imageStore", {
        accessKeyId: Meteor.settings.accessKeyId,
        secretAccessKey: Meteor.settings.secretAccessKey,
        bucket: Meteor.settings.bucket
        //region: "ap-southeast-1"
    });


    Images = new FS.Collection("images", {
        stores: [imageStore],
        filter: {
            allow: {
                contentTypes: ['image/*']
            }
        }
    });
    Meteor.publish('Images', function() {

    return Images.find();
    });


    Images.allow({
        insert: function(userId, doc) {
            // only allow posting if you are logged in
            return !! userId;
        },
        download: function() {
            // only allow posting if you are logged in
            return true;
        },
        update: function(userId, doc) {
            // only allow posting if you are logged in
            return !! userId; },

        remove: function(userId, doc) {
            // only allow posting if you are logged in
            return false
        }

    });


