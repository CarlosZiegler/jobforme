import React from "react";


import MenuButton from '@components/MenuButton'

function Navbar() {

  return (
    <header className="navbar">
      <Link href="/">
        <a className="btn-primary">
          <h2>SiteDoBem</h2>
        </a>
      </Link>

      <MenuButton />
    </header>
  );
}

export default Navbar;
