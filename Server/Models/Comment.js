// Imports
import mongoose from 'mongoose'


// User Schema
const CommentSchema = mongoose.Schema(
    {
        user:{
            name:{type:String, required:true},
            profilePic:{type:String, default:''},
            isAdmin:{type:Boolean, required:true}
        },
        userId:{type:String, required:true},
        postId:{type:String, required:true},
        comment:{type:String, required:true}
    },
    {timestamps:true}
);


// Export
const Comment = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
export default Comment;