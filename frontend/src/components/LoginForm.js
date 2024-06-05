import React, { useState } from 'react';
import { TextField, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from './../store';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  axios.defaults.withCredentials = true
  const sendRequest = async (type = "login") => {
    const res = await axios.post(`https://sd-movie-app.vercel.app/api/user/${type}`, {
      email: input.email,
      password: input.password
    }).catch(err => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);

    sendRequest().then((data) => {
      localStorage.setItem("userId", data.user._id);
      dispatch(login(data.user));  
      navigate("/home");
    }).then(data => console.log(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} boxShadow="10px 10px 20px #ccc" margin={'auto'} marginTop={5} borderRadius={5} maxWidth={400}>
          <Typography variant='h2' padding={3} textAlign={'center'}>Login</Typography>

          <TextField required name='email' type='email' onChange={handleChange} value={input.email} margin='normal' placeholder='Email' />
          <TextField required name='password' type='password' onChange={handleChange} value={input.password} margin='normal' placeholder='Password' />
          <Button type='submit' color='warning' sx={{ borderRadius: 3, marginTop: 3 }} variant='contained'>Login</Button>
          <Button sx={{ marginTop: 3, borderRadius: 3 }} LinkComponent={Link} to='/signup'>change to signup</Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
