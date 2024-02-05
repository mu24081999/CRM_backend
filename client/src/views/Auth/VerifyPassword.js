import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import brand from "../../assets/dist/img/logo-light.png";
import InputField from "../../components/FormFields/InputField";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../../redux/services/auth";
const VerifyPassword = () => {
  const {
    handleSubmit,
    // watch,
    control,
    // setValue,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();
  const { email } = useParams();

  const otpVerificationHandler = (data) => {
    const formData = {
      email: email,
      otp: data?.otp,
    };
    return dispatch(verifyOTP(formData));
  };
  return (
    <div>
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
                      <form
                        class="w-100"
                        onSubmit={handleSubmit(otpVerificationHandler)}
                      >
                        <div class="row">
                          <div class="col-lg-5 col-md-7 col-sm-10 mx-auto">
                            <div class="text-center mb-7">
                              <a class="navbar-brand me-0" href="index.html">
                                <img
                                  class="brand-img d-inline-block"
                                  src={brand}
                                  alt="brand"
                                />
                              </a>
                            </div>
                            <div class="card card-flush">
                              <div class="card-body text-center">
                                <h4>Reset your Password</h4>
                                <p class="mb-4">
                                  No worries we will mail you 6 digit code to
                                  your recovery email address to reset your
                                  password
                                </p>
                                {/* <div class="row gx-3">
                                <div class="form-group col-lg-12">
                                  <div class="form-label-group">
                                    <label for="userName">Email</label>
                                    <a href="/" class="fs-7 fw-medium">
                                      Forgot Username ?
                                    </a>
                                  </div>
                                  <input
                                    class="form-control"
                                    placeholder="Recovery email ID"
                                    value=""
                                    type="email"
                                  />
                                </div>
                              </div> */}
                                <div>
                                  <a href="/" class="fs-7 fw-medium float-end">
                                    Forgot Username ?
                                  </a>
                                  <div>
                                    <InputField
                                      name="otp"
                                      placeholder="6 digits otp"
                                      label="OTP"
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
                                </div>
                                <button
                                  type="submit"
                                  class="btn btn-primary btn-uppercase btn-block"
                                >
                                  Verify
                                </button>
                                <p class="p-xs mt-2 text-center">
                                  Did not receive code?{" "}
                                  <a href="/">
                                    <u>Send again</u>
                                  </a>
                                </p>
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
    </div>
  );
};

export default VerifyPassword;
