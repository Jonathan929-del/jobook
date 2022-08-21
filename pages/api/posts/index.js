// Imports
import nc from 'next-connect'
import {isAuth} from '../../../Utils/Auth'
import db from '../../../Server/DBConnnect'
import Post from '../../../Server/Models/Post'
import User from '../../../Server/Models/User'

// Handlers
const handler = nc();
handler.post(async (req, res) => {
    try {
        db.connect();
        const {caption, img, userId} = req.body;
        const user = await User.findById(userId);
        const {name, profilePic, isAdmin} = user;
        if(caption === '' && img === ''){
            res.status(403).json({message:'Caption or image is required'});
        }else{
            const post = await Post.create({...req.body, user:{name, profilePic, isAdmin}});
            res.status(201).json(post);
        }
        db.disconnect();
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;