import axios from 'axios';

const axiosServices = axios.create();

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default axiosServices;
