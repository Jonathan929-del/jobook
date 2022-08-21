// Imports
import nc from 'next-connect'
import cloudinaryV from '../../../Utils/Cloudinary'


// Handlers
const handler = nc();
handler.post(async (req, res) => {
    try {
        const fileStr = req.body.data;
        const img = await cloudinaryV.uploader.upload(fileStr, {upload_preset:'jobook', public_id:req.body.id});
        res.status(201).json(img);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;