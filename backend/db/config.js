import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully: ${conn.connection.host}`)
    } catch (error) {
        console.log(`error connecting to the database ${error?.message}`);
        process.exit(1)
    }
}

export default connectDB;