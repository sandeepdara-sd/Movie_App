import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CircularProgress, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Playlist = () => {
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylist = async () => {
            if (!user || !user._id) {
                setLoading(false);
                return;
            }
            
            try {
                const response = await axios.get(`https://sd-movie-app.vercel.app/api/movies/playlist/${user._id}`);
                setPlaylist(response.data.playlist);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylist();
    }, [user]);

    const removeFromPlaylist = async (movieId) => {
        if (!user || !user._id) return;

        try {
            await axios.delete('https://sd-movie-app.vercel.app/api/movies/remove', {
                data: { userId: user._id, movieId }
            });
            setPlaylist((prevPlaylist) => prevPlaylist.filter((movie) => movie._id !== movieId));
        } catch (error) {
            console.error('Failed to remove movie from playlist', error);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;
    if (!user) return <Typography color="error">User not logged in</Typography>;

    return (
        <div>
            <h1>Playlist</h1>
            <Button component={Link} to='/home'>Go back..</Button>
            <Grid container spacing={2}>
                {playlist.map((movie) => (
                    <Grid item key={movie._id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="300"
                                image={movie.movieImage}
                                alt={movie.movieName}
                                style={{ objectFit: 'contain', width: '100%' }}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{movie.movieName}</Typography>
                                <Typography variant="body2" color="textSecondary">{movie.movieYear}</Typography>
                            </CardContent>
                            <Button onClick={() => removeFromPlaylist(movie._id)}>Remove</Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Playlist;
