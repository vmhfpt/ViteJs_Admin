import OrderDetailApi from "../api/OrderDetail/orderDetailApi";
class OrderDetailService {
    async create(data){
        return await  OrderDetailApi.addOrderDetail(data);
    }
    
}
export default new OrderDetailService();