// Imports
import mongoose from 'mongoose'


// User Schema
const PostSchema = mongoose.Schema(
    {
        user:{
            name:{type:String, required:true},
            profilePic:{type:String, default:''},
            isAdmin:{type:Boolean, required:true}
        },
        userId:{type:String, required:true},
        postId:{type:String, required:true},
        caption:{type:String, default:''},
        img:{type:String, default:''},
        likes:{type:[String], default:[]},
        comments:{type:[String], default:[]},
        mood:{type:String, default:''}
    },
    {timestamps:true}
);


// Export
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
export default Post;