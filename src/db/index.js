import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${procces.env.MONGO_URI}/${DB_NAME}`)
        console.log(`:: Connected to Mongo Database => Name : ${connectionInstance.connection.name} ::`);
    } catch (error) {
        console.log(`:: Mongo Database connectoin failed => ${error} ::`);
        process.exit(1);
    }
}

export default connectDB