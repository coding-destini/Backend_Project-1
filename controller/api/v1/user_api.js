const User  = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async (req,res)=>{
// 1: What we do when a user name and password is recieved => we need to find that user and generate the jwt.JsonWebToken 
// corresponding to that user 
try {
    let user =await User.findOne({email : req.body.email});
    //If user not found
    if(!user || user.password!=req.body.password){
        return res.json(422,{
            message:"Invalid UserName of Password"
        })
    }
    // If uesr found 
    return res.json(200,{
        message:"Sign in SuccessFully , here is your token , please keep it safe",
        data:{
            token : jwt.sign(user.toJSON(),'CodeBook',{expiresIn:'100000'}) //jwt.sign() is a fun() where i will pass my user and convert it to Json , and the key which we created in passport-jwt to encrypt , same key should be here to decrypt || 10000 is 10sec ,100000 is 100sec
        }
    })

} catch (error) {
    console.log("error ---- ",error)
    return res.json(400,{
      message:"Internal"
    })
}
}