import router from '../../router/index';

const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true

// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1'

const loginUrl = `${BASE_DOMAIN}/auth/login`;

const logoutUrl = `${BASE_DOMAIN}/auth/logout`;

const changePasswordUrl = `${BASE_DOMAIN}/auth/change-password`;

export default ({
    login(data) {
        return axios.post(loginUrl, data)
            .then(res => {
                return res.data
            }).catch(err => {
                return err.response.data
            })
    },


    changePassword(data){
        return axios.post(changePasswordUrl, data)
            .then(res => {
                return res.data
            }).catch(err => {
                return err.response.data
            })
    },


    logout() {
        return axios.get(logoutUrl)
            .then(() => {
                localStorage.removeItem('organisation')
                router.replace('/login')
            }).catch(err => {
                return err.response.data
            })
    }

})