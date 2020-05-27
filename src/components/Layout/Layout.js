import React, { useEffect } from 'react';

import { initGA, logPageView } from '@services/Analytics';

const Layout = ({ children }) => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return <>{children}</>;
};

export default Layout;
