import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ShopProvider } from './context/ShopContext'

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ShopProvider>
        <App />
      </ShopProvider>
    </React.StrictMode>
  );
}
