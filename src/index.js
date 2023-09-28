import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.scss';
import './index.css';
import App from './App';
// import ScrollToTop from './Component/scroll-to-top/ScrollToTop';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <ScrollToTop/> */}
  </React.StrictMode>
);