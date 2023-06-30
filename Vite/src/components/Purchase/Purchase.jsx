import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import styles from './Purchase.module.css';
import { getGeocoding, loginUserLocal } from '../../redux/slice/userSlice';
import Stripe from '../Stripe/Stripe';
import { getProductsFromCart, loadProductsToCart, deleteProductsFromCart } from '../../redux/slice/cartSlice';

const PaymentComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const paramsCartId = searchParams.get("cartId");
  const cartId = useSelector((state) => state.user.userData.cartId);
  const userData = useSelector((state) => state.user.userData);
  const [ localUserData, setLocalUserData ] = useState(userData)
  const cartData = useSelector((state) => state.cart.products);
  const cartTotal =  useSelector((state) => state.cart.total_price);

  useEffect(() => {
    dispatch(loginUserLocal())
    totalPrice()
  }, [])

  if ((cartId != undefined) && (paramsCartId != cartId)) {
    navigate(`/Purchase?cartId=${cartId}`)
  }

  const [currentTab, setCurrentTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const [productsData, setProductsData] = useState({
    products: [],
    total_price: 0
  })
  let [total, setTotal] = useState(0);
  const purchaseConfirmation = JSON.parse(localStorage?.getItem("cart"));

  useEffect(() => {
    dispatch(getProductsFromCart(cartId))
  }, [cartId])

  useEffect(() => {
    setProductsData({
      ...productsData,
      products: [...purchaseConfirmation],
      total_price: total
    })
  }, [total])

  const matchingAddress = useSelector(state => state.user.userAddress);

  const [deliveryForm, setDeliveryForm] = useState(userData);

  useEffect(() => {
    setDeliveryForm(userData);
  }, [userData]);

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
    setTimeout(() => {}, 1500)
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

  useEffect(() => {

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
              <p className={styles.tabText}>Datos de envio</p>
            </span>
            <p className={styles.tabLine}></p>
            <span className={styles.tabSpan}>
              <Tab className={styles.tab} selectedClassName={styles.activeTab}>3</Tab>
              <p className={styles.tabText}>Confirmar envio</p>
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
                      <h1 className={styles.productPrice}>
                        { product.sale_price ? <p> $ {product.quantity * product.price}</p> 
                                             : <p> $ {product.original_price * product.quantity}</p>}
                      </h1>
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
              <h1 className={styles.tabTitle}>1. Carrito</h1>
              {
                cartData && cartData.map((product) => {
                  return (
                    <div className={styles.resumeContainer} key={product.id}>
                      <h1 className={styles.productTitle}>{`(${product.product_Cart.quantity}) ${product.title}`}</h1>
                      <h1 className={styles.productPrice}>
                        { product.sale_price ? <p> $ {product.product_Cart.quantity * product.price}</p> 
                                             : <p> $ {product.original_price * product.product_Cart.quantity}</p>}
                      </h1>
                    </div>
                  )
                })

              }
              <div className={styles.totalContainer}>
                <h1 className={styles.resumePrice}>$ {cartTotal}</h1>
              </div>
            </div>
            <div className={styles.panelContainer}>
              <h1 className={styles.tabTitle}>2. Datos de envio</h1>
              <div className={styles.container}>
                <form onSubmit={handleDeliverySubmit}>

                  <div>
                    <label htmlFor="name" className={styles.label}>Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={deliveryForm.name}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese su nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="surname" className={styles.label}>Apellido</label>
                    <input
                      type="text"
                      name="surname"
                      value={deliveryForm.surname}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese su apellido"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={deliveryForm.email}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese su email"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className={styles.label}>Domicilio</label>
                    <input
                      type="text"
                      name="address"
                      value={deliveryForm.address}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese el domicilio"
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className={styles.label}>Codigo Postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={deliveryForm.postal_code}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese el código postal"
                    />
                  </div>

                  <div>
                    <label htmlFor="city" className={styles.label}>Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryForm.city}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese la ciudad"
                    />
                  </div>

                  <div>
                    <label htmlFor="country" className={styles.label}>Pais</label>
                    <select name="country" value={deliveryForm.country}  onChange={handleDeliveryChange}>
                      <option value="Argentina">Argentina</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Mexico">Mexico</option>
                    </select>
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
            <div className={styles.bannerContainer}>
              <img src="images/imagenes_hero/1.png"></img>
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <div className={styles.panelContainer}>
              <h1 className={styles.tabTitle}>1. Carrito</h1>
              {
                cartData && cartData.map((product) => {
                  return (
                    <div className={styles.resumeContainer} key={product.id}>
                      <h1 className={styles.productTitle}>{`(${product.product_Cart.quantity}) ${product.title}`}</h1>
                      <h1 className={styles.productPrice}>
                        { product.sale_price ? <p> $ {product.product_Cart.quantity * product.price}</p> 
                                             : <p> $ {product.original_price * product.product_Cart.quantity}</p>}
                      </h1>
                    </div>
                  )
                })

              }
              <div className={styles.totalContainer}>
                <h1 className={styles.resumePrice}>$ {cartTotal}</h1>
              </div>
            </div>
            <div className={styles.panelContainer}>
              <h1 className={styles.tabTitle}>2. Datos de envio</h1>
              {
                userData &&
                    <div className={styles.userDataContainer} key={userData.id}>
                        <div>
                          <h1 className={styles.userDataTag}>Nombre</h1>
                          <h1 className={styles.userDataTag}>Apellido</h1>
                          <h1 className={styles.userDataTag}>Email</h1>
                          <h1 className={styles.userDataTag}>Domicilio</h1>
                          <h1 className={styles.userDataTag}>Ciudad</h1>
                          <h1 className={styles.userDataTag}>Pais</h1>
                          <h1 className={styles.userDataTag}>Código postal</h1>
                        </div>
                        <div>
                          <h1 className={styles.userDataInfo}>{userData.name}</h1>
                          <h1 className={styles.userDataInfo}>{userData.surname}</h1>
                          <h1 className={styles.userDataInfo}>{userData.email}</h1>
                          <h1 className={styles.userDataInfo}>{userData.address}</h1>
                          <h1 className={styles.userDataInfo}>{userData.city}</h1>
                          <h1 className={styles.userDataInfo}>{userData.country}</h1>
                          <h1 className={styles.userDataInfo}>{userData.postal_code}</h1>
                        </div>
                    </div>
              }
            </div>
            <div className={styles.panelContainer}>
              <h2 className={styles.tabTitle}>3. Confirmar domicilio de envio</h2>
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
            <Stripe sale={purchaseConfirmation} total={total} shipping={deliveryForm} />
            <p>Ciudad: {deliveryForm.city}</p>
            <p>País: {deliveryForm.country}</p>
            <p>Dirección: {deliveryForm.address}</p>
            <p>Código postal: {deliveryForm.postalCode}</p>
            <div>
              {purchaseConfirmation && purchaseConfirmation.map((product) => {
                return (
                  <div className={styles.resumeContainer} key={product.id}>
                    <h1 className={styles.productTitle}>{`(${product.quantity}) ${product.title}`}</h1>
                    <h1 className={styles.productPrice}>$ {product.original_price * product.quantity}</h1>
                  </div>
                );
              })}
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