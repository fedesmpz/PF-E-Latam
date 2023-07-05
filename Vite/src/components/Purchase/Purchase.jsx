import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import styles from './Purchase.module.css';
import userSlice, { loginUserLocal, updateUser, getUserById } from '../../redux/slice/userSlice';
import Stripe from '../Stripe/Stripe';
import { getProductsFromCart, loadProductsToCart, deleteProductsFromCart } from '../../redux/slice/cartSlice';
import validation from '../../utils/deliveryValidation';

const PaymentComponent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(true)
  let [errors, setErrors] = useState({})
  const searchParams = new URLSearchParams(location.search);
  const paramsCartId = searchParams.get("cartId");
  const cartId = useSelector((state) => state.user.userData.cartId);
  const userData = useSelector((state) => state.user.userData);
  const cartData = useSelector((state) => state.cart.products);
  const cartTotal = useSelector((state) => state.cart.total_price);
  const [deliveryForm, setDeliveryForm] = useState(userData);

  
  useEffect(() => {
    setDeliveryForm(userData);
  }, [userData]);

  useEffect(() => {
    dispatch(loginUserLocal())
    totalPrice()
  }, [])
  
  const hasNullProperties = (obj, propertyNames) => {
    return propertyNames.some((propertyName) => obj[propertyName] === null);
  }
  const propertiesToCheck = ['name', 'surname', 'address', 'city', 'postal_code'];
  const hassNull = hasNullProperties(deliveryForm, propertiesToCheck)
  

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
  }, [total, cartData])


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

    validation(prop, value, errors, setErrors)
  }

  const handleDeliverySubmit = (event) => {
    event.preventDefault();
    dispatch(updateUser(deliveryForm.userId, deliveryForm))
    handleContinue();
    setErrors({})
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

  useEffect(() => {
    let isValid = (Object.keys(errors).length && Object.values(errors).every((error) => error === ""));
    if (isValid === 0){
      isValid = true
    }
    if (hassNull){
      isValid = false
    }
    setIsFormValid(isValid);
  }, [errors, deliveryForm]);

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
              <p className={styles.tabText}>Completar pago</p>
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
                        {product.sale_price ? <p> $ {product.quantity * product.price}</p>
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
              <img src="images/imagenes_hero/1.png" alt="" />
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
                        {product.sale_price ? <p> $ {product.product_Cart.quantity * product.price}</p>
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
                    {errors.name && <p className={styles.errors}>{errors.name}</p>}
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
                    {errors.surname && <p className={styles.errors}>{errors.surname}</p>}
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
                    {errors.address && <p className={styles.errors}>{errors.address}</p>}
                  </div>

                  <div>
                    <label htmlFor="city" className={styles.label}>Ciudad o distrito</label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryForm.city}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese la ciudad o distrito"
                    />
                    {errors.city && <p className={styles.errors}>{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="country" className={styles.label}>Pais</label>
                    <select name="country" value={deliveryForm.country} onChange={handleDeliveryChange}>
                      <option value="Argentina">Argentina</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="postal_code" className={styles.label}>Codigo Postal</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={deliveryForm.postal_code}
                      onChange={handleDeliveryChange}
                      placeholder="Ingrese el código postal"
                    />
                    {errors.postal_code && <p className={styles.errors}>{errors.postal_code}</p>}
                  </div>

                  <div className={styles.buttonsContainer}>
                    <button className={styles.back_Button} onClick={handleBack}>
                      Atras
                    </button>
                    <button className={`${isFormValid ? styles.continueButton : styles.submitDisabledButton}`} disabled={!isFormValid}>
                      Guardar y continuar
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.bannerContainer}>
              <img src="images/imagenes_hero/1.png"></img>
            </div>
          </TabPanel>

          <TabPanel className={styles.tabPanel}>
            <div className={styles.megaContainer}>
              <div className={styles.doublePanelContainer}>
                <h1 className={styles.tabTitle}>1. Carrito</h1>
                {
                  cartData && cartData?.map((product) => {
                    return (
                      <div className={styles.resumeContainer} key={product.id}>
                        <h1 className={styles.productTitle}>{`(${product.product_Cart.quantity}) ${product.title}`}</h1>
                        <h1 className={styles.productPrice}>
                          {product.sale_price ? <p> $ {product.product_Cart.quantity * product.price}</p>
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
                      <h1 className={styles.userDataTag}>Domicilio y localidad</h1>
                      <h1 className={styles.userDataTag}>Ciudad</h1>
                      <h1 className={styles.userDataTag}>País</h1>
                      <h1 className={styles.userDataTag}>Código postal</h1>
                    </div>
                    <div>
                      <h1 className={styles.userDataInfo}>{deliveryForm.name}</h1>
                      <h1 className={styles.userDataInfo}>{deliveryForm.surname}</h1>
                      <h1 className={styles.userDataInfo}>{deliveryForm.address}</h1>
                      <h1 className={styles.userDataInfo}>{deliveryForm.city}</h1>
                      <h1 className={styles.userDataInfo}>{deliveryForm.country}</h1>
                      <h1 className={styles.userDataInfo}>{deliveryForm.postal_code}</h1>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className={styles.panelContainer}>
              <h2 className={styles.tabTitle} >3. Completar pago</h2>
              <div>
                <Stripe sale={purchaseConfirmation} total={total} />
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button className={styles.back_Button} onClick={handleBack}>
                Atras
              </button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentComponent;