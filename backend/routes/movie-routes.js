import express from "express";
import { searchMovies, addMovieToPlaylist, removeMovieFromPlaylist, getUserPlaylist } from "../controllers/movie-controller.js";

const blogRouter = express.Router();

blogRouter.get("/search", searchMovies);
blogRouter.post("/add", addMovieToPlaylist);
blogRouter.delete("/remove", removeMovieFromPlaylist);
blogRouter.get("/playlist/:userId", getUserPlaylist);

export default blogRouter;
