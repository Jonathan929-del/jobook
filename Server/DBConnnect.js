// Imports
import mongoose from 'mongoose'


// Connection
const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URL).then(() => console.log("connected to DB.")).catch( err => console.log(err));
};

export default dbConnection;