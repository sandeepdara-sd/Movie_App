import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, CircularProgress, Container, Grid, TextField, Typography, Box, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';

const API_KEY = '3685d120';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?s=movie&apikey=${API_KEY}`);
        const fetchedMovies = response.data.Search;
        setMovies(fetchedMovies);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
      const data = response.data;
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Movie Search App</Typography>
      <form onSubmit={handleSearch} style={{ display: 'flex', marginBottom: '20px' }}>
        <TextField
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          fullWidth
          variant="outlined"
          sx={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">Search</Button>
      </form>
      <Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">Error loading movies: {error.message}</Typography>
        ) : (
          <Grid container spacing={10}>
            {movies.map((movie) => (
              <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
                <Card >
                  <CardActionArea component={Link} to={`/movie/${movie.imdbID}`}>
                    <CardMedia
                      component="img"
                      height="350"
                      sx={{objectFit:'contain'}}
                      image={movie.Poster}
                      alt={movie.Title}
                    />
                    <CardContent>
                      <Typography variant="h6">{movie.Title}</Typography>
                      <Typography variant="body2" color="textSecondary">{movie.Year}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {isAuthenticated && (
        <Box mt={2}>
          <Button component={Link} to="/playlist" variant="contained" color="secondary">
            Go to Playlist
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default HomePage;
