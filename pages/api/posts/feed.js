// Imports
import nc from 'next-connect'
import Post from '../../../Server/Models/Post'
import dbConnection from '../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.post(async (req, res) => {
    try {
        dbConnection();
        const {ids} = req.body;
        const posts = await Promise.all(
            ids.map(id => {
                return Post.find({userId:id});
            })
        );
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;