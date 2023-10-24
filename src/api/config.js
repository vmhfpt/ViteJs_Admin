   import axios from 'axios';
   var login = JSON.parse(localStorage.getItem("login"));
   var accessToken = login ? login.access_token : '';
   //console.log(login)
    const axiosClient = axios.create({
        baseURL: 'http://localhost:3000',
        paramsSerializer: (params) => {
            return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
      
        },
    });
    axiosClient.defaults.headers.common['Authorization'] =  `Bearer ${accessToken}`;

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