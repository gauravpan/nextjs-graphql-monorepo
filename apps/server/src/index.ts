
import mongoose from 'mongoose'
import { startServer } from './app';



export const connectDb = async () => {
    try {
        console.log("Connecting Database...",)
        await mongoose.connect('mongodb://localhost:27017/test', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log("Database Connected.",)
        startServer();
    } catch (error) {
        console.log("Error connecting Database.", error.message)
    }
}

connectDb()