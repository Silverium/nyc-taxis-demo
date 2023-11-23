import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavigationHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Carbon Certificates App</Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/certificates" color="inherit">Certificates</Button>
        <Button component={Link} to="/favorites" color="inherit">Favorites</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationHeader;
