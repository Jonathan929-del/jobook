// Imports
import nc from 'next-connect'
import db from '../../../Server/DBConnnect'
import Post from '../../../Server/Models/Post'
import Comment from '../../../Server/Models/Comment'


// Handlers
const handler = nc();
handler.get(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        const post = await Post.findById(id);
        const comments = await Comment.find({postId:post._id});
        db.disconnect();
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;