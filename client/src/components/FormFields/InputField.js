import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const InputField = React.forwardRef((props, ref) => {
  const {
    field,
    // fieldState
  } = useController(props);
  const [focusState, setFocusState] = useState(false);
  const {
    title,
    style,
    isHighLight = false,
    type,
    errors,
    defaultValue,
    customStyle,
    onChange,
    ellipses,
    label,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  return (
    <div className="w-full mb-5">
      <div
        className={`${style ? "bg-white" : ""}  ${
          props?.rules && err
            ? "focus-within:border-red-600 border-red-600"
            : "focus-within:border-teal-c-900"
        }`}
      >
        <Controller
          name={props?.name}
          control={props?.control}
          rules={props?.rules}
          className="form-group"
          defaultValue={defaultValue !== "" ? defaultValue : ""}
          render={({ field }) => {
            return (
              <div className="">
                <label class="form-label-group">{label}</label>

                <input
                  {...props}
                  {...field}
                  ref={ref}
                  type={props?.type ? props?.type : ""}
                  onBlurCapture={() => setFocusState(false)}
                  onFocus={() => setFocusState(true)}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    if (props.onChange) {
                      props.onChange(e, props?.name);
                    }
                  }}
                  min={type === "number" && !props.min ? 0 : props.min}
                  disabled={props.isDisabled}
                  placeholder={props.placeholder ? props.placeholder : ""}
                  value={field.value}
                  className="form-control"
                  {...others}
                />
              </div>
            );
          }}
        />
        <div
          className={`pointer-events-none absolute ml-2 left-0 duration-300 origin-0 mr-2 inline-block px-1 font-normal  ${
            props?.rules && err ? "text-red-600" : "text-gray-600"
          }  ${
            focusState || !field.value === "" || field.value === "0"
              ? "-top-2 duration-300 bg-[white] text-xs rounded-lg"
              : `top-2 duration-300 text-base xl:top-1 ${
                  ellipses &&
                  "w-[98%] text-ellipsis overflow-hidden whitespace-nowrap"
                }`
          } 
            ${isHighLight && " bg-highLight  "}  
            `}
        >
          {/* {title} {props?.rules?.required?.value === true && <span className="text-red-500 mt-10">*</span>} */}
        </div>
      </div>
      {props.rules && err && (
        <p className="text-xs p-1 text-danger" id="email-error">
          {props.rules && err && props.rules && err?.message}
        </p>
      )}
      {/*  */}
    </div>
  );
});

InputField.displayName = "InputField";

InputField.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  isHighLight: PropTypes.bool,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  customStyle: PropTypes.object,
  onChange: PropTypes.func,
  ellipses: PropTypes.bool,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  min: PropTypes.number, // Added 'min' prop type validation
  isDisabled: PropTypes.bool, // Added 'isDisabled' prop type validation
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default InputField;
