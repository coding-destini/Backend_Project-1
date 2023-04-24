const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  try {
    await Post.create({
      content: req.body.content,
      //this  req.user._id is usable because of passport js from setAuthenticatedUser function , you can check it , go to passport-local-strategy
      user: req.user._id,
      // why only user id because id is unique for each user in DB
    });
    return res.redirect("back");
  } catch (error) {
    console.log("error in creating a post");
    return;
  }
};

module.exports.AllPost = async (req, res) => {
  try {
    let post = Post.find({ user: user._id });
  } catch (error) {}
};

//  Deleting a post
// module.exports.destroy = async (req, res) => {
//   try {
//     //check the user who is deleting the post , it should be his/her post
//     let post = await Post.findByIdAndDelete(req.params.id);
// console.log(req.params.id);
//     // Check if the post exists
//     if (!post) {
//       console.log("Post not found");
//       return res.status(404).send("Post not found");
//     }

    
//     //here post.user => post schema has user id so we are match if this is martching with our user id or not
//     // .id means converting the object id into string
//     // if(post.user == req.user.id){
//     //     post.remove();
//     //    comment.deleteMany({post : req.params.id});
//     //    res.redirect('back')
//     // }
//     // above comments code can be return as below also because abvo we are changing if to stirng using .id and here we can also use .toString()
//     // Check if the current user is the owner of the post
//     if (post.user.toString() !== req.user.id) {
//       console.log("User is not the owner of the post");
//       return res.status(401).send("Unauthorized");
//     }
//     // Delete the post and its associated comments
//     await post.remove();
//     await Comment.deleteMany({ post: req.params.id });
   

//     // Redirect to the previous page with a success message
//     res.redirect("back");
//   } catch (error) {
//     console.log("Error deleting post:", error.message);
    
//     res.redirect("back");
//   }
// };
// Deleting post 2
module.exports.destroy = async (req, res) => {
  try {
    // Check if the post exists
    let post = await Post.findOneAndDelete({ _id: req.params.id });

    if (!post) {
      console.log("Post not found");
      return res.status(404).send("Post not found");
    }

    // Check if the current user is the owner of the post
    if (post.user.toString() !== req.user.id) {
      console.log("User is not the owner of the post");
      return res.status(401).send("Unauthorized");
    }

    // Delete the post's associated comments
    await Comment.deleteMany({ post: req.params.id });

    // Redirect to the previous page with a success message
    req.flash("success", "Post deleted successfully");
    res.redirect("back");
  } catch (error) {
    console.log("Error deleting post:", error.message);
    req.flash("error", "Sorry, we could not delete this post at this time.");
    res.redirect("back");
  }
};
