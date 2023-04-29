const post = require('../models/post')
const User = require('../models/user')
//Export a function which is publicly available to my routes file and that should return something
// module.export works universly 
//function is similar to app.get app.use etc like we did before
module.exports.home= async(req,res)=>{
    // this below code is just to render somthing so that we know it is working now we will render our view engine 
    // return res.end("<h1>Express is up for CodeBook!!!</h1>");

    // console.log(req.cookies);
    // res.cookie('user_id',34);
    // res.cookie('user_name',"vikas234");
    //   try {
    //     let posts = await post.find({});
    // return res.render('home',{
    //     title : "Home",
    //     header : "CodeBook",
    //     Post : posts
    // })
    try{
        // populate the user of each post 
    let posts = await post.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    let user = await User.find({});
    return res.render('home',{
        title : "Home",
        header : "CodeBook",
        Post : posts,
        All_Users : user
    })

// It's using await to wait for the find() method to return a list of all the post documents in the database.
// It's populating the user field for each post document, which means that the user object for each post document will be retrieved from the database and added to the post object.
// It's rendering the home EJS template and passing in an object that contains the title, header, and list of post documents as Post.
// Assuming that the post and user models are set up correctly, and there are no issues with the home EJS template, this code should work as expected. However, without more context about the specific error you're encountering, it's difficult to say for certain whether or not there are any issues with this code.


 
} catch (error) {        
}
}

module.exports.setting = function(req,res){
    return res.end("<h1>This is User's Settings </h1>");
}