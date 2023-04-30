const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')
const AVATAR_PATH = path.join('/uploads/users/avatar')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
      type:String
    }
},
{
    // Mongoose schemas support a timestamps option. If you set timestamps: true , Mongoose will add two properties of type Date to your schema: createdAt : a date representing when this document was created. updatedAt : a date representing when this document was last updated.
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) { //cb is callback function
      cb(null, path.join(__dirname,'..',AVATAR_PATH)) //2nd argu of cb is our path | .. go one file up 
    },
    filename: function (req, file, cb) { //filename is our name of the file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // and every file we store , it will be store as
     // my filename which is below + date.now+math.randow(so that if any two filename are same , so it will be always diff becasue data.now change everytime in milisecond + we provide math.random for more difference b/w two same files)
      cb(null, file.fieldname + '-' + uniqueSuffix) 
    }
  })

//static methodszas q
userSchema.statics.uploadedAvatar =  multer({ storage: storage }).single('avatar') //this aatach the diskstorage on multer in the storage property || .single('') -> this says that only one instance or only on efilewill be uploaded for the field name 'avatar' , Not multiple files || Note: 'avatar is the field name (name = 'avatar') in form of upload file
// and to access this => modelName.uploadedAvatar
userSchema.statics.avatarPath=AVATAR_PATH; // Making AVATAR_PATH to be available publically
const User = mongoose.model('User',userSchema);
module.exports=User;