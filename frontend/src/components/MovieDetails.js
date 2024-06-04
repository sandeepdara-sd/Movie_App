import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, CircularProgress, Typography, Container, Box, Grid, Card, CardMedia, CardContent, CardActions, Chip, Slide } from '@mui/material';
import { useSelector} from 'react-redux';


const API_KEY = '3685d120';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const [isInPlaylist, setIsInPlaylist] = useState(false);
  const [movieIdInPlaylist, setMovieIdInPlaylist] = useState(null);

  const userId = user ? user._id : localStorage.getItem('userId');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        const fetchedMovie = response.data;
        setMovie(fetchedMovie);

        if (isAuthenticated && userId) {
          const playlistResponse = await axios.get(`https://sd-movie-app.vercel.app/api/movies/playlist/${userId}`);
          const playlistMovies = playlistResponse.data.playlist;
          const movieInPlaylist = playlistMovies.find(playlistMovie => playlistMovie.imdbID === fetchedMovie.imdbID);
          if (movieInPlaylist) {
            setIsInPlaylist(true);
            setMovieIdInPlaylist(movieInPlaylist._id);
          } else {
            setIsInPlaylist(false);
            setMovieIdInPlaylist(null);
          }
        }
      } catch (error) {
        setError(error.response ? error.response.data.error : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated || !userId) {
      navigate('/login');
    } else {
      fetchMovie();
    }
  }, [id, isAuthenticated, userId, navigate]);

  const handleAddToPlaylist = async () => {
    try {
      const response = await axios.post('https://sd-movie-app.vercel.app/api/movies/add', {
        title: movie.Title,
        userId: userId,
        imdbID: movie.imdbID
      });
      setIsInPlaylist(true);
      setMovieIdInPlaylist(response.data._id);
      alert('Movie added to playlist');
    } catch (error) {
      console.error('Failed to add movie to playlist', error);
      alert('Failed to add movie to playlist');
    }
  };

  const handleRemoveFromPlaylist = async () => {
    try {
      await axios.delete(`https://sd-movie-app.vercel.app/api/movies/remove/${movieIdInPlaylist}`);
      setIsInPlaylist(false);
      setMovieIdInPlaylist(null);
      alert('Movie removed from playlist');
    } catch (error) {
      console.error('Failed to remove movie from playlist', error);
      alert('Failed to remove movie from playlist');
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="60vh"><CircularProgress /></Box>;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!movie) return <Typography>No movie found</Typography>;

  const { Title, Year, Plot, Director, Actors, Genre, Runtime, imdbRating, Poster } = movie;

  return (
    <Container style={{ padding: '20px' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                image={Poster}

                alt={`${Title} Poster`}
                style={{ height: 400, objectFit: 'contain' }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CardContent>
                <Typography variant="h4" gutterBottom>{Title} ({Year})</Typography>
                <Typography variant="body1" paragraph>{Plot}</Typography>
                <Typography variant="body2"><strong>Director:</strong> {Director}</Typography>
                <Typography variant="body2"><strong>Actors:</strong> {Actors}</Typography>
                <Typography variant="body2"><strong>Genre:</strong> {Genre}</Typography>
                <Typography variant="body2"><strong>Runtime:</strong> {Runtime}</Typography>
                <Typography variant="body2"><strong>IMDb Rating:</strong> {imdbRating}</Typography>
                {Genre && Genre.split(', ').map((item, index) => (
                  <Chip key={index} label={item} style={{ marginRight: '5px', marginBottom: '5px' }} />
                ))}
              </CardContent>
              <CardActions>
                {isAuthenticated && (
                  <React.Fragment>
                    {isInPlaylist ? (
                      <Button onClick={handleRemoveFromPlaylist} sx={{marginLeft:'auto',marginRight:'auto'}} variant="contained" color="secondary">Remove from Playlist</Button>
                    ) : (
                      <Button onClick={handleAddToPlaylist} sx={{marginLeft:'auto',marginRight:'auto'}} variant="contained" color="primary">Add to Playlist</Button>
                    )}
                  </React.Fragment>
                )}
                <Button component={Link} to="/home" variant="outlined" sx={{marginRight:'auto'}}>Go Back</Button>
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Slide>
    </Container>
  );
};

export default MovieDetails;
