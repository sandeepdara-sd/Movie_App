import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });
axios.defaults.withCredentials = true
  const sendRequest = async () => {
    const res = await axios.post("https://sd-movie-app.vercel.app/api/user/signup", {
      name: input.name,
      email: input.email,
      password: input.password
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
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
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          boxShadow="10px 10px 20px #ccc"
          margin={'auto'}
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant='h2' padding={3} textAlign={'center'}>SignUp</Typography>

          <TextField required name='name' type='text' onChange={handleChange} value={input.name} margin='normal' placeholder='Name' />
          <TextField required name='email' type='email' onChange={handleChange} value={input.email} margin='normal' placeholder='Email' />
          <TextField required name='password' type='password' onChange={handleChange} value={input.password} margin='normal' placeholder='Password' />
          <Button type='submit' color='warning' sx={{ borderRadius: 3, marginTop: 3 }} variant='contained'>SignUp</Button>
          <Button sx={{ marginTop: 3, borderRadius: 3 }} LinkComponent={Link} to='/login'>Change to Login</Button>
        </Box>
      </form>
    </div>
  );
};

export default SignupForm;
