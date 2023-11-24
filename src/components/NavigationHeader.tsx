import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const NavigationHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NYC Taxi Demo</Typography>
        <Button component={Link} to="/" color="inherit">Home</Button>
        <Button component={Link} to="/taxi-trips" color="inherit">Taxi trips</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationHeader;
