const validation = (prop, value, errors, setErrors) => {


    const regex = /^[A-Za-z0-9\s]+$/; //que no contenga caracteres especiales
    const urlPattern = /^https?:\/\/(?:[a-z]+\.)?[a-z0-9-]+(?:\.[a-z]{2,})+(?:\/[^/?#]+)+\.(?:jpeg|jpg|gif|png)$/i;

    if (prop === "title") {
        if(!value) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar un titulo para el producto"
            })
        }
        if (value.length < 3 || value.length > 30) {
            setErrors({
                ...errors,
                [prop]: "Debe tener entre 3 y 40 caracteres"
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    
//----------------------------------------------------------------------
    if (prop === "original_price") {
        if(isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números"
            })
        }
        if(value < 0) {
            setErrors({
                ...errors,
                [prop]: "el precio mínimo no puede ser menor a 0",
            });
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    
    
//-------------------------------------------------------------------
    if (prop === "price") {
        if(isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números",
            });
        }
        if(value < 0) {
            setErrors({
                ...errors,
                [prop]: "el precio mínimo no puede ser menor a 0",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    

//-------------------------------------------------------------------
    
    if (prop === "available_quantity") {
        if(isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números",
            })
        }
    
        if(value < 0) {
            setErrors({
                ...errors,
                [prop]: "La cantidad mínima no puede ser menor o igual a 0",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    

//--------------------------------------------------------------------------------
    if (prop === "official_store_name") {
        if(!regex.test(value)) {
            setErrors({
                ...errors,
                [prop]: "No puede contener caracteres especiales",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    

//------------------------------------------------------------------------
    if (prop === "discounts") {
        if (isNaN(value)) {
            setErrors({
                ...errors,
                [prop]: "Solo pueden ingresarse números",
            })
        }
    
        if (value > 100) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar valores entre 1 y 100",
            })
        }
            
        if (value < 0) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar valores entre 1 y 100",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    
    
//-------------------------------------------------------------------------------
    if (prop === "categories") {
        if (!value) {
            setErrors({
                ...errors,
                [prop]: "Debe elejir una categoría para el producto",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }
    

//------------------------------------------------------------------------
    if (prop === "thumbnail") {
        if (urlPattern.test(value)) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar una URL de imagen válida",
            })
        }
        if (value.length < 5) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar una URL de imagen válida",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }

    if (prop === "shipping") {
        if (!value) {
            setErrors({
                ...errors,
                [prop]: "Debe elejir una opción",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }

    if (prop === "sale_price") {
        if (!value) {
            setErrors({
                ...errors,
                [prop]: "Debe elejir una opción",
            })
        }
        else {
            setErrors({
              ...errors,
              [prop]: "",
            });
        }
    }

    return errors;
}

export default validation;