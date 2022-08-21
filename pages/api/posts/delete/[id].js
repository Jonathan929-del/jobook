// Imports
import nc from 'next-connect'
import db from '../../../../Server/DBConnnect'
import Post from '../../../../Server/Models/Post'


// Handlers
const handler = nc();
handler.delete(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        await Post.findByIdAndDelete(id, req.body);
        res.status(200).json('Post deleted');
        db.disconnect();
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;