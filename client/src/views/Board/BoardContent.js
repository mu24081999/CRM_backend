import React, { useState } from "react";

import SideNav from "./components/SideNav";
import BoardHeader from "./components/BoardHeader";
import BoardList from "./components/BoardList";

const BoardContent = () => {
  const [toggleType, setToggleType] = useState("board");
  const handleToggleChange = (value) => {
    setToggleType(value);
  };
  return (
    <div>
      {/* <!-- Main Content --> */}
      <div className="hk-pg-wrapper pb-0">
        {/* <!-- Page Body --> */}
        <div className="hk-pg-body py-0">
          <div className="taskboardapp-wrap">
            <SideNav />

            <div className="taskboardapp-content">
              <div className="taskboardapp-detail-wrap">
                <BoardHeader onToggle={handleToggleChange} />
                <div className="taskboard-body">
                  <div data-simplebar className="nicescroll-bar">
                    <div className="container-fluid">
                      <div className="row justify-content-center board-team-wrap">
                        <div className="col-md-8 col-sm-12">
                          <BoardList toggleType={toggleType} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Add New Task --> */}
              <div
                id="add_new_board"
                className="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-body">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                      <h5>Add New Board</h5>
                      <p className="mb-4">
                        You are granted limited license only for purposes of
                        viewing the material contained on this Website.
                      </p>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Name</label>
                              <input
                                className="form-control task-name"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Visibility</label>
                              <select className="form-control form-select">
                                <option selected="">Public</option>
                                <option value="1">Private</option>
                              </select>
                              <small className="form-text text-muted">
                                Public setting will be seen by everybody with
                                login details.
                              </small>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Avatar</label>
                              <select className="form-control form-select">
                                <option selected="">Choose Avatar-Text</option>
                                <option value="1">A</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Avatar Color</label>
                              <div className="input-group color-picker">
                                <div className="input-group-text colorpicker-input-addon">
                                  <input type="color" />
                                </div>
                                <input
                                  type="text"
                                  className="form-control colorpicker-value"
                                  value="#009B84"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <div className="dropify-square">
                                <input type="file" className="dropify-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="button" className="btn btn-primary">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add New Task --> */}

              {/* <!-- Add New Member --> */}
              <div
                id="add_new_team"
                className="modal fade"
                tabindex="-1"
                role="dialog"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-body">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                      <h5 className="mb-4">Add New Member</h5>
                      <form>
                        <div className="row gx-3">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Name</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label className="form-label">Email Id</label>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                          <div className="col-sm-12">
                            <div className="form-group">
                              <div className="dropify-square">
                                <input type="file" className="dropify-1" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer align-items-center">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button type="button" className="btn btn-primary">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add New Member -->  */}

              {/* <!-- Add Fav Board --> */}
              <div
                className="modal fade"
                id="add_fav_board"
                tabindex="-1"
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-centered mw-400p"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header header-wth-bg-inv">
                      <h5 className="modal-title">Add Board</h5>
                      <button
                        type="button"
                        className="btn-close text-white"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body p-0">
                      <div>
                        <div data-simplebar className="nicescroll-bar h-350p">
                          <ul className="p-3 pb-0">
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                    <span className="initial-wrap">J</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Jampack</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck2"
                                  checked
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-danger avatar-rounded">
                                    <span className="initial-wrap">H</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Hencework</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck3"
                                  checked
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-info avatar-rounded">
                                    <span className="initial-wrap">G</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Griffin</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck4"
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-warning avatar-rounded">
                                    <span className="initial-wrap">R</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">React - Jampack</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck5"
                                  checked
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                    <span className="initial-wrap">P</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Pangong</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck6"
                                  checked
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-success avatar-rounded">
                                    <span className="initial-wrap">A</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Angular - Jampack</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck7"
                                  checked
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-warning avatar-rounded">
                                    <span className="initial-wrap">R</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">React - Jampack</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck8"
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-primary avatar-rounded">
                                    <span className="initial-wrap">P</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Pangong</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck9"
                                />
                              </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between mb-3">
                              <div className="media d-flex align-items-center">
                                <div className="media-head me-2">
                                  <div className="avatar avatar-xs avatar-success avatar-rounded">
                                    <span className="initial-wrap">A</span>
                                  </div>
                                </div>
                                <div className="media-body">
                                  <div className="name">Angular - Jampack</div>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheck10"
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer justify-content-center">
                      <button
                        type="button"
                        className="btn flex-fill btn-light flex-1"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn flex-fill btn-primary flex-1"
                        data-bs-dismiss="modal"
                      >
                        Add Board
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- /Add Fav Board --> */}
            </div>
          </div>
        </div>
        {/* <!-- /Page Body --> */}
      </div>
      {/* <!-- /Main Content --> */}
    </div>
  );
};

export default BoardContent;
