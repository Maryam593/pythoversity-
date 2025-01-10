import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import React from 'react';



const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  
  <StrictMode>
     <App/>
  </StrictMode>
  
);
