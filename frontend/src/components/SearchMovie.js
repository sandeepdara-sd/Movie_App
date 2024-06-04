// src/components/SearchMovie.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Poster from './Poster';
import { Container } from '@mui/material';

const API_KEY = '3685d120';

const SearchMovie = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          if (data.Search) {
            setSuggestions(data.Search);
          } else {
            setSuggestions([]);
          }
        });
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        if (data.Search) {
          setMovies(data.Search);
        }
        setSuggestions([]);
      });
  };

  return (
    <Container style={{ padding: '20px' }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        suggestions={suggestions}
      />
      <Poster movies={movies} />
    </Container>
  );
};

export default SearchMovie;
