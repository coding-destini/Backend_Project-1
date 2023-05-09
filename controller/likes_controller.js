const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toogleLike = async (req,res)=>{
    try {
        //Url shaped => likes/toogle/?id=abcde&type-Post
        let likeable;
        let deleted = false; // boolean becasue So that when u recieve the json data back, based on that you can increment or decreament the count of likes which is displayed on the page
        // ex: like if  post has 0 likes, and if deleted in false, then it becomes +1 , and if deleted is true the -1

        //finding likeable
        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
      
        //Check if  like already exists
       let existinglike = await Like.findOne({
        likeable:req.query.id,
        onModel:req.query.type,
        user:req.user._id
       })

       //if like exists then delete it
       if(existinglike){
        likeable.likes.pull(existinglike._id);
        likeable.save();
        existinglike.remove();
        deleted=true; // if deleted is false means like is created, else delted
       }
       else{
        //make a new like
        let newLike = await Like.create({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
       //now push like in whichever it is create from (Post or comment)
       likeable.likes.push(like) // Or like._id  , it automatically take the id when we write only 'like' 
       likeable.save();
       }
return res.json(200,{
    message:'Request SuccessFull',
    data:{
        deleted : deleted
    }
})

    } catch (error) {
        console.log(error);
        return res.json(500,{
            message: 'Internal server Error'
        })
    }
}