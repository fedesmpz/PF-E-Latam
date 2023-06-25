const validate = (form) =>{
    const errors = {};

    if (form.name.trim() === '') {
      errors.name = 'El campo Nombre es requerido';
    }
  
    if (form.surname.trim() === '') {
      errors.surname = 'El campo Apellido es requerido';
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email.trim() === '') {
      errors.email = 'El campo Email es requerido';
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Ingrese un Email válido';
    }
  
    if (form.password.trim() === '') {
        errors.password = 'El campo Contraseña es requerido';
      } else if (form.password.length < 6) {
        errors.password = 'La Contraseña debe tener al menos 6 caracteres';
      } else if (!/\d/.test(form.password) || !/[a-zA-Z]/.test(form.password)) {
        errors.password = 'La Contraseña debe contener al menos una letra y un número';
      }

    if (form.address.trim() === '') {
      errors.address = 'El campo Dirección es requerido';
    }

    if (form.city.trim() === '') {
      errors.city = 'El campo Ciudad es requerido';
    }

    if (form.country.trim() === '') {
      errors.country = 'El campo País es requerido';
    }
  
    return errors;
}

export default validate