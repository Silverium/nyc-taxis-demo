import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const NavigationHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" flexDirection={"row"}>
          <Typography variant="h6">NYC Taxi Demo</Typography>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/taxi-trips" color="inherit">Taxi trips</Button>
        </Box>
        <Button component={Link} to="https://github.com/Silverium/nyc-taxis-demo" color="inherit">
          <GitHubIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationHeader;
