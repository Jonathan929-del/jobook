// Imports
import nc from 'next-connect'
import {isAuth} from '../../../Utils/Auth'
import db from '../../../Server/DBConnnect'
import User from '../../../Server/Models/User'
import Comment from '../../../Server/Models/Comment'

// Handlers
const handler = nc();
handler.use(isAuth);
handler.post(async (req, res) => {
    try {
        db.connect();
        const {userId, postId, comment} = req.body;
        const user = await User.findById(userId);
        const newComment = await Comment.create({user:{name:user.name, profilePic:user.profilePic, isAdmin:user.isAdmin}, userId, postId, comment});
        db.disconnect();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;