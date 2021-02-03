const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1/creator'

const createRiskUrl = `${BASE_DOMAIN}/create-risk`;

const getOrganisationVariablesUrl = `${BASE_DOMAIN}/organisation-variables/`;

const getEmployeesDropdownUrl = `${BASE_DOMAIN}/organisation-employees/`;

const getRisksUrl = `${BASE_DOMAIN}/get-risks/`;

export default ({
    getOrganisationVariables(id) {
        return axios.get(getOrganisationVariablesUrl + id, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    },

    getEmployeesDropdown(id) {
        return axios.get(getEmployeesDropdownUrl + id, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    },

    createRisk(data) {
        return axios.post(createRiskUrl, data, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    },


    getRisks(id){
        return axios.get(getRisksUrl + id, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    }

})