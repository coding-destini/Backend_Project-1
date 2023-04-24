const mongoose = require('mongoose');
//Connecting to DB
mongoose.connect('mongodb://0.0.0.0:27017/Codebook_development')

// why naming it development , scence we are in development mode right now, we are creating and experimenting around with it 
// In larger organiztion there are diff env 
// 1: development
// 2: testing (once u create a feature and all other team i testing it)
// 3: production (where all users can use it)
const db = mongoose.connection;

//whenever there is an erroe
db.on('error',console.error.bind(console,"Error in connecting mongodb"));

db.once('open',()=>{
    console.log('Connected to DB :: MongoDB')
})

module.exports=db;