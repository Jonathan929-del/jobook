// Imports
import nc from 'next-connect'
import Post from '../../../../Server/Models/Post'
import dbConnection from '../../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.delete(async (req, res) => {
    const {id} = req.query;
    try {
        dbConnection();
        await Post.findByIdAndDelete(id, req.body);
        res.status(200).json('Post deleted');
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;