// Imports
import nc from 'next-connect'
import db from '../../../../Server/DBConnnect'
import User from '../../../../Server/Models/User'
import {isAuth, signToken} from '../../../../Utils/Auth'


// Handlers
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        const followedUser = await User.findById(id);
        const follower = await User.findById(req.body.id);
        if(!followedUser.followers.includes(follower._id)){
            await followedUser.updateOne({$push:{followers:follower._id}}, {new:true});
            await follower.updateOne({$push:{following:followedUser._id}}, {new:true});
        } else {
            await followedUser.updateOne({$pull:{followers:follower._id}}, {new:true});
            await follower.updateOne({$pull:{following:followedUser._id}}, {new:true});
        }
        const token = signToken(follower)
        res.status(200).json({
            token,
            id:follower._id,
            name:follower.name,
            email:follower.email,
            isAdmin:follower.isAdmin,
            bio:follower.bio,
            country:follower.country,
            profilePic:follower.profilePic,
            backgroundPic:follower.backgroundPic,
            followers:follower.followers,
            following:follower.following
        });
        db.disconnect();
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;