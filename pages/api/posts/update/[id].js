// Imports
import nc from 'next-connect'
import db from '../../../../Server/DBConnnect'
import Post from '../../../../Server/Models/Post'


// Handlers
const handler = nc();
handler.put(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        const post = await Post.findByIdAndUpdate(id, req.body, {new:true});
        res.status(201).json(post);
        db.disconnect();
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;