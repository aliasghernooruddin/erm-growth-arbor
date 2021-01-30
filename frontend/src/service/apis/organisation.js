import router from '../../router/index';
const axios = require('axios');


axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true
axios.defaults.withCredentials = true


// Base Domain of our Backend
// const BASE_DOMAIN = process.env.VUE_APP_BASE_DOMAIN
const BASE_DOMAIN = 'http://localhost:3000/api/v1'

const updateOrganisationUrl = `${BASE_DOMAIN}/organisation/update-organisation`;

const getOrganisationUrl = `${BASE_DOMAIN}/organisation/get-organisation`;

const addEmployeeUrl = `${BASE_DOMAIN}/organisation/add-employee`;

const getEmployeesUrl = `${BASE_DOMAIN}/organisation/get-employees`;

const getEmployeeUrl = `${BASE_DOMAIN}/organisation/get-employee`;

const addDeparmentUrl = `${BASE_DOMAIN}/organisation/add-department`;

const getDepartmentsDropdownUrl = `${BASE_DOMAIN}/organisation/get-departments-dropdown`;

axios.interceptors.response.use(function (config) {
    return config
}, function (err) {
    if (err.response.status == 401) {
        localStorage.removeItem('organisation')
        router.push('/login')
    }
    return Promise.reject(err);
})

export default ({
    updateOrganisation(data) {
        return axios.post(updateOrganisationUrl, data, { withCredentials: true })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err.response.data)
                return err.response.data
            })
    },

    getOrganisation() {
        return axios.get(getOrganisationUrl, { withCredentials: true })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err.response.data)
                return err.response.data
            })
    },

    addDepartment(data) {
        return axios.post(addDeparmentUrl, data, { withCredentials: true })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err.response.data)
                return err.response.data
            })
    },

    getDepartmentsDropdown() {
        return axios.get(getDepartmentsDropdownUrl, { withCredentials: true })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err.response.data)
                return err.response.data
            })
    },

    addEmployee(data){
        return axios.post(addEmployeeUrl, data, { withCredentials: true })
        .then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    },

    getEmployees() {
        return axios.get(getEmployeesUrl, { withCredentials: true })
            .then(res => {
                return res.data
            }).catch(err => {
                console.log(err.response.data)
                return err.response.data
            })
    },

    getEmployee(){
        return axios.get(getEmployeeUrl, { withCredentials: true })
        .then(res => {
            return res.data
        }).catch(err => {
            console.log(err.response.data)
            return err.response.data
        })
    }

})