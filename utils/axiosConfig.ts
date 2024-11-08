import axios from 'axios';

const setAxiosConfig = (token: string) => {
    if (process.env.NODE_ENV === "development") {
        axios.defaults.baseURL = 'https://savery-backend-911821030606.europe-north1.run.app';
    }
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    axios.defaults.headers.common['Content-Type'] = 'application/json';
}

export default setAxiosConfig;