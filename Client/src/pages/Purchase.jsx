import React, { useRef, useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Providers from "@/redux/provider/Provider";
import styles from './styles/Purchase/Purchase.module.css';
import NavBar from './Components/NavBar';
import SubFooter from './Components/SubFooter';
import FooterLanding from './Components/FooterLanding';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN

const PaymentComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const [currentTab, setCurrentTab] = useState(0);
  const [deliveryForm, setDeliveryForm] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: ""
  });
  
  const [paymentForm, setPaymentForm] = useState({
    name: "",

  })

  const handleTabChange = (index) => {
    setCurrentTab(index);
  };

  const handleContinue = () => {
    if (currentTab < 3) {
      setCurrentTab(currentTab + 1);
    } else {
      // Handle final payment confirmation
    }
  };

  const handleBack = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleDeliverySubmit = (event) => {
    event.preventDefault();
    handleContinue();
    // Handle form submission or validation here
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    handleContinue();
    // Handle form submission or validation here
  }

  // useEffect(() => {
  //   if (map?.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container:  mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v12',
  //     center: [lng, lat],
  //     zoom: zoom
  //   });
  // });

return (
  <div className={styles.componentContainer}>
    <NavBar></NavBar>
  <div className={styles.purchaseContainer}>
    <Tabs className={styles.tabsContainer} selectedIndex={currentTab} onSelect={handleTabChange}>
      <TabList>
        <Tab className={styles.tab}>Confirmar compra</Tab>
        <Tab className={styles.tab}>Forma de entrega</Tab>
        <Tab className={styles.tab}>Forma de pago</Tab>
        <Tab className={styles.tab}>Confirmacion de pago</Tab>
      </TabList>

      <TabPanel className={styles.tabPanel}>
        <h2>Confirmar compra</h2>
        <p>Aca iria el carrito con todos los productos cargados</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.continueButton} onClick={handleContinue}>
            Continuar
          </button>
        </div>
      </TabPanel>

      <TabPanel className={styles.tabPanel}>
        <h2>Forma de entrega</h2>
        <div className={styles.container}>
          <form onSubmit={handleDeliverySubmit}>
            <div>
              <label htmlFor="address" className={styles.label}>Direccion</label>
              <input
                type="text"
                id="address"
                name="address"
                value={deliveryForm.address}
                onChange={setDeliveryForm}
              />
            </div>
  
            <div>
              <label htmlFor="postalCode" className={styles.label}>Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={deliveryForm.postalCode}
                onChange={setDeliveryForm}
              />
            </div>
    
            <div>
              <label htmlFor="city" className={styles.label}>City:</label>
              <input
                type="text"
                id="city"
                value={deliveryForm.city}
                onChange={setDeliveryForm}
              />
            </div>
    
            <div>
              <label htmlFor="country" className={styles.label}>Country:</label>
              <input
                type="text"
                id="country"
                value={deliveryForm.country}
                onChange={setDeliveryForm}
              />
            </div>
            {/* <div>
              <div ref={mapContainer} id="map-container" className="map-container" />
            </div> */}
            <div className={styles.buttonsContainer}>
              <button className={styles.backButton} onClick={handleBack}>
                Atras
              </button>
              <button type="submit" className={styles.continueButton}>Guardar y Continuar</button>
            </div>
          </form>
        </div>
      </TabPanel>

      <TabPanel className={styles.tabPanel}>
        <h2>Forma de pago</h2>
        <p>@Demian conecta Stripe ACA</p>
        <p>Aca iria un componente de Stripe</p>
        <div className={styles.container}>
          <form onSubmit={handlePaymentSubmit}>
            <div>
              <label htmlFor="name" className={styles.label}>Titular:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={paymentForm.name}
                onChange={setPaymentForm}
              />
            </div>

            <div>
              <label htmlFor="brand" className={styles.label}>Marca:</label>
              <select
                id="brand"
                name="brand"
                value={paymentForm.brand}
                onChange={setPaymentForm}
              >
                  <option>Visa</option>
                  <option>Mastercard</option>
                  <option>AmEx</option>
              </select>
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.backButton} onClick={handleBack}>
                Atras
              </button>
              <button type="submit" className={styles.continueButton}>Continuar</button>
            </div>
          </form>
        </div>

        
      </TabPanel>

      <TabPanel className={styles.tabPanel}>
        <h2>Confirmacion de pago</h2>
        <p>Aca un resumen q carge toda la data recolectada, carrito envio y pago. Que salte un modal que diga: Confirmar pago</p>
        <div className={styles.buttonsContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            Atras
          </button>
          <button className={styles.continueButton} onClick={handleContinue}>
            Confirmar pago
          </button>
        </div>
      </TabPanel>
    </Tabs>
  </div>
  <SubFooter></SubFooter>
  <FooterLanding></FooterLanding>
  </div>
);
};

const PaymentComponentWithProvider = () => {
  return (
    <Providers>
      <PaymentComponent />
    </Providers>
  );
};

export default PaymentComponentWithProvider