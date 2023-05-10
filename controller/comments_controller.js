const Comment = require("../models/comment");
const Post = require("../models/post");
const commentMailer = require("../mailers/comments_mailers");
const queue = require("../config/kue");
//the worker which is going to send the email
const commentEmailWorker = require("../workers/comment_email_worker");

module.exports.create = async (req, res) => {
  try {
    //  1: find post with that post id first
    //  2: create a comment after it
    //   because we need to create a comment , alot it with the post and inside the post schema  we also add the comment id to the array we just created there
    // let userPost = await Post.findById(req.body)
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      post.save();
      //  save() tells the DB that this is final and save it block it
      console.log(comment);
      comment = await Comment.findById(comment._id).populate("user");
      // commentMailer.newComment(comment);
      //a new job that is being put into the queue
      let job = queue.create("emails", comment).save(function (err) {
        // queue.create => automaitically add job in queue and if no queue is there it will create a new queue || because iam putinng emails in the queue so the name should be the same (emails) as we defined in comment_email_worker.js
        //2nd  argument is comment which is going to be inside my emails
        if (err) {
          console.log("error in creating a queue", err);
          return;
        }
        //the job which has been created
        console.log('job enqueued',job.id);
      });
      if (req.xhr) {
        return res.status(200).json({
          data: {
            comment: comment,
          },
          //Message is like a journal form whenever we interact with AJAX
          message: "Comment Added",
        });
      }
    }
    req.flash("success", `Commented Successfully :)`);
    return res.redirect("back");
  } catch (error) {
    console.log("Error: ", error);
    return;
  }
};

// deleting comment

module.exports.destroy = async (req, res) => {
  try {
    // Check if the comment exists
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      console.log("Comment not found");
      return res.status(404).send("Comment not found");
    }

    // Check if the current user is the owner of the comment
    if (comment.user.toString() !== req.user.id) {
      console.log("User is not the owner of the comment :(");
      return res.status(401).send("Unauthorized");
    }

    // Save the post ID before deleting the comment
    const postId = comment.post;

    // Delete the comment
    await comment.remove();

    // Remove the comment ID from the post's `comments` array
    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: req.params.id },
    });
    
    //delte all likes which is associated with comments
    await Like.deleteMany({likeable:comment._id, onModel:'Comment'});

    // send the comment id which was deleted back to the views
    if (req.xhr) {
      return res.status(200).json({
        data: {
          comment_id: req.params.id,
        },
        message: "Post deleted",
      });
    }

    // Redirect to the previous page with a success message
    req.flash("success", "Comment deleted successfully");
    res.redirect("back");
  } catch (err) {
    console.log("Error deleting comment:", err.message);
    //   req.flash('error', 'Sorry, we could not delete this comment at this time.');
    res.redirect("back");
  }
};
