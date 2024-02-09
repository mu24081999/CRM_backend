import React, { useEffect } from "react";
import brand from "../../assets/dist/img/logo-light.png";
// import FormRender from "../../components/FormRender";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/FormFields/checkboxField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const redirectTo = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    if (isAuthenticated) {
      redirectTo("/");
    }
  }, [isAuthenticated, redirectTo]);
  const signInHandler = (data) => {
    console.log("🚀 ~ signInHandler ~ data:", data);
    dispatch(loginUser(data?.username, data?.password));
  };
  // const formConfig = [
  //   { name: "firstName", label: "First Name", initialValue: "" },
  //   { name: "lastName", label: "Last Name", initialValue: "" },
  //   { name: "email", label: "Email", type: "email", initialValue: "" },
  // ];

  return (
    <div>
      {/* <!-- Wrapper --> */}
      <div className="hk-wrapper hk-pg-auth" data-footer="simple">
        {/* <!-- Main Content --> */}
        <div className="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
          <div className="hk-pg-body pt-0 pb-xl-0">
            {/* <!-- Container --> */}
            <div className="container-xxl">
              {/* <!-- Row --> */}
              <div className="row">
                <div className="col-sm-10 position-relative mx-auto">
                  <div className="auth-content py-8">
                    <form
                      className="w-100"
                      onSubmit={handleSubmit(signInHandler)}
                    >
                      <div className="row">
                        <div className="col-lg-5 col-md-7 col-sm-10 mx-auto">
                          <div className="text-center mb-7">
                            <a className="navbar-brand me-0" href="index.html">
                              <img
                                className="brand-img d-inline-block"
                                src={brand}
                                alt="brand"
                              />
                            </a>
                          </div>
                          <div className="card card-lg card-border">
                            <div className="card-body">
                              <h4 className="mb-4 text-center">
                                Sign in to your account
                              </h4>
                              <div className="row gx-3">
                                {/* <div className="form-group col-lg-12">
                                  <div className="form-label-group">
                                    <label>User Name</label>
                                  </div>
                                  <input
                                    className="form-control"
                                    placeholder="Enter username or email ID"
                                    value=""
                                    type="text"
                                  />
                                </div> */}
                                <div>
                                  <InputField
                                    name="username"
                                    placeholder="Enter username or email"
                                    label="User Name"
                                    control={control}
                                    rules={{
                                      required: {
                                        value: true,
                                        message: "Field required!",
                                      },
                                    }}
                                    errors={errors}
                                  />
                                </div>
                                <div className="">
                                  <div className="float-end">
                                    <a
                                      href="/reset-password"
                                      className="fs-7 fw-medium"
                                    >
                                      Forgot Password ?
                                    </a>
                                  </div>
                                  <InputField
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    label="Password"
                                    control={control}
                                    rules={{
                                      required: {
                                        value: true,
                                        message: "Field required!",
                                      },
                                    }}
                                    errors={errors}
                                  />
                                </div>
                                {/* <div className="form-group col-lg-12">
                                  <div className="form-label-group">
                                    <label>Password</label>
                                    <a href="/" className="fs-7 fw-medium">
                                      Forgot Password ?
                                    </a>
                                  </div>
                                  <div className="input-group password-check">
                                    <span className="input-affix-wrapper">
                                      <input
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value=""
                                        type="password"
                                      />

                                      <a
                                        href="/"
                                        className="input-suffix text-muted"
                                      >
                                        <span className="feather-icon">
                                          <i
                                            className="form-icon"
                                            data-feather="eye"
                                          ></i>
                                        </span>
                                        <span className="feather-icon d-none">
                                          <i
                                            className="form-icon"
                                            data-feather="eye-off"
                                          ></i>
                                        </span>
                                      </a>
                                    </span>
                                  </div>
                                </div> */}
                              </div>
                              <div className="d-flex justify-content-center">
                                {/* <div className="form-check form-check-sm mb-3">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="logged_in"
                                    checked
                                  />
                                  <label
                                    className="form-check-label text-muted fs-7"
                                    for="logged_in"
                                  >
                                    Keep me logged in
                                  </label>
                                </div> */}
                                <Checkbox
                                  name="keep_logged_in"
                                  label="Keep me logged in"
                                  control={control}
                                  errors={errors}
                                />
                              </div>
                              <input
                                type="submit"
                                className="btn btn-primary btn-uppercase btn-block bg-primary"
                                value="Login"
                              />

                              <p className="p-xs mt-2 text-center">
                                New to Jampack?{" "}
                                <a href="/">
                                  <u>Create new account</u>
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    {/* <FormRender formConfig={formConfig} /> */}
                  </div>
                </div>
              </div>
              {/* <!-- /Row --> */}
            </div>
            {/* <!-- /Container --> */}
          </div>
          {/* <!-- /Page Body --> */}

          {/* <!-- Page Footer --> */}
          <div className="hk-footer border-0">
            <footer className="container-xxl footer">
              <div className="row">
                <div className="col-xl-8 text-center">
                  <p className="footer-text pb-0">
                    <span className="copy-text">
                      Jampack © 2023 All rights reserved.
                    </span>{" "}
                    <a href="/" className="" target="_blank">
                      Privacy Policy
                    </a>
                    <span className="footer-link-sep">|</span>
                    <a href="/" className="" target="_blank">
                      T&C
                    </a>
                    <span className="footer-link-sep">|</span>
                    <a href="/" className="" target="_blank">
                      System Status
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          </div>
          {/* <!-- / Page Footer --> */}
        </div>
        {/* <!-- /Main Content --> */}
      </div>
      {/* <!-- /Wrapper --> */}
    </div>
  );
};

export default SignIn;
