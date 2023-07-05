const validation = (prop, value, errors, setErrors) => {

    const regex = /^[A-Za-z\s]+$/; //que no contenga caracteres especiales o números
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //validación básica para email.

    if (prop === "name") {
        if(!value.length) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar un nombre"
            })
        }
        else if (!regex.test(value)) {
            setErrors({
                ...errors,
                [prop]: "No puede contener caracteres numéricos o especiales"
            })
        }
        else if (value.length < 1 || value.length > 25) {
            setErrors({
                ...errors,
                [prop]: "Debe tener entre 1 y 25 caracteres"
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
if (prop === "surname") {
    if(!value.length) {
        setErrors({
            ...errors,
            [prop]: "Debe ingresar un apellido o especiales"
        })
    }
    else if (!regex.test(value)) {
        setErrors({
            ...errors,
            [prop]: "No puede contener caracteres numéricos"
        })
    }
    else if (value.length < 1 || value.length > 25) {
        setErrors({
            ...errors,
            [prop]: "Debe tener entre 1 y 25 caracteres"
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
    
    if (prop === "address") {
        if(!value.length) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar una dirección"
            })
        }
        else if (value.length < 3 || value.length > 50) {
            setErrors({
                ...errors,
                [prop]: "Debe tener entre 3 y 50 caracteres"
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

if (prop === "city") {
    if(!value.length) {
        setErrors({
            ...errors,
            [prop]: "Debe ingresar una ciudad o distrito",
        })
    }
    else if (value.length < 3 || value.length > 50) {
        setErrors({
            ...errors,
            [prop]: "Debe tener entre 3 y 50 caracteres"
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
    if (prop === "postal_code") {
        if (!value.length) {
            setErrors({
                ...errors,
                [prop]: "Debe ingresar un código postal",
              });
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