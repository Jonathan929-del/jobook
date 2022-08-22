// Imports
import nc from 'next-connect'
import User from '../../../Server/Models/User'
import dbConnection from '../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.get(async (req, res) => {
    try {
        dbConnection();
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;