const axios = require('axios');
const {
    URL_BASE_AR_COMPUTERS,
    URL_BASE_AR_CEL,
    URL_BASE_AR_CAM,
    URL_BASE_AR_VIDEO,
    URL_BASE_AR_ELEC,
    URL_BASE_MX_COMPUTERS,
    URL_BASE_MX_CEL,
    URL_BASE_MX_CAM,
    URL_BASE_MX_VIDEO,
    URL_BASE_MX_ELEC,
    URL_BASE_COL_COMPUTERS,
    URL_BASE_COL_CEL,
    URL_BASE_COL_CAM,
    URL_BASE_COL_VIDEO,
    URL_BASE_COL_ELEC
} = require("./endpoints");

const getApiInfo = async () => {
const urls = [
    URL_BASE_AR_COMPUTERS,
    URL_BASE_AR_CEL,
    URL_BASE_AR_CAM,
    URL_BASE_AR_VIDEO,
    URL_BASE_AR_ELEC,
    URL_BASE_MX_COMPUTERS,
    URL_BASE_MX_CEL,
    URL_BASE_MX_CAM,
    URL_BASE_MX_VIDEO,
    URL_BASE_MX_ELEC,
    URL_BASE_COL_COMPUTERS,
    URL_BASE_COL_CEL,
    URL_BASE_COL_CAM,
    URL_BASE_COL_VIDEO,
    URL_BASE_COL_ELEC
];

    const responses = [];

    for (const url of urls) {
        try {
            const response = await axios.get(url);
            responses.push(response.data);
        } catch (error) {
            console.error(`Error en la solicitud GET a ${url}: ${error.message}`);
        }
    }

    return responses;
};

module.exports = getApiInfo;
