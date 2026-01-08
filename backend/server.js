import express from "express"
import { ENV } from "./lib/ENV.js";
import cookieParser from "cookie-parser"
import cors from "cors";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"
import todoRouter from "./routes/todo.route.js";


const app = express();
const PORT = ENV.PORT||5000;

app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}))
app.use(cors({ origin: ENV.CLIENT_URL|| "http://localhost:5173", credentials: true }));
app.use(cookieParser())



app.get("/", (req, res)=>{
    res.send("Home page called.")
})

app.get("/test", (req, res)=>{
    res.status(200).json({message:"Test API working fine."})
})

app.use("/api/user", userRouter );

app.use("/api/auth",authRouter)

app.use("/api/todo", todoRouter)





app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`)
})

