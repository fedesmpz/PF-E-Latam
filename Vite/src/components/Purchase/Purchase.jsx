import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import styles from './Purchase.module.css';
import { getGeocoding, cleanUserAddress } from '../../redux/slice/userSlice';
import Stripe from '../Stripe/Stripe';
// import mapboxgl from 'mapbox-gl';
import { Link } from 'react-router-dom';

const PaymentComponent = () => {

  const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState(0);
  let [total, setTotal] = useState(0);
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


  const purchaseConfirmation = JSON.parse(localStorage?.getItem("cart"));
  console.log(purchaseConfirmation)

  const totalPrice = () => {
    let totalAux = 0;
    if (purchaseConfirmation?.length > 0) {
      purchaseConfirmation?.forEach((product) => {
        product.sale_price
          ? setTotal((totalAux += product.price * product.quantity))
          : setTotal((totalAux += product.original_price * product.quantity));
      });
    }
    setTotal(totalAux)
    console.log(total)
  };

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

  useEffect(() => {
    totalPrice()
  }, [])

  return (
    <div className={styles.componentContainer}>
      <div className={styles.purchaseContainer}>
        <Link to="/Cart">
          <button className={styles.backButton}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M20.59 12H5.41l4.29-4.29a1 1 0 1 0-1.42-1.42l-6 6a1 1 0 0 0 0 1.42l6 6a1 1 0 0 0 1.42-1.42L5.41 12h15.18z" />
            </svg>
          </button>
        </Link>
        <Tabs className={styles.tabsContainer} selectedIndex={currentTab} onSelect={handleTabChange}>
          <TabList className={styles.circularTabs}>
            <span className={styles.tabSpan}>
              <Tab className={styles.tab} selectedClassName={styles.activeTab}>1</Tab>
              <p className={styles.tabText}>Confirmar compra</p>
            </span>
            <p className={styles.tabLine}></p>
            <span className={styles.tabSpan}>
              <Tab className={styles.tab} selectedClassName={styles.activeTab}>2</Tab>
              <p className={styles.tabText}>Forma de entrega</p>
            </span>
            <p className={styles.tabLine}></p>
            <span className={styles.tabSpan}>
              <Tab className={styles.tab} selectedClassName={styles.activeTab}>3</Tab>
              <p className={styles.tabText}>Confirmar entrega</p>
            </span>
            <p className={styles.tabLine}></p>
            <span className={styles.tabSpan}>
              <Tab className={styles.tab} selectedClassName={styles.activeTab}>4</Tab>
              <p className={styles.tabText}>Forma de pago</p>
            </span>
          </TabList>

          <TabPanel>
            <div className={styles.panelContainer}>
              <h1 className={styles.tabTitle}>Confirmar compra</h1>
              {
                purchaseConfirmation && purchaseConfirmation.map((product) => {
                  return (
                    <div className={styles.resumeContainer}>
                      <h1 className={styles.productTitle}>{`(${product.quantity}) ${product.title}`}</h1>
                      <h1 className={styles.productPrice}>$ {product.original_price * product.quantity}</h1>
                    </div>
                  )
                })
              }
              <div className={styles.totalContainer}>
                <h1 className={styles.resumePrice}>$ {total}</h1>
              </div>
              <div className={styles.firstButtonsContainer}>
                <button className={styles.firstContinueButton} onClick={handleContinue}>
                  Continuar
                </button>
              </div>
            </div>
            <div className={styles.bannerContainer}>
              <img src="images/imagenes_hero/1.png"></img>
            </div>
          </TabPanel>

          <TabPanel>
            <div className={styles.panelContainer}>
              <h1 className={styles.tabTitle}>Forma de entrega</h1>
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
                    <label htmlFor="postalCode" className={styles.label}>Codigo Postal</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={deliveryForm.postalCode}
                      onChange={handleDeliveryChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className={styles.label}>Ciudad</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={deliveryForm.city}
                      onChange={handleDeliveryChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className={styles.label}>Pais</label>
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
                    <button className={styles.back_Button} onClick={handleBack}>
                      Atras
                    </button>
                    <button className={styles.continueButton} onClick={handleAddressSearch}>Buscar</button>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.bannerContainer}>
              <img src="images/imagenes_hero/1.png"></img>
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <div className={styles.panelContainer}>
              <h2 className={styles.tabTitle}>Confirmar domicilio</h2>
              <div className={styles.container}>
                <form>
                  <div>
                    <label htmlFor="addressOptions" className={styles.label}>Seleccionar</label>
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
                    <button className={styles.back_Button} onClick={handleBack}>
                      Atras
                    </button>
                    <button className={styles.continueButton} onClick={handleContinue}>Guardar y Continuar</button>
                  </div>
                </form>
              </div>
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <h2>Forma de pago</h2>
            <Stripe sale={purchaseConfirmation} total={total} />
            <p>Aca un resumen q carge toda la data recolectada, carrito envio y pago. Que salte un modal que diga: Confirmar pago</p>
            <div className={styles.buttonsContainer}>
              <button className={styles.back_Button} onClick={handleBack}>
                Atras
              </button>
              <button className={styles.continueButton} onClick={handleContinue}>
                Confirmar pago
              </button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentComponent;