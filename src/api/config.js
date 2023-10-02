   import axios from 'axios';
    
    const axiosClient = axios.create({
        baseURL: 'http://localhost:3000',
        paramsSerializer: (params) => {
            return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
      
        },
        
    });

    axiosClient.interceptors.request.use(async (config) => {
        return config;
    });

    axiosClient.interceptors.response.use((response) => {
        if (response && response.data) {
        return response.data;
        }

        return response;
    }, (error) => {
        throw error;
    });
    export default axiosClient;