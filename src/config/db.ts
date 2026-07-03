import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();




const MONGOOSE_URI = process.env.MONGOOSE_URI as string;



async function dbConnect() {

    try {
        await mongoose.connect(MONGOOSE_URI)
   
        console.log('MongoDB connected');
        

    }catch(err) {
        console.log('DB error:', err);
        
    }

}


export default dbConnect;


