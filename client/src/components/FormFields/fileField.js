import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const FileField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [fileName, setFileName] = useState("");
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
    multiple,
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
          defaultValue={defaultValue !== "" ? defaultValue : ""}
          render={({ field }) => (
            <div className="">
              <label
                for={props?.name}
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                {label}
              </label>

              <input
                {...props}
                {...field}
                ref={ref}
                type={props?.type ? props?.type : ""}
                onBlurCapture={() => setFocusState(false)}
                onFocus={() => setFocusState(true)}
                onChange={(e) => {
                  setFileName(e.target.value);
                  let file = multiple
                    ? e.currentTarget.files
                    : e.currentTarget.files[0];
                  field.onChange(file);
                  if (props.onChange) {
                    props.onChange(e.currentTarget.files, props?.name);
                  }
                }}
                min={type === "number" && !props.min ? 0 : props.min}
                disabled={props.isDisabled}
                placeholder={props.placeholder ? props.placeholder : ""}
                value={fileName}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  props.isDisabled && "bg-gray-50 cursor-not-allowed"
                }  ${isHighLight && " bg-highLight  "}  `}
                multiple
                {...others}
              />
            </div>
          )}
        />
        <div
          className={`pointer-events-none absolute ml-2 left-0 duration-300 origin-0 mr-2 inline-block px-1 font-normal  ${
            props?.rules && err ? "text-red-600" : "text-gray-600"
          }  ${
            focusState || !field.value == "" || field.value == "0"
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
        <p className=" text-xs text-red-600 h-3 bg-inherit" id="email-error">
          {props.rules && err && props.rules && err?.message}
        </p>
      )}
      {/*  */}
    </div>
  );
});

FileField.displayName = "FileField";

FileField.propTypes = {
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
export default FileField;
