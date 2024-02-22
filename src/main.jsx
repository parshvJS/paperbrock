import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import AuthProvider from './context/authChecked.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <App/>

  </AuthProvider>
  {/* <Footer/> */}
  </BrowserRouter>
)
