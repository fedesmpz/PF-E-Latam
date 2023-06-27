import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './Purchase.module.css';
import SubFooter from '../SubFooter/SubFooter';
import FooterLanding from '../FooterLanding/FooterLanding';
import { getGeocoding, cleanUserAddress } from '../../redux/slice/userSlice';
import mapboxgl from 'mapbox-gl';

/* mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN */

const PaymentComponent = () => {

  const dispatch = useDispatch()

  const [currentTab, setCurrentTab] = useState(0);
  const [deliveryForm, setDeliveryForm] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: ""
  });

  const matchingAddress = useSelector(state => state.user.userAddress)

  useEffect(() => {
    // return () => dispatch(cleanUserAddress())
  }, [matchingAddress])

  const [paymentForm, setPaymentForm] = useState({
    name: "",

  })

  const purchaseConfirmation = JSON.parse(localStorage?.getItem("cart"));

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

  const handleDeliveryChange = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    setDeliveryForm({
      ...deliveryForm,
      [prop]: value
    })
  }

  const handleAddressSearch = (event) => {
    event.preventDefault()
    dispatch(getGeocoding(deliveryForm.address, deliveryForm.country));
    handleContinue();
  }

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

  return (
    <div className={styles.componentContainer}>
      <div className={styles.purchaseContainer}>
        <Tabs className={styles.tabsContainer} selectedIndex={currentTab} onSelect={handleTabChange}>
          <TabList>
            <Tab className={styles.tab}>Confirmar compra</Tab>
            <Tab className={styles.tab}>Forma de entrega</Tab>
            <Tab className={styles.tab}>Confirmar direccion de entrega</Tab>
            <Tab className={styles.tab}>Forma de pago</Tab>
            <Tab className={styles.tab}>Confirmacion de pago</Tab>
          </TabList>

          <TabPanel className={styles.tabPanel}>
            <h2>Confirmar compra</h2>
            {
              purchaseConfirmation && purchaseConfirmation.map((product) => {
                return (
                  <div>
                    <h2>{product.title}</h2>
                    <h3>$ {product.currency_id} {product.original_price}</h3>
                    <p>{product.quantity}</p>
                  </div>
                )
              })
            }
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
                    onChange={handleDeliveryChange}
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className={styles.label}>Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={deliveryForm.postalCode}
                    onChange={handleDeliveryChange}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryForm.city}
                    onChange={handleDeliveryChange}
                  />
                </div>

                <div>
                  <label htmlFor="country" className={styles.label}>Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={deliveryForm.country}
                    onChange={handleDeliveryChange}
                  />
                </div>
                {/* <div>
              <div ref={mapContainer} id="map-container" className="map-container" />
            </div> */}
                <div className={styles.buttonsContainer}>
                  <button className={styles.backButton} onClick={handleBack}>
                    Atras
                  </button>
                  <button className={styles.continueButton} onClick={handleAddressSearch}>Buscar</button>
                  {/* <button type="submit" className={styles.continueButton}>Guardar y Continuar</button> */}
                </div>
              </form>
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <h2>Confirmar direccion de entrega</h2>
            <div className={styles.container}>
              <form>
                <div>
                  <label htmlFor="addressOptions" className={styles.label}>Select address</label>
                  <select
                    name="address"
                    value={deliveryForm.address}
                    onChange={handleDeliveryChange}>
                    {matchingAddress.length && matchingAddress.map((add) => {
                      return (
                        <option value={add.place_name}>{add.place_name}</option>
                      )
                    })
                    }
                  </select>
                </div>
                <div className={styles.buttonsContainer}>
                  <button className={styles.backButton} onClick={handleBack}>
                    Atras
                  </button>
                  <button className={styles.continueButton} onClick={handleContinue} disabled >Guardar y Continuar</button>
                  {/* <button type="submit" className={styles.continueButton}>Guardar y Continuar</button> */}
                </div>
              </form>

              {/* <form onSubmit={handlePaymentSubmit}>
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
          </form> */}
            </div>


          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <h2>Forma de pago</h2>
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

export default PaymentComponent;