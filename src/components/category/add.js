import categoryService from "../../service/categoryService";
import { v4 as uuidv4 } from 'uuid';
export default function AddCategory(renderList){
    window.submitAdd = (thisData) => {
        $(thisData).prop('disabled', true);
        $(thisData).empty();
        $(thisData).append(`<div class="spinner-border spinner-border-sm text-danger" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>`);
        categoryService.create({
            id: uuidv4(),
            name: ($('#name-category').val())
          }).then((data) => {
            renderList();
            $('#basicModal').modal('toggle');
          });
          
    }
  
    return(`  <div class="modal fade " id="basicModal" tabindex="-1" aria-modal="true" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">Add category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col mb-3">
              <label for="nameBasic" class="form-label">Name</label>
              <input type="text" id="name-category" class="form-control" placeholder="Enter Name">
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">Close</button>
          <button onclick="submitAdd(this)" type="button" class="btn btn-primary submit-add">Add new</button>
        </div>
      </div>
    </div>
  </div>`);
}