import ReactGA from 'react-ga';

export const trackButtonClick = (label, action) => {
  if (typeof label === 'undefined' || label.length === 0) {
    throw Error('Label must be set for trackButtonClick');
  }

  ReactGA.event({
    category: 'Buttons',
    action: action || 'Click',
    label,
  });
};

export const trackButton = ({ label, onClick }) => {
  if (label) trackButtonClick(label);
  if (onClick) onClick();
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const initGA = () => {
  const environment = process.env.NODE_ENV;
  const isProduction = environment === 'production';
  const trackingCode = isProduction ? 'UA-104941775-4' : 'UA-000000-01';

  ReactGA.initialize(trackingCode, { debug: !isProduction });
};
