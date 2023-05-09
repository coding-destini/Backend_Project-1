const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    //Like belong to the user, when you like comment or post , it should be maintain in DB
    user:{
      type:mongoose.Schema.ObjectId
    },
    //This defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    //This field is used to defining the type of liked Object -> Since this is a dynamic reference
    onModel:{
        type:String,
        require:true,
        enum : ['Post','Comment'] //Likeble can be post or comment | enum : means the value of onModel in each like can be either Post
                                  // or comment , and nothing another then that : so if i remove this field , it could be any value 
    }
},{
    timestamps:true
});

const Like = mongoose.model('Like',likeSchema);
module.exports=Like;