// Imports
import nc from 'next-connect'
import db from '../../../../Server/DBConnnect'
import Post from '../../../../Server/Models/Post'
import User from '../../../../Server/Models/User'


// Handlers
const handler = nc();
handler.get(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        const post = await Post.findById(id);
        const users = await Promise.all(
            post.likes.map(id => User.findById(id))
        );
        db.disconnect();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;