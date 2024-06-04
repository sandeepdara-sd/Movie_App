import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Button, Tabs, Tab, IconButton, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, login } from '../store'; 

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);
  const [value, setValue] = useState(null);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('userId');
    if (loggedInUserId && !user) {
      dispatch(login({ _id: loggedInUserId }));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(logout());
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.substring(0, 2).toUpperCase();
  };

  return (
    <AppBar 
      position='sticky' 
      sx={{ 
        background: "linear-gradient(90deg, rgba(14,14,14,1) 0%, rgba(191,29,253,1) 33%, rgba(91,191,183,1) 68%, rgba(252,69,127,1) 100%)", 
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <IconButton 
          component={Link} 
          to={isLoggedIn ? '/home' : '/'} 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold', 
            transition: 'color 0.3s, transform 0.3s', 
            ":hover": { 
              color: 'aqua', 
              transform: 'scale(1.1)' 
            } 
          }} 
          variant="h1"
        >
          MVWorld
        </IconButton>
        
        {isLoggedIn && user && user._id && (
          <Tabs 
            textColor='inherit' 
            value={value} 
            onChange={(e, val) => setValue(val)}
            sx={{marginLeft:'auto'}}
          >
            <Tab 
              component={Link} 
              to='/playlist' 
              label="My Playlist" 
              sx={{ 
                transition: 'color 0.3s', 
                ":hover": { color: 'aqua' } 
              }}
            />
          </Tabs>
        )}

        <Box 
          marginLeft='auto' 
          display='flex' 
          alignItems="center"
        >
          {isLoggedIn ? (
            <>
              <Button 
                onClick={handleLogout} 
                sx={{ 
                  mr: 1, 
                  borderRadius: 2, 
                  transition: 'background-color 0.3s', 
                  ":hover": { backgroundColor: 'rgba(255,165,0,0.8)' } 
                }} 
                variant='contained' 
                color='warning'
              >
                Logout
              </Button>
              {user && user._id && (
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    mr: 1, 
                    cursor: 'pointer', 
                    transition: 'transform 0.3s', 
                    ":hover": { transform: 'scale(1.1)' } 
                  }} 
                  component={Link} 
                  to={`/user-details/${user._id}`}
                >
                  {getInitials(user.name)}
                </Avatar>
              )}
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to='/signup' 
                sx={{ 
                  mr: 1, 
                  borderRadius: 2, 
                  transition: 'background-color 0.3s', 
                  ":hover": { backgroundColor: 'rgba(255,165,0,0.8)' } 
                }} 
                variant='contained' 
                color='warning'
              >
                SignUp
              </Button>
              <Button 
                component={Link} 
                to='/login' 
                sx={{ 
                  borderRadius: 2, 
                  transition: 'background-color 0.3s', 
                  ":hover": { backgroundColor: 'rgba(255,165,0,0.8)' } 
                }} 
                variant='contained' 
                color='warning'
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
