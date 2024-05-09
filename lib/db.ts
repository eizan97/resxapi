import mongoose, {ConnectionStates, connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if(connectionState === 1) {
        console.log("Already Connected");
        return;
    }
    if(connectionState === 2){
        console.log("Connecting...");
        return;
    } 
    try{
        mongoose.connect(MONGODB_URI!,{
            dbName: "next14resx",
            bufferCommands: false,
        })
        console.log("Connected");
    } catch (error){
        console.log("Error when connecting to database", error);
        throw new Error("Error connecting to database")
    }
}
export default connect;