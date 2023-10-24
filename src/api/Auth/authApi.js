import axiosClient  from "../config.js";
  const  AuthApi = {
    login : (data) => {
      const url = '/auth/login';
      return axiosClient.post(url, data);
    },
    authencationToken : (accessToken) => {
        const url = '/auth/profile';
        return axiosClient.get(url, { headers: {"authorization" : `Bearer ${accessToken}`} });
    } 
  
 }
 export default AuthApi;