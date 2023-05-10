{
  //------------- Method to submit the form data for new post using AJAX
 
let createPost = function(){
  //Id is form the post Form
  let newPostForm = $('#new-post-form')
  //whenever form is submitted , i don't want to be submiited is naturally, so we will do prevent default  
 newPostForm.submit(function(e){
  e.preventDefault();

  $.ajax({
      type: 'post',
      //Url should be same as the action value in form
      url:'/posts/create',
      data: newPostForm.serialize(), //This converts the form data into JSON like content would be the KEY and VALUE is the value filled in the form
      success:function(data){
         let newPost= newPostDOM(data.data.post) //why data.data becasue in console when i printed , so there is a key data object and inside this there is a key data and then inside there we have posts
         
         //Append the newPost to the list of Post by using the id , which is the id of the for loop (which is append all post) in home.ejs
         $('#post-list>ul').prepend(newPost); // id => post-comments-list which have a ul inside and prepend add the post at the first of the list
         deletePost($(' .delete-post-button', newPost));
        
         new PostComments(data.data.post._id);
         //enable the functionality of the toogle like button on the new post
         new ToggleLike($('.toogle-like-button',newPost))

         new Noty({
          theme: "relax",
          text: "Post was created successfully",
          type: "success",
          layout: "topRight",
          timeout: 1500,
        }).show();
      },error:function(error){
       console.log(error)
      }
  })
 })
}



//-------------> Method to create post in DOM 

let newPostDOM = function(post){
  return $(`<div class="post" id="post-${post._id}">

  <div id="delete-post">
    <small>
      <a class="delete-post-button" href="/posts/destroy/${post._id}"
        >Delete Post</a
      >
    </small>
  </div>

  <div id="creater">
    <b><p>${post.user.name}</p></b>
  </div>
  <div id="content"><p>${post.content}</p></div>

<small>
<button>
<a   class="toogle-like-button" data-likes="0"  href="/likes/toogle/?id=${post._id}&type=Post">
  0 Likes 
 </a>
</button>
</small>

  <div class="post-comments">
  
    <form action="/comments/create" method="post">
      <input
        type="text"
        name="content"
        id=""
        placeholder="type here to add comment"
        required
      />

      <input type="hidden" name="post" id="" value="${post._id}" />
      <input type="submit" value="Add comment" id="submit" />
    </form>

    <div class="post-comments-list">
      <ul class="post-comments-${post._id}">
      </ul>
    </div>
  </div>
</div>
`) // can use backticks to define strings that contain dynamic content 
}


//method to delete the from the DOM
let deletePost = function(deletelink) { //delete link is the link of a tag button , which is a delete button
$(deletelink).click(function(e){
e.preventDefault();
$.ajax({
  type:'get',
  url:$(deletelink).prop('href'), //getting value from href in a tag 
  success:function(data){
$(`#post-${data.data.post_id}`).remove() // this id(data.post_id) is  post's id  
new Noty({
theme: "relax",
text: "Post deleted",
type: "error",
layout: "topRight",
timeout: 1500,
}).show();
  },error:function(error){
    console.log(error.responseText);
  }
})
})
}

// loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
let convertPostsToAjax = function () {
  $("#post-list>ul>div").each(function () {
    let self = $(this);
    let deleteButton = $(" .delete-post-button", self);
    deletePost(deleteButton);

    // get the post's id by splitting the id attribute
    let postId = self.prop("id").split("-")[1];
    new PostComments(postId);
  });
};

createPost();
convertPostsToAjax();

}

// Notes 
/*-------------=====   What is preventDefault() ? 

In jQuery, preventDefault() is a method that prevents the default action of an event from occurring.

When an event is triggered in a web page, such as a click on a link or a form submission, the browser will perform a default action associated with that event. For example, clicking on a link will navigate to the URL specified in the href attribute, and submitting a form will submit the data to the server and reload the page.

By calling preventDefault() on an event, you can stop the default action from occurring. This can be useful if you want to perform some custom logic before allowing the default action to proceed, or if you want to prevent the default action from occurring altogether.

For example, you can use preventDefault() to stop a link from navigating to its specified URL and instead perform some other action, such as showing a modal dialog or performing an AJAX request. Similarly, you can use preventDefault() to stop a form from submitting and instead perform some other action, such as validating the form data or submitting it via AJAX.

Overall, preventDefault() gives you more control over how events are handled in your web page and allows you to customize the behavior of standard browser actions.

----> So in Our Code we will manually submit it threw AJAX
*/