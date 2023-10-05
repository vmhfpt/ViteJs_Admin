import axiosClient  from "../config.js";
  const  OrderDetailApi = {
    addOrderDetail : (data) => {
      const url = '/order_detail';
      return axiosClient.post(url, data);
    },
    
 }
 export default OrderDetailApi;