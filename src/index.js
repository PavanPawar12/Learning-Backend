import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: '../.env' });
const PORT = 8000;
connectDB()
.then(()=>{
    app.listen(()=>{
        console.log(`Server start at port : ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO DB FAILDE JHERE", error);
});

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