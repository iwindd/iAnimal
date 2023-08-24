import axios from 'axios';

// ur backend domain
export const url = "https://api.mallnage.com"

const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true
});

// Export the configured Axios instance as the default export
export default axiosInstance;
