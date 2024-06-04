// src/components/MovieLibrary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircularProgress, Typography, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';

const API_KEY = '3685d120';

const MovieLibrary = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading movies: {error.message}</Typography>;

  return (
    <Container style={{ padding: '20px' }}>
      <Typography variant="h2" gutterBottom>Movie Library</Typography>
      <Grid container spacing={2}>
        {movies.map(movie => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                
                image={movie.Poster}
                alt={`${movie.Title} Poster`}
              />
              <CardContent>
                <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="h6">{movie.Title} ({movie.Year})</Typography>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieLibrary;
