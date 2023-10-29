// Готовый вариант с сайта https://webdeasy.de/en/css-loader/

import React from 'react';
import './PageLoader.css';

function PageLoader() {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  );
}

export default PageLoader;