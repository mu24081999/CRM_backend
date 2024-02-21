import React from "react";

const AddCategory = () => {
  return (
    <div
      id="add_new_cat"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
            <h6 class="text-uppercase fw-bold mb-3">Add Category</h6>
            <form>
              <div class="row gx-3">
                <div class="col-sm-12">
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Category Name"
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary float-end"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
