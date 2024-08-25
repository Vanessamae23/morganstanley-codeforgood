import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import '../assets/css/header.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    setDrawerOpen(false); // Close drawer after navigation
  };

  const handleSignOut = () => {
    localStorage.removeItem('idToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Box>
      <AppBar position="static" className="header-appbar">
        <Toolbar 
          className="header-toolbar"
          sx={{ backgroundColor: 'green.400' }}
        >
          <Typography variant="h6" className="header-title">
            {title}
          </Typography>
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className="header-menu-icon"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <List className="drawer-list">
          <ListItem button onClick={() => handleMenuItemClick('/beneficiary')}>
            <ListItemText primary="Beneficiary" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/volunteer')}>
            <ListItemText primary="Volunteer" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/storagevolunteer')}>
            <ListItemText primary="Storage Volunteer" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/organization')}>
            <ListItemText primary="Organization" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/donor')}>
            <ListItemText primary="Donors" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/rewards')}>
            <ListItemText primary="Rewards" />
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/help')}>
            <ListItemText primary="Help" />
          </ListItem>
          {isLoggedIn && (
            <ListItem button onClick={handleSignOut}>
              <ListItemText primary="Sign Out" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default Header;
