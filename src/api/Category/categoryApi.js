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
        const url = '/categories/' + data.id;
        return axiosClient.put(url, data);
    },
    deleteById : (id) => {
        const url = '/categories/' + id;
        return axiosClient.delete(url);
    }
    // getList : () => {
    //       const url = '/category';
    //       return axiosClient.get(url);
    //   },
    //   getPostByCategory : (data) => {
    //     const url = '/post-by-category';
    //     return axiosClient.post(url, data);
    //   },
    //   getPostByTag : (data) => {
    //     const url = '/post-by-tag';
    //     return axiosClient.post(url, data);
    //   },
    //   getCity :  () => {
    //     const url = '/category/get-city';
    //     return axiosClient.get(url,  { headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` } });
    // }
 }
 export default CategoryApi;