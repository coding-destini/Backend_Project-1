const Comment = require('../models/comment');
const Post = require('../models/post')
module.exports.create = async (req,res)=>{
    try {
        //  1: find post with that post id first 
        //  2: create a comment after it 
        //   because we need to create a comment , alot it with the post and inside the post schema  we also add the comment id to the array we just created there 
       let post = await Post.findById(req.body.post);
      if(post){
       const comment= await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        },
        )
    
        post.comments.push(comment)
         post.save() 
        //  save() tells the DB that this is final and save it block it  
    }
     
      res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
}

// deleting comment 

module.exports.destroy = async (req, res) => {
    try {
      // Check if the comment exists
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        console.log('Comment not found');
        return res.status(404).send('Comment not found');
      }
  
      // Check if the current user is the owner of the comment
      if (comment.user.toString() !== req.user.id) {
        console.log('User is not the owner of the comment');
        return res.status(401).send('Unauthorized');
      }
  
      // Save the post ID before deleting the comment
      const postId = comment.post;
  
      // Delete the comment
      await comment.remove();
  
      // Remove the comment ID from the post's `comments` array
      await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
  
      // Redirect to the previous page with a success message
    //   req.flash('success', 'Comment deleted successfully');
      res.redirect('back');
    } catch (err) {
      console.log('Error deleting comment:', err.message);
    //   req.flash('error', 'Sorry, we could not delete this comment at this time.');
      res.redirect('back');
    }
  };