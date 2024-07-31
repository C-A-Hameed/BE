import mongoose from "mongoose";

export const DbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Back-End"
    }).then(()=>{
        console.log("Successfully Connected to Database")
    }).catch((err) =>{
        console.log(`Some error has been occurred: ${err}`)
    })
}

