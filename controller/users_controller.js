const User = require('../models/user')


module.exports.profile = async (req,res)=>{
      
try {
    let user= await User.findById(req.params.id);
    return res.render('user_profile.ejs',{
        title:"Profile Page",
        header:"User Profile",
        profile_user:user
    })   
} catch (error) {
    
}
    
   
}
module.exports.address = function(req,res){
    return res.end("<h1> User address </h1>")
}

// sign in 
module.exports.SignIn=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('User_sign_in.ejs',{
        title:"Codebook / Sign In",
    })
}
// sign up 
module.exports.SignUp=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('User_sign_up.ejs',{
        title:"Codebook / Sign up"
    })
}

// get the sign up data 
module.exports.create= async (req,res)=>{
try {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    let user = await User.findOne({email:req.body.email});
        if(!user){
           await User.create(req.body);
                return res.redirect('/users/sign-in')
        }
      return res.redirect('back');
        
    
} catch(error) {
    return res.end("error in creating Account",error);
}

}

// get the sign in data 
module.exports.createSession= (req,res)=>{
    return res.redirect('/');
}

module.exports.destroySession=(req,res)=>{
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/");
      });
}
