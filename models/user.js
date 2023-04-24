const mongoose = require('mongoose');
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
},
{
    // Mongoose schemas support a timestamps option. If you set timestamps: true , Mongoose will add two properties of type Date to your schema: createdAt : a date representing when this document was created. updatedAt : a date representing when this document was last updated.
    timestamps:true
});

const User = mongoose.model('User',userSchema);
module.exports=User;