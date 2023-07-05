const axios = require('axios');
const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places"

const getUserAddressHandler = async (req, res) => {
  try {
    const language = "es";
    const proximity = "ip";
    const limit = 10;
    const access_token = process.env.MAPBOX_ACCESS_TOKEN
    let { addressId, countryName, city, locality } = req.params
    const address = addressId
    const place = city;
    if (countryName === "Argentina") {
      country = "AR"
    }
    if (countryName === "Colombia") {
      country = "CO"
    }
    if (countryName === "Mexico") {
      country = "MX"
    }
    const response = await axios.get(`${BASE_URL}/${address}.json`, {
      params: {
        access_token,
        language,
        proximity,
        country,
        place,
        limit,
        locality,
        address
      }
    });
    const matchingAddress = response.data.features.map((feature) => ({
      place_name: feature.place_name,
    }))
    res.status(200).json(matchingAddress);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'No se pudo encontrar una direccion con esos parametros. Por favor, intente nuevamente' });
  }
};

module.exports = { getUserAddressHandler };

