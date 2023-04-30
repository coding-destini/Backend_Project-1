const User = require("../models/user");
const fs = require('fs');
const path = require('path');

module.exports.profile = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    return res.render("user_profile.ejs", {
      title: "Profile Page",
      header: "User Profile",
      profile_user: user,
    });
  } catch (error) {
    return res.status(500).send("Internal Server error", error);
  }
};

module.exports.Update = async (req, res) => {
  if (req.user.id == req.params.id) {
    try {
      //if i didn't put a check here so suppose if iam looge in as akash , and i go to vikas profile , so there in inspect ,
      //  i can see vikas user id and from there and can change it , which i don't want

     let user= await User.findById(req.params.id); // We can also use req.body.name, req.body.email , but req.body is better and short
      //when i wanted to access the things in form(name,email), so iam unable to access because now my form in multipart and body parser in unable to parse it , So that's why we use multer here
      User.uploadedAvatar(req, res, function(err) {
        if (err) {
          console.log("### ** Multer ERROR", err);
        }
        // console.log(req.file)
        //Iam unable to read my req.body without this multer
        user.name = req.body.name;
        user.email = req.body.email;


        //Not everytime someone is going to upload file , for that case we do this below
        if (req.file) {
      /* Note : If you delete all the images from the path where the avatar images are stored, and then try to upload a new avatar, you will likely encounter an error when trying to delete the old avatar image with fs.unlinkSync(). This is because the file you are trying to delete no longer exists, and fs.unlinkSync() requires a valid path to an existing file.

           To avoid this error, you can first check if the file exists using fs.existsSync(), and only attempt to delete it if it exists: */
            if(user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))){
               fs.unlinkSync(path.join(__dirname,'..',user.avatar));
            }

          //this is saving the path of the uploaded file into the avatar field in the user Model|| and this avataPath(static var) we are using from user Model
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save(); 
        return res.redirect("back");
      });
    } catch (error) {
      //   return res.status(500).send("Iternal Server error",error)
      console.log(error);
      return res.redirect("back");
    }
  } else {
    return res.status(401).send("Unuthorize");
  }
};

//Update Code
// The code first checks if the user ID in the request URL (req.params.id) matches the ID of the currently logged-in user
//  (req.user.id). If they match, the code updates the user data using the User.findByIdAndUpdate method and redirects the
//  user back to the previous page. If they do not match, the code sends a 401 Unauthorized status code. If there is any error
//   during the process, the code sends a 500 Internal Server Error status code along with the error message.

module.exports.address = function (req, res) {
  return res.end("<h1> User address </h1>");
};

// sign in
module.exports.SignIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("User_sign_in.ejs", {
    title: "Codebook / Sign In",
  });
};
// sign up
module.exports.SignUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("User_sign_up.ejs", {
    title: "Codebook / Sign up",
  });
};

// get the sign up data
module.exports.create = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    }
    return res.redirect("back");
  } catch (error) {
    return res.end("error in creating Account", error);
  }
};

// get the sign in data
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged in Successfully");
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out");
    return res.redirect("/");
  });
};
