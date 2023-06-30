import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import styles from './Purchase.module.css';
import { getGeocoding, cleanUserAddress, loginUserLocal } from '../../redux/slice/userSlice';
import Stripe from '../Stripe/Stripe';
import { getProductsFromCart, loadProductsToCart, deleteProductsFromCart } from '../../redux/slice/cartSlice';

const PaymentComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const paramsCartId = searchParams.get("cartId");
  const cartId = useSelector((state) => state.user.userData.cartId);
  const userData = useSelector((state) => state.user.userData);
  const cartData = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.total_price);
  console.log(userData)

  useEffect(() => {
    dispatch(loginUserLocal())
    totalPrice()
  }, [])

  if ((cartId != undefined) && (paramsCartId != cartId)) {
    navigate(`/Purchase?cartId=${cartId}`)
  }

  const [currentTab, setCurrentTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  // const [getProducts, setGetProducts] = useState(false)

  const [productsData, setProductsData] = useState({
    products: [],
    total_price: 0
  })
  let [total, setTotal] = useState(0);
  const purchaseConfirmation = JSON.parse(localStorage?.getItem("cart"));

  useEffect(() => {
    dispatch(getProductsFromCart(cartId))
  }, [])

  useEffect(() => {
    setProductsData({
      ...productsData,
      products: [...purchaseConfirmation],
      total_price: total
    })
  }, [total])


  const matchingAddress = useSelector(state => state.user.userAddress);
  const [deliveryForm, setDeliveryForm] = useState({
    address: "",
    postalCode: "",
    city: "",
    country: ""
  });

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
  }

  const handleCart = async (event) => {
    event.preventDefault();
    handleContinue();
    await dispatch(deleteProductsFromCart(cartId))
    setTimeout(() => { }, 1500)
    await dispatch(loadProductsToCart(productsData, cartId))
    await dispatch(getProductsFromCart(cartId))
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setShowModal(true)
  }

  const handleDeleteModal = (event) => {
    event.preventDefault();
    dispatch(deleteProductsFromCart(cartId));
    setShowModal(false);
    navigate('/Cart')
  }

  const handleContinueModal = (event) => {
    event.preventDefault();
    setShowModal(false)
  }

  const handleShippingData = (e) => {
    const { name, value } = e.target;
    setDeliveryForm((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    // return () => dispatch(cleanUserAddress())
  }, [matchingAddress])

  return (
    <div className={styles.componentContainer}>
      <div className={styles.purchaseContainer}>
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
                    <div className={styles.resumeContainer} key={product.id}>
                      <h1 className={styles.productTitle}>{`(${product.quantity}) ${product.title}`}</h1>
                      <h1 className={styles.productPrice}>$ {product.original_price * product.quantity}</h1>
                    </div>
                  )
                })
              }
              <div className={styles.totalContainer}>
                <h1 className={styles.resumePrice}>$ {total}</h1>
              </div>
              <div className={styles.buttonsContainer}>
                <button className={styles.back_Button} onClick={handleCancel}>
                  Cancelar compra
                </button>
                <button className={styles.continueButton} onClick={handleCart}>
                  Continuar compra
                </button>
              </div>
              <>
                {showModal && (
                  <div className={styles.modal}>
                    <div className={styles.modalContent}>
                      <h2>Cancelación de Compra</h2>
                      <p>¿Estás seguro de que quieres cancelar la orden?</p>
                      <p>No te preocupes, tu carrito se mantendra intacto</p>
                      <div className={styles.modalButtons}>
                        <button onClick={handleDeleteModal}>Cancelar orden</button>
                        <button onClick={handleContinueModal}>Continuar orden</button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            </div>
            <div>
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
                      name="address"
                      value={deliveryForm.address}
                      onChange={handleShippingData}
                      placeholder="Ingrese la ciudad"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className={styles.label}>Codigo Postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={deliveryForm.postalCode}
                      onChange={handleShippingData}
                      placeholder="Ingrese el país"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className={styles.label}>Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryForm.city}
                      onChange={handleShippingData}
                      placeholder="Ingrese la dirección"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className={styles.label}>Pais</label>
                    <input
                      type="text"
                      name="country"
                      value={deliveryForm.country}
                      onChange={handleShippingData}
                      placeholder="Ingrese el código postal"
                    />
                  </div>
                  <div className={styles.buttonsContainer}>
                    <button className={styles.back_Button} onClick={handleBack}>
                      Atras
                    </button>
                    <button className={styles.continueButton} onClick={handleAddressSearch}>Buscar</button>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.panelContainer}>
              <h1 className={styles.tabTitle}>1. Carrito</h1>
              {
                cartData && cartData?.map((product) => {
                  return (
                    <div className={styles.resumeContainer} key={product.id}>
                      <h1 className={styles.productTitle}>{`(${product.product_Cart.quantity}) ${product.title}`}</h1>
                      <h1 className={styles.productPrice}>$ {product.original_price * product.product_Cart.quantity}</h1>
                    </div>
                  )
                })
              }
              <div className={styles.totalContainer}>
                <h1 className={styles.resumePrice}>$ {cartTotal}</h1>
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
            <div className={styles.panelContainer}>
              <h1>Carrito</h1>
              {
                purchaseConfirmation && purchaseConfirmation.map((product) => {
                  return (
                    <div className={styles.resumeContainer} key={product.id}>
                      <h1 className={styles.productTitle}>{`(${product.quantity}) ${product.title}`}</h1>
                      <h1 className={styles.productPrice}>$ {product.original_price * product.quantity}</h1>
                    </div>
                  )
                })
              }

            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <div className={styles.panelContainer}>

              <h2 className={styles.tabTitle} >Completar pago</h2>
              <Stripe sale={purchaseConfirmation} total={total} shipping={deliveryForm} products={purchaseConfirmation} />
              {/* <div>
              {purchaseConfirmation && purchaseConfirmation.map((product) => {
                return (
                  <div className={styles.resumeContainer} key={product.id}>
                  <h1 className={styles.productTitle}>{`(${product.quantity}) ${product.title}`}</h1>
                  <h1 className={styles.productPrice}>$ {product.original_price * product.quantity}</h1>
                  </div>
                  );
                })}
              </div> */}

            </div>
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