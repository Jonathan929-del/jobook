// Imports
import nc from 'next-connect'
import db from '../../../../Server/DBConnnect'
import User from '../../../../Server/Models/User'
import {isAuth} from '../../../../Utils/Auth'


// Handlers
const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
    const {id} = req.query;
    try {
        db.connect();
        const user = await User.findById(id);
        const users = await Promise.all(
            user.following.map(id => User.findById(id))
        );
        db.disconnect();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;