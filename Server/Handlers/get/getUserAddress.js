const axios = require('axios');
const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places"

const getUserAddressHandler = async (req, res) => {
  try {
    const language = "es";
    const proximity = "ip"
    const access_token = process.env.MAPBOX_ACCESS_TOKEN
    let { addressId, countryName } = req.params
    if (countryName === "Argentina") {
      country = "AR"
    }
    if (countryName === "Colombia") {
      country = "CO"
    }
    if (countryName === "Mexico") {
      country = "MX"
    }
    const response = await axios.get(`${BASE_URL}/${addressId}.json`, {
      params: {
        access_token,
        language,
        country,
        proximity
      }
    });
    res.status(200).json(response.data.features.map((feature) => ({
      place_name: feature.place_name,
      geometry: feature.geometry.coordinates
    })));
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to retrieve user address' });
  }
};

module.exports = { getUserAddressHandler };

