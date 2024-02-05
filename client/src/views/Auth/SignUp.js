import React, { useEffect } from "react";
import brand from "../../assets/dist/img/logo-light.png";
import InputField from "../../components/FormFields/InputField";
import { useForm } from "react-hook-form";
import Checkbox from "../../components/FormFields/checkboxField";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/services/auth";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const { isAuthenticated } = useSelector((state) => state.auth);
  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  const handleSingUp = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    switch (isAuthenticated) {
      case true:
        return redirectTo("/dashboard");
      default:
        break;
    }
  }, [redirectTo, isAuthenticated]);
  return (
    <div>
      {/* <!-- Wrapper --> */}
      <div class="hk-wrapper hk-pg-auth" data-footer="simple">
        {/* <!-- Main Content --> */}
        <div class="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
          <div class="hk-pg-body pt-0 pb-xl-0">
            {/* <!-- Container --> */}
            <div class="container-xxl">
              {/* <!-- Row --> */}
              <div class="row">
                <div class="col-sm-10 position-relative mx-auto">
                  <div class="auth-content py-8">
                    <form class="w-100" onSubmit={handleSubmit(handleSingUp)}>
                      <div class="row">
                        <div class="col-xxl-5 col-xl-7 col-lg-8 col-sm-10 mx-auto">
                          <div class="text-center mb-7">
                            <a class="navbar-brand me-0" href="index.html">
                              <img
                                class="brand-img d-inline-block"
                                src={brand}
                                alt="brand"
                              />
                            </a>
                          </div>
                          <div class="card card-border">
                            <div class="card-body">
                              <h4 class="text-center mb-0">
                                Sign Up to Jampack
                              </h4>
                              <p class="p-xs mt-2 mb-4 text-center">
                                Already a member ?{" "}
                                <a href="/">
                                  <u>Sign In</u>
                                </a>
                              </p>
                              <button class="btn btn-outline-dark btn-rounded btn-block mb-3">
                                <span>
                                  <span class="icon">
                                    <i class="fab fa-google"></i>
                                  </span>
                                  <span>Sign Up with Gmail</span>
                                </span>
                              </button>
                              <button class="btn btn-social btn-social-facebook btn-rounded btn-block">
                                <span>
                                  <span class="icon">
                                    <i class="fab fa-facebook"></i>
                                  </span>
                                  <span>Sign Up with Facebook</span>
                                </span>
                              </button>
                              <div class="title-sm title-wth-divider divider-center my-4">
                                <span>Or</span>
                              </div>
                              <div class="row gx-3">
                                <div className="col-lg-6">
                                  <InputField
                                    name="name"
                                    placeholder="Enter your name"
                                    label="Name"
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
                                <div className="col-lg-6">
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
                                <div className="col-lg-12">
                                  <InputField
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email id"
                                    label="Email"
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
                                <div className="col-lg-12">
                                  <InputField
                                    name="password"
                                    type="password"
                                    placeholder="6+ characters"
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
                                {/* <div class="form-group col-lg-12">
                                  <label class="form-label">Password</label>
                                  <div class="input-group password-check">
                                    <span class="input-affix-wrapper affix-wth-text">
                                      <input
                                        class="form-control"
                                        placeholder="6+ characters"
                                        value=""
                                        type="password"
                                      />
                                      <a
                                        href="/"
                                        class="input-suffix text-primary text-uppercase fs-8 fw-medium"
                                      >
                                        <span>Show</span>
                                        <span class="d-none">Hide</span>
                                      </a>
                                    </span>
                                  </div>
                                </div> */}
                              </div>
                              <div class="form-check form-check-sm mb-3 d-flex">
                                {/* <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="logged_in"
                                  checked
                                /> */}
                                <Checkbox
                                  name=""
                                  control={control}
                                  errors={errors}
                                />
                                <label
                                  class="form-check-label text-muted fs-8"
                                  for="logged_in"
                                >
                                  By creating an account you specify that you
                                  have read and agree with our{" "}
                                  <a href="/">Tearms of use</a> and{" "}
                                  <a href="/">Privacy policy</a>. We may keep
                                  you inform about latest updates through our
                                  default <a href="/">notification settings</a>
                                </label>
                              </div>
                              <button
                                type="submit"
                                class="btn btn-primary btn-rounded btn-uppercase btn-block"
                              >
                                Create account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <!-- /Row --> */}
            </div>
            {/* <!-- /Container --> */}
          </div>
          {/* <!-- /Page Body --> */}

          {/* <!-- Page Footer --> */}
          <div class="hk-footer border-0">
            <footer class="container-xxl footer">
              <div class="row">
                <div class="col-xl-8 text-center">
                  <p class="footer-text pb-0">
                    <span class="copy-text">
                      Jampack © 2023 All rights reserved.
                    </span>{" "}
                    <a href="/" class="" target="_blank">
                      Privacy Policy
                    </a>
                    <span class="footer-link-sep">|</span>
                    <a href="/" class="" target="_blank">
                      T&C
                    </a>
                    <span class="footer-link-sep">|</span>
                    <a href="/" class="" target="_blank">
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

export default SignUp;
