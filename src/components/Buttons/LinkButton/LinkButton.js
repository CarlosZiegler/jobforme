import React from 'react';

import { trackButton } from '@services/Analytics';

import { Touchable } from './LinkButton.styled';

const LinkButton = ({ value, ...props }) => {
  function trackClickHandler() {
    trackButton({
      label: value,
    });
  }

  return (
    <Touchable onClick={trackClickHandler} rel="noopener noreferrer" {...props}>
      {value}
    </Touchable>
  );
};

export default LinkButton;
