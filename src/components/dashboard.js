import orderService from "../service/orderService";
import orderDetailService from "../service/orderDetailService";
export default function Dashboard(){
    Promise.all([
      orderService.getStatisticOrderStatus(),
      orderService.getOrderSuccess()
    ])
    .then(async ([data, dataOrder]) => {
      const totalRevenue = await Promise.all(dataOrder.map(async (item, key) => {
          const dataRevenue = await orderDetailService.getRevenue({id : item._id});
          return dataRevenue[0].count;
      }));
    
     let sumRevenue = totalRevenue.reduce((a, b) => a + b, 0);
      $('.revenue').text(new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(sumRevenue));
    // console.log(sumRevenue)
        let cancel = 0;
        let success = 0;
        let process = 0;
        data.map((item, key) => {
            if(item.status == 3){
                success = success + item.count;
            }
            if(item.status == 2){
                cancel = cancel + item.count;
            }
            if(item.status == 6 || item.status == 5 || item.status == 4){
                process = process + item.count;
            }
        })
        $('.order-success').text(`${success} order` );
        $('.order-process').text(`${process} order` );
        $('.order-cancel').text(`${cancel} order` );
        
    })
    return (/*html*/ `    <div class="content-wrapper">
                <div class="container-xxl flex-grow-1 container-p-y">
                         
        <div class="row">
        <div class="col-lg-12 mb-4 order-0">
            <div class="row"> 
            <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn.icon-icons.com/icons2/2785/PNG/512/shipping_success_icon_177371.png" alt="chart success" class="rounded">
                  </div>
                  
                </div>
                <span class="fw-medium d-block mb-1"> Order success</span>
                <h3 class="card-title mb-2 order-success"></h3>
                
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn-icons-png.flaticon.com/512/2795/2795368.png" alt="Credit Card" class="rounded">
                  </div>
                  
                </div>
                <span>Order processing</span>
                <h3 class="card-title text-nowrap mb-1 order-process"></h3>
               
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn.icon-icons.com/icons2/2785/PNG/512/trolley_cart_cancel_icon_177409.png" alt="Credit Card" class="rounded">
                  </div>
                  
                </div>
                <span>Order canceled</span>
                <h3 class="card-title text-nowrap mb-1 order-cancel"></h3>
               
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-12 col-6 mb-4">
            <div class="card">
              <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                  <div class="avatar flex-shrink-0">
                    <img src="https://cdn-icons-png.flaticon.com/512/8922/8922324.png" alt="Credit Card" class="rounded">
                  </div>
                 
                </div>
                <span>Revenue</span>
                <h3 class="card-title text-nowrap mb-1 revenue">$4,679</h3>
              
              </div>
            </div>
          </div>
            </div>
        </div>
    



      </div>

        
                </div>
                <div class="content-backdrop fade"></div>
            </div>`);
}