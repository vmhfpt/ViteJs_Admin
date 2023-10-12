import orderService from "../../service/orderService";
import EditUser from "./editUser";
export default function Order(){
    var idUpdate = 0;
    function loadAllOrder(){
         
        orderService.index().then((data) => {
            $('.loading-animation').remove();
            $('.show-table').empty();
            
              data.map((item, key) => {
                
                  
                  $('.show-table').append(`<tr id="${item._id}">
                <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
                <td>${item.name}</td>
                <td>${item.phone_number}</td>
                <td><select onchange="onChangeStatusOrder(this);" data-id="${item._id}" class="form-select form-select-sm w-2  ">
                <option value="6" ${item.status == '6' ? 'selected' : ''}>On hold</option>
                <option value="5"  ${item.status == '5' ? 'selected' : ''}>Processing</option>
                <option value="4"  ${item.status == '4' ? 'selected' : ''}>Been Shipped</option>
                <option value="3"  ${item.status == '3' ? 'selected' : ''}>Success</option>
                <option value="2"  ${item.status == '2' ? 'selected' : ''}>Cancelled</option>
              </select></td>
              
                
                <td>
                  <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item btn-edit-handle " href="/order/${item._id}" data-navigo><i class="fa fa-eye mx-1" aria-hidden="true"></i> View Order</a>
                      <a onclick="detailUser(this);" data-created="${item.createdAt}" data-phone="${item.phone_number}" data-email="${item.email}" data-address="${item.address}" data-name="${item.name}" data-id="${item._id}" class="dropdown-item btn-edit-handle" href="javascript:;"><i class="bx bx-edit-alt me-1"></i> Detail User</a>
                     
                    </div>
                  </div>
                </td>
              </tr>`);
              })
        })
    }
    loadAllOrder();

    window.onChangeStatusOrder = (thisData) => {
      //console.log({status : $(thisData).val() },$(thisData).attr('data-id')); return true;
        orderService.updateStatusOrder({status : $(thisData).val() }, $(thisData).attr('data-id') ).then(() => {
           $('#exampleModalLabelCustom').text('Updated successfully');
           $('#exampleModalSuccess').modal('toggle');
        })
     }
     window.detailUser = (thisData) => {
         
        let id = $(thisData).attr('data-id');
        idUpdate = id;
        let name = $(thisData).attr('data-name');
        let phoneNumber = $(thisData).attr('data-phone');
        let email = $(thisData).attr('data-email');
        let address = $(thisData).attr('data-address');
        let createdAt = ($(thisData).attr('data-created'));
        let dataUserEdit = {
          id ,
          name,
          phoneNumber,
          email,
          address ,
          createdAt
        }
        $('.show-popup').html(EditUser(dataUserEdit,loadAllOrder));
        $('#basicModalEdit').modal('toggle');
      }
    return ( /*html*/ `
    <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
    <div class="show-popup"> </div>
    <div class="modal fade" id="exampleModalSuccess" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabelCustom">Delete successfully</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
        </div>
        
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

        </div>
      </div>
    </div>
  </div>

    

    <h4 class="fw-bold py-3 mb-4">
    <span class="text-muted fw-light">Home/</span> List Order
  </h4>
  
  
  <div class="card">

    <h5 class="card-header">Table Basic</h5>
    <div class="table-responsive text-nowrap">
      <table class="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>NAME</th>
            <th>PHONE NUMBER</th>
            <th>STATUS</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="table-border-bottom-0 show-table">
        
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
        </tbody>
      </table>
    </div>
  </div>
  </div>
    <div class="content-backdrop fade"></div>
  </div>
    `);
}