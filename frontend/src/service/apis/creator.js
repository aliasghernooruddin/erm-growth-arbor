const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1/creator'

const createRiskUrl = `${BASE_DOMAIN}/create-risk`;

const getOrganisationVariablesUrl = `${BASE_DOMAIN}/organisation-variables/`;

export default ({
    create(data) {
        return axios.post(createRiskUrl, data, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    },

    getOrganisationVariables(id) {
        return axios.get(getOrganisationVariablesUrl + id, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    }

})