import React, { useState } from 'react';
import validate from '../../utils/registerValidation';
//import styles from './Styles/Register.module.css'
import { GoogleAuthProvider,
   signInWithPopup,
   createUserWithEmailAndPassword, 
   signInWithEmailAndPassword,
   verifyIdToken,
   sendEmailVerification,
    } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import axios from 'axios';



const BASE_URL = 'localhoss:8000'

const countries = [
    { value: "Argentina", label: "Argentina" },
    { value: "Colombia", label: "Colombia" },
    { value: "Mexico", label: "México" },
  ];

  
  const RegisterForm = () => {
    
    const [form, setForm] = useState({
      name: '',
      surname: '',
      email: '',
      password: '',
      address: '',
      city: '',
      country: ''
    });
    
    // const [selectedCountry, setSelectedCountry] = useState('');
    const [popUp, setPopUp] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState('');


    // const closePopup = () => {
    //   setPopUp(false)
    // }

    // const handleCountryChange = (event) => {
    //   setSelectedCountry(event.target.value);
    //   setPopUp(false)
    // };

    // const Popup = ({ isOpen }) => {
    //   if (!isOpen) {
    //     return null;
    //   }    
    //   return (
    //     <div>
    //       <button onClick={closePopup}>X</button>
    //     <label htmlFor="country">Selecciona un país:</label>
    //     <select id="country" value={selectedCountry} onChange={handleCountryChange}>
    //       <option value="">Seleccionar país</option>
    //       <option value="argentina">Argentina</option>
    //       <option value="mexico">México</option>
    //       <option value="colombia">Colombia</option>
    //     </select>
    //   </div>
    //   )
    // };

    const handleChange = (event) =>{
        setForm((prevForm) => ({
            ...prevForm,
            [event.target.name]: event.target.value
          }));
          setError(validate(form));
      };

//     const loginGoogle = async () => {
//       const provider = await new GoogleAuthProvider()
//       const result = await signInWithPopup(auth, provider);
//       // const token = result.user.accessToken;
      
//       //validar si existe o no con axios a users/googleExist, llega false o datos del usuario
//       const dataEmail = { email : result.user.email }
//       const response = await axios.post('http://localhost:8000/users/googleExist', dataEmail);
//       const user = {
//         name: result.user.displayName,
//         email: result.user.email,
//         access: response.data.access,
//         isAdmin: response.data.isAdmin,
//         isSuperAdmin: response.data.isSuperAdmin
//       }

//       if (response.data.exist){
//         //SE GUARDA EL TOKEN EN LOCALSTORAGE
//         const token = await axios.post('http://localhost:8000/users/getToken', user)
//         localStorage.setItem("token", JSON.stringify(token.data))
// //***** DATOS PARA GUARDAR EN ESTADOS *****
//         console.log(user); //user es lo que se guarda en el estado, el token ya se guarda en localStorage

//       }else{
//         //no existe en nnuestra DB, hay que verificar el usuario
//         sendEmailVerification(result.user)
//         //RESOLVER TEMA PAIS
//         setPopUp(true)
//         const data = { name : result.user.displayName || 'AAAA',
//                        email: result.user.email,
//                        country: 'Argentina'
//                       }
        
//         //SE CREA EN NUESTRA DB EL USUARIO Y SE GENERA EL TOKEN          
//         const response = await axios.post('http://localhost:8000/users/googleLogin', data);
//         const token = await axios.post('http://localhost:8000/users/getToken', user)
//         //SE GUARDA EL TOKEN
//         localStorage.setItem("token", JSON.stringify(token.data))
//         const user = {
//           name: result.user.displayName,
//           email: result.user.email,
//           access: response.data.access,
//           isAdmin: response.data.isAdmin,
//           isSuperAdmin: response.data.isSuperAdmin
//           }
        
// //***** DATOS PARA GUARDAR EN ESTADOS *****
//         console.log(user);//user es lo que se guarda en el estado, el token ya se guarda en localStorage
//       }
//     }

    const register = async (user) => {
        try{ 
          const response = await axios.post('http://localhost:8000/users/register', user)
          console.log(response.data);
        }catch(error){
            console.log(error.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (Object.keys(error).length === 0) {
          try {
            register(form)
            setForm({
                name: '',
                surname: '',
                email: '',
                password: '',
                address: '',
                city: '',
                country: ''
            });
            // return response
          } catch (error) {
            setSuccess('Error al crear el usuario'+ error.message);
            // return error
          }
        }
      };


    return (
        <div>
          <Popup isOpen={popUp} onClose={closePopup} />
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Nombre
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder='Ej: Ash'
              />
            </label>
            <div>
              {error.name && <span>{error.name}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="surname">
              Apellido
              <input
                type="text" name="surname" value={form.surname} onChange={handleChange}
                placeholder='Ej: Ketchum'
              />
            </label>
            <div>
              {error.surname && <span>{error.surname}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="email">
              E-Mail
              <input
                type="text" name="email" value={form.email} onChange={handleChange}
                placeholder='Ej: ashketchum@pokemon.com'
              />
            </label>
            <div>
              {error.email && <span>{error.email}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="password">
              Contraseña
              <input
                type="password" name="password" value={form.password} onChange={handleChange}
                placeholder='Contraseña'
              />
            </label>
            <div>
              {error.password && <span>{error.password}</span>}
            </div>
          </div>
          <div>
            <label htmlFor="address">
              Direccion
              <input
                type="text" name="address" value={form.address} onChange={handleChange}
                placeholder='Ej: Ash'
              />
            </label>
          </div>
          <div>
            <label htmlFor="city">
              Ciudad
              <input
                type="text" name="city" value={form.city} onChange={handleChange}
                placeholder='Ej: Ash'
              />
            </label>
            <div>
              {error.city && <span>{error.city}</span>}
            </div>
          </div>
          <div>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Selecciona un país</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
            <div>
              {error.country && <span>{error.country}</span>}
            </div>
          </div>
          <button type="submit">REGISTRARME</button>
        </form>

        {/* ESTO HAY QUE MOVERLO AL SIGNIN */}
        {/* <button onClick={loginGoogle}>INICIAR CON GOOGLE</button> */}

        {success && (
          <div>
            <div>
              <p>{success}</p>
            </div>
          </div>
        )}
      </div>
    </div>
     
    );
}

export default RegisterForm;