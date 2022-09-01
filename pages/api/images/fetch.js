// Imports
import nc from 'next-connect'
import cloudinaryV from '../../../Utils/Cloudinary'


// Handlers
const handler = nc();
handler.get(async (req, res) => {
    try {
        const images = await cloudinaryV.search
            .expression('folder:jobook')
            .sort_by('public_id', 'desc')
            .max_results(100)
            .execute();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json(err.message);
    }
});


// Export
export default handler;