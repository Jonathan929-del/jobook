// Imports
import nc from 'next-connect'
import User from '../../../../Server/Models/User'
import {signToken, isAuth} from '../../../../Utils/Auth'
import dbConnection from '../../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
    const {id} = req.query;
    try {
        dbConnection();
        const user = await User.findByIdAndUpdate(id, req.body, {new:true});
        const token = signToken(user);
        res.status(201).json({
            token,
            id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            bio:user.bio,
            country:user.country,
            profilePic:user.profilePic,
            backgroundPic:user.backgroundPic,
            followers:user.followers,
            following:user.following
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;