import axios from 'axios';

const api = axios.create({
    baseURL: 'http://caprisoft.com.br:4000',
});

export default api;