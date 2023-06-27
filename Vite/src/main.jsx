import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "../src/redux/store/store.js";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './utils/CartContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <CartProvider>
          <App />
        </CartProvider>
      </React.StrictMode>,
    </BrowserRouter>
  </Provider>
)
