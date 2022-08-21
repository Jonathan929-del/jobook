// Imports
import nc from 'next-connect'
import bcrypt from 'bcryptjs'
import db from '../../../Server/DBConnnect'
import {signToken} from '../../../Utils/Auth'
import User from '../../../Server/Models/User'


// Handlers
const handler = nc();
handler.post(async (req, res) => {
    try {
        const {email, password} = req.body;
        db.connect();
        const user = await User.findOne({email});
        !user && res.status(404).json({message:'User not found'});
        !bcrypt.compareSync(password, user.password) && res.status(401).json({message:'Wrong password'});
        const token = signToken(user);
        db.disconnect();
        res.status(201).json({
            token,
            id:user._id,
            name:user.name,
            email:user.email,
            bio:user.bio,
            country:user.country,
            isAdmin:user.isAdmin,
            following:user.following,
            followers:user.followers,
            profilePic:user.profilePic,
            backgroundPic:user.backgroundPic
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;