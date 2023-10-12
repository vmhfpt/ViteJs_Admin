import OrderApi from "../api/Order/orderApi";
class OrderService {
    
    async create(data){
        return await  OrderApi.addOrder(data);
    }
    async index(){
        return await OrderApi.getList();
    }
    async updateStatusOrder(data, id){
        return await OrderApi.updateStatus(data, id);
    }
    async update(data){
        return await OrderApi.updateOrder(data);
    }   
    async findOne(id){
        return await OrderApi.findOne(id);
    }
    async getStatisticOrderDay(){
        return await OrderApi.getStatisticOrderDay();
    }
    async getStatisticOrderStatus(){
        return await OrderApi.getStatisticOrderStatus();
    }
    async getOrderSuccess(){
        return await OrderApi.getOrderSuccess();
    }
   
}
export default new OrderService();