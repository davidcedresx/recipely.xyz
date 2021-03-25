import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'production' ? 'https://api.recipely.xyz' : 'http://localhost:3000'

function getToken() {
    return localStorage.getItem('token')
}

// Create custom axios instance
const instance = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    config.headers['Authorization'] = 'Bearer ' + getToken()
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    console.log('axios response: ', response)
    return response.data
}, function (error) {
    return Promise.reject({ message: error?.response?.data });
});

export default instance
