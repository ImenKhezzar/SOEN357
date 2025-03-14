import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Authentication from './pages/Authentication.tsx';
import App from "./App.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <Authentication/> */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
