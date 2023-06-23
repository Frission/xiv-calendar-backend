import mongoose from "mongoose"

export const initializeDatabase = async () => {
    if (process.env.MONGO_CONNECTION_STRING == null) {
        console.log("Mongo connection string was null. Could not connect to database.")
        return
    }

    await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
}
