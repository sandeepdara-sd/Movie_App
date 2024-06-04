import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './components/HomePage';
import MovieDetails from './components/MovieDetails';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Playlist from './components/Playlist';
import { login } from './store';
import './App.css';
import Header from './components/Header';
import UserDetails from './components/UserDetails';

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(login());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Header/>
      <h1>Movie Library</h1>
      <Routes>
        <Route path="/" element={isLoggedIn ? <HomePage /> : <SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <LoginForm />} />
        <Route path="/movie/:id" element={isLoggedIn ? <MovieDetails /> : <LoginForm />} />
        <Route path="/playlist" element={isLoggedIn ? <Playlist /> : <LoginForm />} />
        <Route path="/user-details/:id" element={isLoggedIn ? <UserDetails /> : <LoginForm />} /> {/* Ensure this matches the Link in Header */}
      </Routes>
    </div>
  );
};

export default App;
