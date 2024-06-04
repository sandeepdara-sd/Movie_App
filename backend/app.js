import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import router from "./routes/user-routes.js";
import dotenv from 'dotenv';
import movieRouter from "./routes/movie-routes.js";



const app = express();
const PORT = 5000;
app.use(cors({
    origin:["https://sd-movies.vercel.app"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

app.use(express.json())
app.use("/api/user/",router);
app.use("/api/movies/", movieRouter);

dotenv.config();
mongoose.connect(`mongodb+srv://${process.env.NAME}:${process.env.PASS}@cluster0.xa1hnza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    app.listen(PORT, () => {
        console.log("Server running on 5000");
    });
}).catch(err => {
    console.error("Connection error", err);
});
