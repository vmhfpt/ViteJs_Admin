import axiosClient  from "../config.js";
  const  OrderApi = {
    addOrder : (data) => {
      const url = '/orders';
      return axiosClient.post(url, data);
    },
    getList : () => {
      const url = '/orders';
      return axiosClient.get(url);
    },
    updateStatus : (data, id) => {
      const url = '/orders/' + id;
      return axiosClient.patch(url, data);
    },
    updateOrder : (data) => {
      const url = '/orders/' + data.id;
      return axiosClient.patch(url, data);
    }
  
    
 }
 export default OrderApi;