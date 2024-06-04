import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/movie-routes.js";
import cors from 'cors'
import router from "./routes/user-routes.js";

const app = express();
const PORT = 5000;
app.use(cors())
app.use(express.json())
app.use("/api/user/",router);
app.use("/api/movies/", blogRouter);

mongoose.connect("mongodb+srv://sandeepdara44:kmss1234@cluster0.xa1hnza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    app.listen(PORT, () => {
        console.log("Server running on 5000");
    });
}).catch(err => {
    console.error("Connection error", err);
});
