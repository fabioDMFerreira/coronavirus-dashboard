import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

export default () => {
  useEffect(() => {
    ReactGA.initialize("");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return <span />
}
