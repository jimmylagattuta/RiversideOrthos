import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import App from './final/App';

const rootElement = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Call the renderApp function
renderApp();

// In React 18, you can also use hydrate for SSR (Server-Side Rendering) if applicable.
// Uncomment the following line if you're using SSR:
// ReactDOM.createRoot(rootElement, { hydrate: true }).render(<App />);

// Optional: Enable Concurrent Mode (React 18 feature)
// Uncomment the following line to enable Concurrent Mode:
// ReactDOM.createRoot(rootElement, { hydrate: true, concurrentUpdatesByDefault: true }).render(<App />);
