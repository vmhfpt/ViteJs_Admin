import categoryService from "../../service/categoryService";
import productService from "../../service/productService";
export default function EditProduct(item, renderProducts, upLoadFile, deleteFile){
    categoryService.index().then((data) => {
        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/summernote-bs4.min.js', function () {
          $('#description1, #content1').summernote();
        });
        data.map((value, key) => {
          $('#category_id1').append(`<option ${value.id == item.category_id ? 'selected' : ''} value="${value.id}"> ${value.name}</option>`);
        })
      });
    window.submitUpdate = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`);
        let file = $("#customFile")[0].files[0] ? $("#customFile")[0].files[0] : false;
        let image = $('.show-url-img1').attr('data-image');
        let name = $("#name1").val();
        let price = Number($("#price1").val());
        let category = $("#category_id1").val();
        let priceSale = Number($("#price_sale1").val());
        let description = $("#description1").val();
        let content = $("#content1").val();

        let dataProduct = {
            id: item.id,
            name,
            price,
            category_id: category,
            price_sale: priceSale,
            description,
            content,
        }
        
        
        if (file) {
            Promise.all([
            deleteFile(image.split('/').pop()),
            upLoadFile(file)
            ])
            .then(([dataDelete, dataUpdate]) => {
                productService.update({ ...dataProduct, image: 'http://localhost:3006/uploads/' + dataUpdate.nameFile }).then((data) => {
                    $('#basicModalUpdate').modal('toggle');
                    $('#exampleModalLabelCustom').text(`Update product "${dataProduct.name}" success `);
                    $('#exampleModalSuccess').modal('toggle');
                    renderProducts();
                })
            })
        }else {
          productService.update({ ...dataProduct, image }).then((data) => {
              $('#basicModalUpdate').modal('toggle');
              $('#exampleModalLabelCustom').text(`Update product "${dataProduct.name}" success `);
              $('#exampleModalSuccess').modal('toggle');
              renderProducts();
          })
        }
        
    }
    return (/*html*/ `<div class="modal fade " id="basicModalUpdate" tabindex="-1"  aria-modal="true" role="dialog">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title name-product-edit1" id="exampleModalLabel1">Edit product ${item.name}  </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
         <div class="">

          <div class="row ">
            <div class="col-6">
               <div class="row mb-3">
                   <label class="col-sm-2 col-form-label" for="basic-default-name">Name</label>
                   <div class="col-sm-10">
                     <input value="${item.name}" type="text" class="form-control" id="name1" placeholder="Enter name ...">
                   </div>
                 </div>
   
                 <div class="row mb-3">
                   <label class="col-sm-2 col-form-label" for="basic-default-name">Category</label>
                   <div class="col-sm-10">
                      <select name="" id="category_id1" class="form-control">
                          
                      </select>
                   </div>
                 </div>
            </div>
            <div class="col-6">
               <div class="row mb-3">
                   <label class="col-sm-2 col-form-label" for="basic-default-name">Price</label>
                   <div class="col-sm-10">
                     <input value="${item.price}" type="number" class="form-control" id="price1" placeholder="Enter price ...">
                   </div>
                 </div>
   
                 <div class="row mb-3">
                   <label class="col-sm-2 col-form-label" for="basic-default-name">Price sale</label>
                   <div class="col-sm-10">
                       <input value="${item.price_sale}" type="number" class="form-control" id="price_sale1" placeholder="Enter price sale...">
                   </div>
                 </div>
            </div>
            <div class="col-12">
               <div class="row mb-3">
                   <label class="col-sm-12 col-form-label" for="basic-default-name">Description</label>
                   <div class="col-sm-12">
                       <textarea class="form-control" name="" id="description1" cols="30" rows="10">${item.description}</textarea>
                   </div>
                 </div>
            </div>
            <div class="col-12">
               <div class="row mb-3">
                   <label class="col-sm-12 col-form-label" for="basic-default-name">Content</label>
                   <div class="col-sm-12">
                       <textarea class="form-control" name="" id="content1" cols="30" rows="10">${item.content}</textarea>
                   </div>
                 </div>
            </div>
         </div>

         <div class="row mb-3">
           <label class="col-sm-1 col-form-label" for="basic-default-name">Image</label>
           <div class="col-sm-11">
               <div>
                   <label for="formFileDisabled" class="form-label">Upload image for product</label>
                   <input onchange="changeFile(this);" class="form-control" type="file" id="customFile" >
                 </div>
           </div>
           
         </div>
         <div class="row mb-3">
           <div class="col-sm-1"></div>
           <div class="col-sm-2">
               <img data-image="${item.image}" src="${item.image}" alt="" class="w-100 img-fluid show-url-img1">
          </div>
           <div class="col-12 mt-4">
              <div class="row">
                   <div class="col-sm-1"></div>
                   <div class="col-4">
                       <div class="progress d-none">
                           <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 0%"  aria-valuemin="0" aria-valuemax="100"></div>
                         </div>
                   </div>
              </div>
           
           </div>
         </div>
         </div>

          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
          <button onclick="submitUpdate(this);" type="button" class="btn btn-primary submit-update">Update</button>
        </div>
      </div>
    </div>
  </div>`);
}