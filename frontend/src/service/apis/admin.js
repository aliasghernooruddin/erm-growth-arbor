const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1/admin'

const createUrl = `${BASE_DOMAIN}/create-organisation`;

const getOrganisationsUrl = `${BASE_DOMAIN}/get-organisations`;

export default ({
    create(data) {
        return axios.post(createUrl, data).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response)
            return err.response
        })
    },

    getOrganisations() {
        return axios.get(getOrganisationsUrl).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response)
            return err.response
        })
    }

})