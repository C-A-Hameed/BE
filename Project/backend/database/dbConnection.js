import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "TODO_APPLICATION"
    }).then(()=>{
        console.log("Connected to the database successfully")
    })
    .catch((error) => {
        console.log(`Some error occurred while connecting to the database: ${error}`)
    })
};