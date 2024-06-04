import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Box, Paper, CircularProgress, Button } from '@mui/material';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${id}`);
        setUser(response.data.user);
      } catch (err) {
        console.error('Error fetching user details:', err); // Log the error details
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress sx={{ mt: 4 }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" component="div" sx={{ mt: 4 }}>
          Error fetching user details: {error}
        </Typography>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Typography variant="h5" component="div" sx={{ mt: 4 }}>
          No user details available
        </Typography>
      </Container>
    );
  }

  return (
    <div>
      <Button LinkComponent={Link} to='/home'>Go Back...</Button>
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
          User Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            Name:
          </Typography>
          <Typography variant="body1">
            {user.name}
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            Email:
          </Typography>
          <Typography variant="body1">
            {user.email}
          </Typography>
        </Box>
      </Paper>
    </Container>
    </div>
  );
};

export default UserDetails;
