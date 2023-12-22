const {Schema, default: mongoose} = require('mongoose');



const postSchema=Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports=mongoose.model('Post',postSchema)