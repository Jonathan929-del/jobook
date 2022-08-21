// Imports
import mongoose from 'mongoose'


// User Schema
const UserSchema = mongoose.Schema(
    {
        name:{type:String, required:true},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        bio:{type:String, default:''},
        country:{type:String, default:''},
        profilePic:{type:String, default:''},
        backgroundPic:{type:String, default:''},
        following:{type:[String], default:[]},
        followers:{type:[String], default:[]},
        isAdmin:{type:Boolean, default:false}
    },
    {timestamps:true}
);


// Export
const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;