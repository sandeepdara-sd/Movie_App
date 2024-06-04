import express from "express";
import { searchMovies, addMovieToPlaylist, removeMovieFromPlaylist, getUserPlaylist } from "../controllers/movie-controller.js";

const movieRouter = express.Router();

movieRouter.get("/search", searchMovies);
movieRouter.post("/add", addMovieToPlaylist);
movieRouter.delete("/remove", removeMovieFromPlaylist);
movieRouter.get("/playlist/:userId", getUserPlaylist);

export default movieRouter;
