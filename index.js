import express from "express";
import dotenv from "dotenv";
import connectDB from "./backend/db/config.js";
import userRoutes from "./backend/routes/userRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport"
// import "./backend/oauth/passport.js"

dotenv.config();

const app = express()
const PORT = process.env.PORT

// middleware
app.use(cors({
    origin: "http://localhost:5173",  // change this to your domain
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({
    extended: true,  // to parse urlencoded data
}))
app.use(cookieParser())


app.use("/api/auth", userRoutes)  // add this line to use the userRoutes

app.get("/", (req,res)=> {
    res.send("Hello World!")
})

// passport oauth route

// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))

// app.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/login" ,successRedirect: "/dashboard"}))


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`)
    await connectDB()
    
})

