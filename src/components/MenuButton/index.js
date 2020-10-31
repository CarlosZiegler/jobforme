import React from 'react';
import Router from 'next/router';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Container } from './styles';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isReady, setIsReady] = React.useState(false);
  const [token, setToken] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  React.useEffect(() => {
    if (!isReady) {
      setToken(localStorage.getItem('token'));
    }
  }, [isReady]);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      Router.push('/login');
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Container>
      <Button
        className="btn-menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <span>Menu</span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!token && (
          <div>
            <MenuItem onClick={handleClose}>
              <a href="/" className="menu-item">
                Home
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/login" className="menu-item">
                Login
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/signup" className="menu-item">
                Signup
              </a>
            </MenuItem>
          </div>
        )}
        {token && (
          <div>
            <MenuItem onClick={handleClose}>
              <a href="/main" className="menu-item">
                Dashboard
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a className="menu-item" onClick={handleLogout}>
                Logout
              </a>
            </MenuItem>
          </div>
        )}
      </Menu>
    </Container>
  );
}
