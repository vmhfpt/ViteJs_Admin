import  CategoryApi from "../api/Category/categoryApi.js"
class CategoryService {
    async index(params){
        return await  CategoryApi.getListAll(params);
    }
    async create(data){
        return await  CategoryApi.addCategory(data);
    }
    async findOne(params){
        return await  CategoryApi.getById(params);
    }
    async update(data){
        return await  CategoryApi.updateById(data);
    }
    async delete(id){
        return await CategoryApi.deleteById(id);
    }
}
export default new CategoryService();