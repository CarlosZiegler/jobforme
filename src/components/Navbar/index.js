import React from 'react';

import Logo from '@components/Logo';

import MenuButton from '@components/MenuButton';
import { Container } from './styles';


function Navbar() {
  return (
    <Container>
      <nav className="navbar navbar-light">
        <a href="/">
          <Logo />
          SiteDoBem
        </a>
        <div className="navbar-text">
          <MenuButton />
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;
