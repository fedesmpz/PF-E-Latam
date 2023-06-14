const validation = (product) => {


    const regex = /^[A-Z\s]+$/i //que no contenga numeros o caracteres especiales
    const errors = {};

    if (product.title.length < 3 || product.title.length > 30) {
        errors.title = "Debe tener entre 3 y 40 caracteres"
    }
    
    
//----------------------------------------------------------------------
    
    if (typeof product.original_price !== "number") {
        errors.original_price = "Solo pueden ingresarse numeros"
    }

    if (product.original_price <= 0) {
        errors.weight = "el precio minimo no puede ser menor o igual a 0"
    }

    if (weight.length > 2  || weight.length < 2) {
        errors.weight = "Enter 2 different values."
    }

    if (+weight[0] > +weight[1]) {
        errors.weight = "The minimum weight cannot be greater than maximum weight"
    }
    
//-------------------------------------------------------------------
    let height = product.height.split(" ")
    
    if (height.join("") !== +height.join("") ) {
        errors.height = "Only can be numbers"
    }

    if (+height[0] <= 0 || +height[1] <= 0) {
        errors.height = "The minimum and maximum height cannot be 0 or negative."
    }
        
    if (height.length > 2  || height.length < 2) {
        errors.height = "Enter 2 different values."
    }
        
    if (+height[0] > +height[1]) {
        errors.height = "The minimum height cannot be greater than maximum height"
    }

//-------------------------------------------------------------------
    let life_time = product.life_time.split(" ")

    if (life_time.join("") !== +life_time.join("") ) {
        errors.life_time = "Only can be numbers"
    }

    if (+life_time[0] <= 0 || +life_time[1] <= 0) {
        errors.life_time = "The minimum and maximum life_time cannot be 0 or negative."
    }

    if (life_time.length > 2  || life_time.length < 2) {
        errors.life_time = "Enter 2 different values."
    }

    if (+life_time[0] > +life_time[1]) {
        errors.life_time = "The minimum life_time cannot be greater than maximum life_time"
    }
    
    return errors;
}

export default validation;