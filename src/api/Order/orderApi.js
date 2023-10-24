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
      const url = '/orders/update-state/' + id;
      return axiosClient.patch(url, data);
    },
    updateOrder : (data) => {
      const url = '/orders/' + data.id;
      return axiosClient.patch(url, data);
    },
    findOne : (id) => {
      const url = '/orders/' + id;
      return axiosClient.get(url);
    },
    getStatisticOrderDay : () => {
      const url = '/orders/get-satistic-by-day'
      return axiosClient.get(url);
    },
    getStatisticOrderStatus : () => {
      const url = '/orders/get-statistic'
      return axiosClient.get(url);
    }
    ,
    getOrderSuccess : () => {
      const url = '/orders/get-order-success'
      return axiosClient.get(url);
    }
  
    
 }
 export default OrderApi;