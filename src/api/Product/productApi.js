import axiosClient  from "../config.js";
  const  ProductApi = {
    getListAll : (params) => {
      const url = '/products';
      return axiosClient.get(url, { params: params });
    },
    addProduct : (data) => {
      const url = '/products';
      return axiosClient.post(url, data);
    },
    getById : (id) => {
      const url = '/products/' + id;
      return axiosClient.get(url);
    },
    updateById : (data) => {
      const url = '/products/' + data.id;
      return axiosClient.put(url, data);
    },
    deleteById : (id) => {
      const url = '/products/' + id;
      return axiosClient.delete(url);
    }
    
 }
 export default ProductApi;