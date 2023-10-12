import OrderDetailApi from "../api/OrderDetail/orderDetailApi";
class OrderDetailService {
    async create(data){
        return await  OrderDetailApi.addOrderDetail(data);
    }
    async findOne(id){
        return await OrderDetailApi.findOneByOrderId(id);
    }
    async remove(id){
        return await OrderDetailApi.delete(id);
    }
    async getStatisticProductInOrder(){
        return await OrderDetailApi.getStatisticByOrderProduct();
    }
    async getRevenue(params){
        return await OrderDetailApi.getRevenue(params);
    }
    
    
}
export default new OrderDetailService();