import React from 'react';

import { trackButton } from '@services/Analytics';

import { Touchable } from './PrimaryButton.styled';

const PrimaryButton = ({ value, onClick, ...props }) => {
  function trackClickHandler(e) {
    e.preventDefault();

    trackButton({
      label: value,
      onClick,
    });
  }

  return (
    <Touchable onClick={trackClickHandler} {...props}>
      {value}
    </Touchable>
  );
};

export default PrimaryButton;
