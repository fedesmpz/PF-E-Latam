import React from 'react';
import {createRoot} from 'react-dom/client'
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store.js';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './utils/CartContext.jsx';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

(async () => {
  const publishableKey ="pk_test_51NMEmIAqi82qB8rdk5u9DSh5HftC0y0vHfObWPq8oeiqZMfK6u7rQSTtObLBKU7alvmS6tSK1ZazuQqWbP7fb7Vp00b2aBy1Mk"
  const stripePromise = loadStripe(publishableKey);

  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <CartProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </CartProvider>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  );
})();