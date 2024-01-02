import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:7003/api',
    headers: {
        'Content-Type': 'application/json'
    }

});

api.interceptors.request.use(function (config) {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    console.log(token.accessToken);
    config.headers.Authorization = token? `Bearer ${token.accessToken}` : '';
    return config;
});

export default api;