// Imports
import nc from 'next-connect'
import Post from '../../../../Server/Models/Post'
import User from '../../../../Server/Models/User'
import dbConnection from '../../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.get(async (req, res) => {
    const {id} = req.query;
    try {
        dbConnection();
        const post = await Post.findById(id);
        const users = await Promise.all(
            post.likes.map(id => User.findById(id))
        );
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;