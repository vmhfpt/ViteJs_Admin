import axiosClient  from "../config.js";
  const  OrderDetailApi = {
    addOrderDetail : (data) => {
      const url = '/orderdetails';
      return axiosClient.post(url, data);
    },
    findOneByOrderId : (id) => {
      const url = '/orderdetails/' + id;
      return axiosClient.get(url);
    },
    delete : (id) => {
      const url = '/orderdetails/' + id;
      return axiosClient.delete(url);
    },
    getStatisticByOrderProduct :() => {
      const url ='/orderdetails/get-statistic-by-order-product';
      return axiosClient.get(url);
    },
    getRevenue : (params) => {
      const url ='/orderdetails/get-revenue';
      return axiosClient.get(url, { params: params });
    }
    
 }
 export default OrderDetailApi;