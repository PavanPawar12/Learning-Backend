import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use(express.json({limit:"16kb"})) //accept JSON data
app.use(express.urlencoded({extended:true, limit:"16kb"})) // Read form body
app.use(express.static("public")) // Serve static files
app.use(cookieParser()) // Read cookies
app.use(cookieParser()) 

// routes import
import userRouter from './routes/user.routes.js'

// routers declaration 
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register
export {app}