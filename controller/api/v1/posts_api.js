const Post = require("../../../models/post");
const Comment = require('../../../models/comment')

module.exports.index = async function (req, res) {
  try {
    // populate the user of each post
    let posts = await Post
      .find({})
      .populate("user")
      .sort("-createdAt")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    return res.json(200, {
      message: "List of Posts",
      posts: posts,
    });
  } catch (err) {
    return res.json(400, {
      message: "Error in getting Posts",
    });
  }
};

module.exports.destroy = async (req, res) => {
    try {
      // Check if the post exists
      let post = await Post.findOneAndDelete({ _id: req.params.id });
  
      if (!post) {
        console.log("Post not found");
        return res.status(404).send("Post not found");
      }
      // Delete the post's associated comments
      await Comment.deleteMany({ post: req.params.id });

      return res.json(200,{
        message:"Post deleted associated with comments"
      })
    } catch (error) {
        console.log("error ---- ",error)
      return res.json(400,{
        message:"error in deleting post"
      })
    }
  };