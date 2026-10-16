import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/m15.css';
import './styles/m16.css';
import './styles/m16-frames.css';
import './styles/m17-motion.css';
import './styles/m17-art.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Missing #root element');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
