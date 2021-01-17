const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1'

const loginUrl = `${BASE_DOMAIN}/auth/login`;

export default ({
    login(data) {
        return axios.post(loginUrl, data).then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response)
            return err.response
        })
    }

})