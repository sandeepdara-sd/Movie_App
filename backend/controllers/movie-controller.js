import axios from "axios";
import Blog from "../model/Movie.js";
import User from "../model/User.js";
import mongoose from 'mongoose';

export const searchMovies = async (req, res, next) => {
    const apiKey = '3685d120';
    const { id, title } = req.query;

    if (!id && !title) {
        return res.status(400).json({ message: 'Please provide either ID or title for search' });
    }

    try {
        let url = `http://www.omdbapi.com/?apikey=${apiKey}`;
        
        if (id) {
            url += `&i=${id}`;
        } else if (title) {
            url += `&t=${encodeURIComponent(title)}`;
        }

        const response = await axios.get(url);
        const movie = response.data;

        return res.status(200).json({ movie });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch movie from OMDB API' });
    }
};

export const addMovieToPlaylist = async (req, res, next) => {
    const { title, userId } = req.body;
    try {
        const apiKey = '3685d120';
        const response = await axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`);
        const { Title, Year, Poster } = response.data;

        const movie = new Blog({
            movieName: Title,
            movieYear: Year,
            movieImage: Poster,
            user: userId
        });

        await movie.save();

        const user = await User.findById(userId);
        user.blogs.push(movie);
        await user.save();

        return res.status(200).json({ movie });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add movie to playlist' });
    }
};
export const removeMovieFromPlaylist = async (req, res, next) => {
    const { movieId, userId } = req.body;
    try {
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.blogs.pull(movieId); 
        await user.save();

        return res.status(200).json({ message: 'Movie removed from playlist' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to remove movie from playlist' });
    }
};



export const getUserPlaylist = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('blogs');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ playlist: user.blogs });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch user playlist' });
    }
};


  

