import ProductApi from "../api/Product/productApi.js"
class ProductService {
    async index(value){
        return await ProductApi.getListAll(value);
    }
    async create(data){
        return await ProductApi.addProduct(data);
    }
    async findOne(id){
        return await ProductApi.getById(id);
    }
    async update(data){
        return await ProductApi.updateById(data);
    }
    async delete(id){
        return await ProductApi.deleteById(id);
    }
}
export default new ProductService();