// Imports
import nc from 'next-connect'
import {isAuth} from '../../../Utils/Auth'
import Post from '../../../Server/Models/Post'
import User from '../../../Server/Models/User'
import dbConnection from '../../../Server/DBConnnect'

// Handlers
const handler = nc();
handler.post(async (req, res) => {
    try {
        dbConnection();
        const {caption, img, userId} = req.body;
        const user = await User.findById(userId);
        const {name, profilePic, isAdmin} = user;
        if(caption === '' && img === ''){
            res.status(403).json({message:'Caption or image is required'});
        }else{
            const post = await Post.create({...req.body, user:{name, profilePic, isAdmin}});
            res.status(201).json(post);
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;