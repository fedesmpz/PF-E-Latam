import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from "../src/redux/store/store.js";
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './utils/CartContext.jsx';
import {loadStripe} from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';

(async () => {
  const {publishableKey} = await fetch ('/config').then(r => r.json())
  const stripePromise = loadStripe(publishableKey)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartProvider>
      </React.StrictMode>,
    </BrowserRouter>
  </Provider>
)
})