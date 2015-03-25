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

