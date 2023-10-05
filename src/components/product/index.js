import productService from "../../service/productService";
import AddProduct from "./add";
import EditProduct from "./edit";
import axios from "axios";
export default function Product(){
    var idDelete = 0;
    const renderProducts = async () => {
        productService.index({ _start: 0, _end: 30 }).then(result => {
            $('.show-table').empty();
            $('.loading-animation').remove();
            result.map((item, key) => {
              $('.show-table').append(`<tr id="${item.id}">
                  <td><i class="fab fa-angular fa-lg text-danger me-3"></i> <strong>#${(key) + 1}</strong></td>
                  <td>${item.name}</td>
                  <td><img class="object-fit-cover" src="${item.image}" width="120" height="150" /> </td>
                  <td>${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price_sale)}</td>
                  <td>
                    <div class="dropdown">
                      <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>
                      <div class="dropdown-menu">
                        <a onclick="editHandle(this);" data-edit="${item.id}" class="dropdown-item edit-handle" href="javascript:;"><i class="bx bx-edit-alt me-1"></i> Edit</a>
                        <a onclick="confirmDelete(this);" data-delete="${item.id}" class="dropdown-item confirm-delete" href="javascript:void(0);"><i class="bx bx-trash me-1"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>`);
            })
        });
    }
    renderProducts();
    async function upLoadFile(file) {
        let formData = new FormData();
        formData.append('avatar', file);
        return await axios.post('http://localhost:3003/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            return response.data;
          })
          .catch(error => {
            console.error(error);
          });
    }
    async function deleteFile(image) {
        return await axios.post('http://localhost:3003/delete-file', { image: image })
          .then(response => {
            return (response.data)
          })
          .catch(error => {
            console.error(error);
          });
      }
    window.addHandle = () => {
        $('.show-popup').html(AddProduct(renderProducts, upLoadFile));
        $('#basicModal').modal('toggle');
    }
    window.editHandle = (thisData) => {
        let id = $(thisData).attr("data-edit");
        productService.findOne(id)
        .then((item) => {
            $('.show-popup').html(EditProduct(item, renderProducts, upLoadFile, deleteFile));
            $('#basicModalUpdate').modal('toggle');
        });
       
    }
    window.confirmDelete = (thisData) => {
        idDelete = $(thisData).attr('data-delete');
        $('.show-popup').html(`<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Are you sure ?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
    
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onclick="handleDelete(this)" type="button" class="btn btn-primary delete-item">Ok</button>
            </div>
          </div>
        </div>
      </div>`);
        $('#exampleModal').modal('toggle');
    }
    window.handleDelete = (thisData) => {
        productService.findOne(idDelete)
        .then(async (data) => {
          return await Promise.all([
            productService.delete(data.id),
            deleteFile(data.image.split('/').pop())
          ])
            .then(([dataDelete, dataFileDelete]) => {
              $('#exampleModal').modal('toggle');
              $('#exampleModalLabelCustom').text(`Delete product "${data.name}" success `);
              $('#exampleModalSuccess').modal('toggle');
              $(`#${idDelete}`).remove();
            })
        })
    }

    function readURL(input) {
        if (input.files && input.files[0]) {


            var reader = new FileReader();
            reader.onload = function (e) {
            $(".img-fluid").attr("src", e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    window.changeFile = (thisData) => {
        $(thisData).val().split("\\").pop();
        readURL(thisData);
    }
    return (/*html*/ `
    <div class="show-popup"></div>
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
    <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
      <h4 class="fw-bold py-3 mb-4">
        <span class="text-muted fw-light">Home/</span> List Product
      </h4>
      <div class="card">
        <h5 class="card-header">Table Basic</h5>
        <div class="table-responsive text-nowrap">
          <table class="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>PRICE</th>

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

      <div class="my-3">
        <div class="demo-inline-spacing">

          <a onclick="addHandle()" href="javascript:;" class="add-handle"> <button type="button" class="btn btn-success">Add
              product</button></a>
        </div>
      </div>
      <hr class="my-5">


      
    </div>
    <div class="content-backdrop fade"></div>
  </div>
  `);
}