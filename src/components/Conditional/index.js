import React from 'react';

const Conditional = ({ when, children }) => <>{when && children}</>;
export default Conditional;
