const validation = (product) => {


    const regex = /^[A-Za-z0-9\s]+$/ //que no contenga caracteres especiales
    const errors = {};

    if (product.title.length < 3 || product.title.length > 30) {
        errors.title = "Debe tener entre 3 y 40 caracteres"
    }
    
    
//----------------------------------------------------------------------
    
    if (isNaN(product.original_price)) {
        errors.original_price = "Solo pueden ingresarse números"
    }

    if (product.original_price <= 0) {
        errors.original_price = "el precio mínimo no puede ser menor o igual a 0"
    }
    
//-------------------------------------------------------------------
    
    if (isNaN(product.price)) {
        errors.price = "Solo pueden ingresarse números"
    }

    if (product.price < 0) {
        errors.price = "el precio mínimo no puede ser menor o igual a 0"
    }

//-------------------------------------------------------------------
    if (isNaN(product.available_quantity)) {
        errors.available_quantity = "Solo pueden ingresarse números"
    }

    if (product.available_quantity <= 0) {
        errors.available_quantity = "La cantidad mínima no puede ser menor o igual a 0"
    }

//--------------------------------------------------------------------------------

    if (!regex.test(product.oficial_store_name)) {
        errors.oficial_store_name = "No puede contener caracteres especiales"
    }

//------------------------------------------------------------------------

    if (isNaN(product.discounts)) {
        errors.discounts = "Solo pueden ingresarse números"
    }

    if (product.discounts > 100) {
        errors.discounts = "Debe ingresar valores entre 1 y 100"
    }
        
    if (product.discounts <= 0) {
        errors.discounts = "Debe ingresar valores entre 1 y 100"
    }
    
    return errors;
}

export default validation;