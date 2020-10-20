import React from "react";
import Link from 'next/link'

import MenuButton from '@components/MenuButton'

function Navbar() {

  return (
    <header className="navbar">
      <Link href="/">
        <a>
          <h2>SiteDoBem</h2>
        </a>
      </Link>

      <MenuButton />
    </header>
  );
}

export default Navbar;
