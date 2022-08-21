// Imports
import nc from 'next-connect'
import db from '../../../Server/DBConnnect'
import User from '../../../Server/Models/User'


// Handlers
const handler = nc();
handler.get(async (req, res) => {
    try {
        db.connect();
        const users = await User.find();
        db.disconnect();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;