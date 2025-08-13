
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: '../.env' });

connectDB();












/* // This is the first approach (but not good ok )
( async ()=> {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR",error);
            throw error 
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch(error){
        console.log("ERROR:", error)
        throw err
    }
})()
*/
// function connectDB(){}