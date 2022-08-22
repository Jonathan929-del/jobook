// Imports
import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import {signToken} from '../../../Utils/Auth'
import User from '../../../Server/Models/User'
import dbConnection from '../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.post(async (req, res) => {
    try {
        dbConnection();
        const {name, email, password, confirmPassword} = req.body;
        const existingUser = await User.findOne({email});
        existingUser && res.status(401).json({message:'User already exists'});
        if(password !== confirmPassword){
            res.status(401).json({message:'Passwords dont match'});
            return;
        }else{
            const newUser = await User.create({name, email, password: bcrypt.hashSync(password)});
            const token = signToken(newUser);
            res.status(201).json({
                token,
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                bio:newUser.bio,
                country:newUser.country,
                isAdmin:newUser.isAdmin,
                following:newUser.following,
                followers:newUser.followers,
                profilePic:newUser.profilePic,
                backgroundPic:newUser.backgroundPic
            });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;