// DynamicForm.js
import React from "react";
import { useFormik } from "formik";
import InputField from "../FormFields/InputField";

const DynamicForm = ({ formConfig, control, errors }) => {
  const formik = useFormik({
    initialValues: formConfig.reduce((acc, field) => {
      acc[field.name] = field.initialValue || "";
      return acc;
    }, {}),
    onSubmit: (values) => {
      // Handle form submission
      console.log("Form Values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formConfig.map((field) => (
        <div key={field.name}>
          {/* <label htmlFor={field.name}>{field.label}</label>
          <input
            type={field.type || "text"}
            id={field.name}
            name={field.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.name]}
          /> */}
          <InputField
            name="name"
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
          {formik.touched[field.name] && formik.errors[field.name] && (
            <div style={{ color: "red" }}>{formik.errors[field.name]}</div>
          )}
        </div>
      ))}
      <button className="btn btn-primary btn-uppercase btn-block" type="submit">
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
