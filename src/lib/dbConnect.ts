import exp from "constants";
import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection : connectionObject = {}

async function dbConnect(): Promise<void> {
        if(connection.isConnected){
            console.log("Already Connected");
            return
        }

        try {
           const db = await mongoose.connect(process.env.MONGO_URI || '' , {})

           connection.isConnected = db.connections[0].readyState

           console.log("DB Connected Successfully")
           console.log(db)


        } catch (error) {
            console.log("Database Connection Failed", error)
            process.exit(1)
        }
}

export default dbConnect;