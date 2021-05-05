import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './fonts.scss';
import App from './app';
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
// Disable service worker because caching is complicated
// registerServiceWorker();
