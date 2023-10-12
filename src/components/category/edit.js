import categoryService from "../../service/categoryService";
import { validateName } from "../../service/validateService";
export default function EditCategory(item, renderList){
   var checkName = true;
    window.submitUpdate = (thisData) => {
       if(checkName){
              $(thisData).prop('disabled', true);
              $(thisData).empty();
              $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
              <span class="visually-hidden">Loading...</span>
              </div>`);

              $('#exampleModalLabelCustom').text(`Updated category "${item.name}" successfully`);
              categoryService.update({
                  _id: item._id,
                  name: $('#name-category-edit').val()
              })
              .then((data) => {
                renderList();
                $('#basicModalEdit').modal('toggle');
                $('#exampleModalSuccess').modal('toggle');
              })
       }
        
    }
    window.handleInput = (thisData) => {
      checkName = validateName(thisData, $('.error-name') );
    } 
  return ( /*html*/`
  
  <div class="modal fade " id="basicModalEdit" tabindex="-1" aria-modal="true" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title name-category-edit">Edit category "${item.name}" </h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col mb-3">
            <label for="nameBasic" class="form-label">Name</label>
            <input oninput="handleInput(this)"  value="${item.name}" type="text" id="name-category-edit" class="form-control" placeholder="Enter Name">
          </div>
          <span class="text-danger error-name"> </span>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
        <button onclick="submitUpdate(this)" type="button" class="btn btn-primary submit-update">Update</button>
      </div>
    </div>
  </div>
</div>`);
}