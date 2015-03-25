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