// Imports
import nc from 'next-connect'
import {isAuth} from '../../../../Utils/Auth'
import db from '../../../../Server/DBConnnect'
import Post from '../../../../Server/Models/Post'


// Handlers
const handler = nc();
handler.use(isAuth);
handler.put(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        const {userId} = req.body;
        const post = await Post.findById(id);
        if(post.likes.includes(userId)){
            const updatedPost = await Post.findByIdAndUpdate(id, {$pull:{likes:userId}}, {new:true});
            res.status(200).json(updatedPost);
        }else{
            const updatedPost = await Post.findByIdAndUpdate(id, {$push:{likes:userId}}, {new:true});
            res.status(200).json(updatedPost);
        };
        db.disconnect();
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;