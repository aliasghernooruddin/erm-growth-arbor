const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1/committee'

const getRisksUrl = `${BASE_DOMAIN}/get-risks/`;

const updateRiskUrl = `${BASE_DOMAIN}/update-risk/`;

export default ({
    getRisks(id){
        return axios.get(getRisksUrl + id, { withCredentials: true }).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    },

    updateRisk(data) {
        return axios.post(updateRiskUrl, data, { withCredentials: true })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err.response.data)
                return err.response.data
            })
    },

})