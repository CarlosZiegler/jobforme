import React from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isReady, setIsReady] = React.useState(false);
  const [token, setToken] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  React.useEffect(() => {
    setIsReady((isReady) => isReady = true)
  }, [])

  React.useEffect(() => {
    if (isReady != false) {
      setToken(localStorage.getItem('token'))
    }
  }, [isReady])



  return (

    <div>
      <Button className="btn-coral" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <span >Menu</span>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a href="/" className="menu-item">Home</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="/login" className="menu-item">Login</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="/signup" className="menu-item">Signup</a>
        </MenuItem>
        {token && (
          <div>
            <MenuItem onClick={handleClose}>
              <a href="/main" className="menu-item">Main</a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href="/logout" className="menu-item">Logout</a>
            </MenuItem>
          </div>)
        }

      </Menu>
    </div>
  );
}
