const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //linking user and post
    user:{
    //type is a refrence and we will refer it to our user schema to link user from post
    type: mongoose.Schema.Types.
    ObjectId,
    //ObjectId is name of if in DB inside which id is defined, we can see it in compass
    ref:'User'
    },
    //include the array of ids of all comments in this post schema itself
    comments:[{
        type: mongoose.Schema.Types.
        ObjectId,
        ref:'Comment'
    }]
},{
    timestamps:true
})
// again to export this we will tell that this is a model in DB
const Post = mongoose.model('Post',postSchema);
module.exports=Post;