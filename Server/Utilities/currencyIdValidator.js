const currencyIdValidator = (country) => {
    if(country === "Argentina") {
        return "ARS"
    };
    if(country === "Colombia") {
        return "COP"
    }
    if(country === "Mexico") {
        return "MXN"
    }
}

module.exports = {
    currencyIdValidator
}