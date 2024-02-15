import React from "react";

const EmailDetails = () => {
  return (
    <div class="email-body">
      <div data-simplebar class="nicescroll-bar">
        <div class="single-email-subject">
          <div>
            <h4 class="fw-light">Update available for your purchased item.</h4>
            <span class="badge badge-orange badge-sm badge-pill flex-shrink-0 ms-3">
              updates
            </span>
          </div>
          <div class="email-options-wrap">
            <a
              class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Print"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="printer"></i>
                </span>
              </span>
            </a>
            <a
              class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Reply"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="corner-up-left"></i>
                </span>
              </span>
            </a>
            <a
              class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover"
              href="/"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title=""
              data-bs-original-title="Forward"
            >
              <span class="icon">
                <span class="feather-icon">
                  <i data-feather="arrow-right"></i>
                </span>
              </span>
            </a>
          </div>
        </div>
        <div
          id="accordionSimpleExample"
          class="accordion accordion-simple single-email-thread"
        >
          <div class="accordion-item">
            <div id="simple-headingOne" class="accordion-header">
              <div>
                <div class="email-head">
                  <div
                    data-bs-toggle="collapse"
                    data-bs-target="#simple-collapseOne"
                    role="button"
                    aria-expanded="false"
                  ></div>
                  <div class="media">
                    <div class="media-head">
                      <div class="avatar d-8">
                        <img
                          src="dist/img/avatar2.jpg"
                          alt="user"
                          class="avatar-img rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <div>Morgan Freeman</div>
                      <div class="fs-7">
                        <span>to</span>
                        <div class="mail-desc-dropdown">
                          <a
                            href="/"
                            class="dropdown-toggle link-dark"
                            data-bs-toggle="dropdown"
                          >
                            me
                          </a>
                          <div class="dropdown-menu">
                            <div>
                              <span>from :</span>
                              <span>
                                Morgan{" "}
                                <span>&lt;morganfreeman@jampack.com&gt;</span>
                              </span>
                            </div>
                            <div>
                              <span>to :</span>
                              <span>
                                Hencework{" "}
                                <span>&lt;contact@hencework.com&gt;</span>
                              </span>
                            </div>
                            <div>
                              <span>date :</span>
                              <span>Dec 30, 4:22 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="email-head-action">
                    <div class="email-time">Dec 30, 4:22 PM</div>
                    <span class="email-star marked">
                      <span class="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm"
                      href="/"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="corner-up-left"></i>
                        </span>
                      </span>
                    </a>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm dropdown-toggle no-caret"
                      href="/"
                      data-bs-toggle="dropdown"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="more-vertical"></i>
                        </span>
                      </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="/">
                        Forward
                      </a>
                      <a class="dropdown-item" href="/">
                        Delete
                      </a>
                      <a class="dropdown-item" href="/">
                        Report Spam
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="simple-collapseOne" class="accordion-collapse collapse">
              <div class="accordion-body">
                <p>Hi Hencework,</p>
                <p>
                  We'd like to let you know that an update to your item Jampack
                  - Admin Template by hencework is now available in your
                  Downloads page.
                </p>
                <p>
                  Remember: you need to be logged in to download the update.
                </p>
                <p class="mt-3 mb-4">
                  You may manage notifications for your items from{" "}
                  <a href="/">
                    <u>your downloads.</u>
                  </a>
                </p>
                <p>
                  Regards,
                  <br />
                  Envato Team
                </p>
                <img
                  class="d-block mt-2 mb-3"
                  src="dist/img/signature-1.png"
                  alt="signature"
                />
                <div class="separator separator-light"></div>
                <div class="text-end">
                  <a href="/" class="link-theme fs-7">
                    <u>Download All</u>
                  </a>
                </div>
                <div class="email-attachment-wrap">
                  <div class="attachment-box">
                    <div>
                      <div class="media">
                        <div class="avatar avatar-icon avatar-sm avatar-blue">
                          <span class="initial-wrap fs-3">
                            <i class="ri-file-excel-2-fill"></i>
                          </span>
                        </div>
                        <div class="media-body">
                          <p class="file-name">Website_content.xls</p>
                          <p class="file-size">2,635 KB</p>
                        </div>
                      </div>
                      <div class="file-overlay">
                        <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                          <span class="icon">
                            <i data-feather="arrow-down"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="attachment-box">
                    <div>
                      <div class="media">
                        <div class="avatar avatar-icon avatar-sm avatar-warning">
                          <span class="initial-wrap fs-3">
                            <i class="ri-file-zip-fill"></i>
                          </span>
                        </div>
                        <div class="media-body">
                          <p class="file-name">themeforest-pack.zip</p>
                          <p class="file-size">2.45 GB</p>
                        </div>
                      </div>
                      <div class="file-overlay">
                        <button class="btn btn-sm btn-icon btn-rounded btn-primary">
                          <span class="icon">
                            <i data-feather="arrow-down"></i>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div id="simple-headingTwo" class="accordion-header">
              <div>
                <div class="email-head">
                  <div
                    data-bs-toggle="collapse"
                    data-bs-target="#simple-collapseTwo"
                    role="button"
                    aria-expanded="true"
                  ></div>
                  <div class="media">
                    <div class="media-head">
                      <div class="avatar d-8">
                        <img
                          src="dist/img/avatar2.jpg"
                          alt="user"
                          class="avatar-img rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <div>Morgan Freeman</div>
                      <div class="fs-7">
                        <span>to</span>
                        <div class="mail-desc-dropdown">
                          <a
                            href="/"
                            class="dropdown-toggle link-dark"
                            data-bs-toggle="dropdown"
                          >
                            me
                          </a>
                          <div class="dropdown-menu">
                            <div>
                              <span>from :</span>
                              <span>
                                Morgan{" "}
                                <span>&lt;morganfreeman@jampack.com&gt;</span>
                              </span>
                            </div>
                            <div>
                              <span>to :</span>
                              <span>
                                Hencework{" "}
                                <span>&lt;contact@hencework.com&gt;</span>
                              </span>
                            </div>
                            <div>
                              <span>date :</span>
                              <span>Jan 1, 9:30 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="email-head-action">
                    <div class="email-time">Jan 1, 9:30 AM</div>
                    <span class="email-star marked">
                      <span class="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm"
                      href="/"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="corner-up-left"></i>
                        </span>
                      </span>
                    </a>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm dropdown-toggle no-caret"
                      href="/"
                      data-bs-toggle="dropdown"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="more-vertical"></i>
                        </span>
                      </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="/">
                        Forward
                      </a>
                      <a class="dropdown-item" href="/">
                        Delete
                      </a>
                      <a class="dropdown-item" href="/">
                        Report Spam
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="simple-collapseTwo" class="collapse show">
              <div class="accordion-body">
                <p>
                  Hello I have purchased the admin template, Please help me to
                  install and host it. I want the site to function properly.
                  Remember: you need to be logged in to download the update.
                </p>
                <p class="mb-4">
                  Remember: you need to be logged in to download the update.
                </p>
                <p>
                  Regards,
                  <br />
                  Envato Team
                </p>
                <img
                  class="d-block mt-2 mb-3"
                  src="dist/img/signature-1.png"
                  alt="signature"
                />
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div id="simple-headingThree" class="accordion-header">
              <div>
                <div class="email-head">
                  <div
                    data-bs-toggle="collapse"
                    data-bs-target="#simple-collapseThree"
                    role="button"
                    aria-expanded="true"
                  ></div>
                  <div class="media">
                    <div class="media-head">
                      <div class="avatar d-8">
                        <img
                          src="dist/img/avatar10.jpg"
                          alt="user"
                          class="avatar-img rounded-circle"
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <div>Admin</div>
                      <div class="fs-7">
                        <span>to</span>
                        <div class="mail-desc-dropdown">
                          <a
                            href="/"
                            class="dropdown-toggle link-dark"
                            data-bs-toggle="dropdown"
                          >
                            Morgan
                          </a>
                          <div class="dropdown-menu">
                            <div>
                              <span>from :</span>
                              <span>
                                Admin <span>&lt;admin@jampack.com&gt;</span>
                              </span>
                            </div>
                            <div>
                              <span>to :</span>
                              <span>
                                Morgan{" "}
                                <span>&lt;morganfreeman@jampack.com&gt;</span>
                              </span>
                            </div>
                            <div>
                              <span>date :</span>
                              <span>Jan 2, 10:21 AM</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="email-head-action">
                    <div class="email-time">Jan 2, 10:21 AM</div>
                    <span class="email-star">
                      <span class="feather-icon">
                        <i data-feather="star"></i>
                      </span>
                    </span>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm"
                      href="/"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="corner-up-left"></i>
                        </span>
                      </span>
                    </a>
                    <a
                      class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover btn-sm dropdown-toggle no-caret"
                      href="/"
                      data-bs-toggle="dropdown"
                    >
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="more-vertical"></i>
                        </span>
                      </span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                      <a class="dropdown-item" href="/">
                        Forward
                      </a>
                      <a class="dropdown-item" href="/">
                        Delete
                      </a>
                      <a class="dropdown-item" href="/">
                        Report Spam
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="simple-collapseThree" class="collapse show">
              <div class="accordion-body">
                <p>Hello,</p>
                <p>
                  Could you please specify the pages, where you are getting the
                  error?
                </p>
                <div class="my-5">
                  <button
                    class="btn btn-outline-light me-2"
                    data-bs-toggle="collapse"
                    data-bs-target="#compose_email"
                    aria-expanded="false"
                  >
                    <span>
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="corner-up-left"></i>
                        </span>
                      </span>
                      <span>Reply</span>
                    </span>
                  </button>
                  <button
                    class="btn btn-outline-light"
                    data-bs-toggle="collapse"
                    data-bs-target="#compose_email"
                    aria-expanded="false"
                  >
                    <span>
                      <span class="icon">
                        <span class="feather-icon">
                          <i data-feather="arrow-right"></i>
                        </span>
                      </span>
                      <span>Forward</span>
                    </span>
                  </button>
                </div>
                {/* <!-- Compose email --> */}
                <div id="compose_email" class="collapse mt-7">
                  <div class="d-flex">
                    <div class="media">
                      <div class="media-head me-3">
                        <div class="avatar avatar-icon avatar-soft-light avatar-rounded d-8">
                          <span class="initial-wrap">
                            <i class="ri-user-fill"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                    <form class="card card-shadow w-100">
                      <div class="card-body">
                        <div class="form-group">
                          <div class="d-flex flex-wrap">
                            <div class="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                              <span>
                                <span class="avatar">
                                  <img
                                    src="dist/img/avatar11.jpg"
                                    alt="user"
                                    class="avatar-img"
                                  />
                                </span>
                                <span class="chip-text">Morgan</span>
                                <button
                                  type="button"
                                  class="btn-close"
                                ></button>
                              </span>
                            </div>
                            <div class="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                              <span>
                                <span class="avatar">
                                  <img
                                    src="dist/img/avatar12.jpg"
                                    alt="user"
                                    class="avatar-img"
                                  />
                                </span>
                                <span class="chip-text">Charliee</span>
                                <button
                                  type="button"
                                  class="btn-close"
                                ></button>
                              </span>
                            </div>
                            <div class="chip chip-primary chip-dismissable user-chip mb-2 me-2">
                              <span>
                                <span class="avatar">
                                  <img
                                    src="dist/img/avatar13.jpg"
                                    alt="user"
                                    class="avatar-img"
                                  />
                                </span>
                                <span class="chip-text">Winston</span>
                                <button
                                  type="button"
                                  class="btn-close"
                                ></button>
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control border-0 p-0 shadow-none flex-1 mb-2 me-2"
                              placeholder="Add recipients"
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            rows="8"
                            placeholder="Enter details"
                          ></textarea>
                        </div>
                        <div class="form-group d-flex justify-content-between mb-0">
                          <div>
                            <button class="btn btn-primary me-2" type="submit">
                              Send
                            </button>
                            <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                              <span
                                class="icon"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Add flag"
                                data-bs-original-title="Add flag"
                              >
                                <span class="feather-icon">
                                  <i data-feather="paperclip"></i>
                                </span>
                              </span>
                            </button>
                          </div>
                          <div>
                            <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                              <span
                                class="icon"
                                data-bs-toggle="Save Draft"
                                data-bs-placement="top"
                                title="Save Draft"
                                data-bs-original-title="Save Draft"
                              >
                                <span class="feather-icon">
                                  <i data-feather="edit"></i>
                                </span>
                              </span>
                            </button>
                            <button class="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover">
                              <span
                                class="icon"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Delete"
                                data-bs-original-title="Delete"
                              >
                                <span class="feather-icon">
                                  <i data-feather="trash-2"></i>
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- /Compose email --> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetails;
