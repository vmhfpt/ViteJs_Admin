import axiosClient  from "../config.js";


  const  CategoryApi = {
    getListAll : (params) => {
      const url = '/categories';
      return axiosClient.get(url, { params: params });
    },
    addCategory : (data) => {
      const url = '/categories';
      return axiosClient.post(url, data);
    },
    getById : (params) => {
        const url = '/categories/' + params;
        return axiosClient.get(url);
    },
    updateById : (data) => {
        const url = '/categories/' + data._id;
        return axiosClient.patch(url, data);
    },
    deleteById : (id) => {
        const url = '/categories/' + id;
        return axiosClient.delete(url);
    }
  
 }
 export default CategoryApi;