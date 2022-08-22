// Imports
import nc from 'next-connect'
import User from '../../../../Server/Models/User'
import {isAuth} from '../../../../Utils/Auth'
import dbConnection from '../../../../Server/DBConnnect'


// Handlers
const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
    const {id} = req.query;
    try {
        dbConnection();
        const user = await User.findById(id);
        const users = await Promise.all(
            user.followers.map(id => User.findById(id))
        );
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;