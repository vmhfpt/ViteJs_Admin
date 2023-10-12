import orderDetailService from "../../service/orderDetailService";
import orderService from "../../service/orderService";
export default function Statistic(){
    orderService.getStatisticOrderStatus()
    .then((data) => {
        console.log(data);
    })
    function showAreaChart(result){
        var chart = new CanvasJS.Chart(document.getElementById("chartContainer"), {
          title: {
              text: "",
              fontSize: 24
          },
          axisY: {
              title: "Number of ordered"
          },
          data: [{
              type: "area",
              toolTipContent: "{label}: {y} order(s)/day",
              dataPoints: result
          }]
      });
      chart.render();
  }
  function showPieChart(reslut){
      const ctx = document.getElementById("pieChart").getContext('2d');
  
      const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ["on hold", "processing", "been shipped", "success", "cancelled"
      ],
          datasets: [{
          label: 'Order Items',
          data: reslut,
          backgroundColor: ["#FF4136", "#FFDC00", "#39CCCC",
          "#2ECC40", "#111111", "#B10DC9", "",
          "#001f3f", "", "#01FF70", "#85144b",
          "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
          }]
      },
      });
  }
  function showBarChart(dataArr, ticksArr){
      var bar_data = {
          data: dataArr,
          bars: {
              show: true
          }
      }
      
      $.plot('#bar-chart', [bar_data], {
          grid: {
              borderWidth: 1,
              borderColor: '#f3f3f3',
              tickColor: '#f3f3f3'
          },
          series: {
              bars: {
                  show: true,
                  barWidth: 0.5,
                  align: 'center',
              },
          },
          colors: ['red'],
          xaxis: {
              ticks: ticksArr
          }
      })
  }
    Promise.all([
        orderDetailService.getStatisticProductInOrder(),
        orderService.getStatisticOrderDay(),
        orderService.getStatisticOrderStatus()
    ])
    .then(([data, nextData, thirdData]) => {
       function check(status, dataArray){
           for (var i = 0; i < dataArray.length; i ++){
             if(dataArray[i].status == status){
                return dataArray[i].count;
             }
           }
           return 0;
       }
       let statisticOrderStatus = [];
       for(var i = 6; i >= 2; i--){
          statisticOrderStatus.push(check(i, thirdData));
       }
  
      // console.log(nextData)
       const statisticOrderByDay = nextData.map((item, key) => {
         return {
            label : `${item.date.day}/${item.date.month}/${item.date.year}`,
            y : item.count,
            x : (key)
         }
       });
     
            const statisticProductCount = data.map((item, key) => {
                return [key, item.count];
            })
            
            const statisticProductName = data.map((item, key) => {
                return [key, item.product_id.name];
            })
            showPieChart(statisticOrderStatus);
            showAreaChart(statisticOrderByDay);
            showBarChart(statisticProductCount, statisticProductName);
            
            // console.log(statisticProductCount)
            // console.log(statisticProductName)
            // console.log(data);


      $('.title-loading').removeClass('d-none');
      $('.loading-animation').remove();
    })
    return /*html */` 
    <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
    
    <h4 class="fw-bold py-3 mb-4">
    <span class="text-muted fw-light">Home/</span> Statistic
  </h4>
  <div class="px-y d-flex justify-content-center loading-animation">
            <div class="">
              <div class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-success" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-light" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <div class="spinner-grow text-dark" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
        </div>


       <div class="row my-5" >
       <div class="col-12 text-center my-3 d-none title-loading"> <h2>Statistic status order</h2></div>
       <div class="col-md-12">
       <div class="chart-responsive">
           <div class="chartjs-size-monitor">
               <div class="chartjs-size-monitor-expand">
                   <div class=""></div>
               </div>
               <div class="chartjs-size-monitor-shrink">
                   <div class=""></div>
               </div>
           </div>
           <canvas id="pieChart" height="104" style="display: block; width: 208px; height: 104px;" width="208" class="chartjs-render-monitor"></canvas>
       </div>

   </div>
       </div>


       <div class="row my-5" >
       <div class="col-12 text-center my-3 d-none title-loading"> <h2>Statistic Number of products ordered</h2></div>
       <div class="col-md-12">
       <div class="">
          
           <div id="bar-chart" style="height: 300px; padding: 0px; position: relative;">

           </div>
       </div>

   </div>
       </div>

       <div class="row my-5">
       <div class="col-12 text-center my-3 d-none title-loading"> <h2>Statistic orders by days</h2></div>
       <div class="col-md-12">
       <div class="">
          
       <div id="chartContainer" style="height: 338px; padding: 0px; position: relative;" class="full-width-chart"></div>
       </div>

   </div>
       </div>
       
       </div>
       </div>`;
}