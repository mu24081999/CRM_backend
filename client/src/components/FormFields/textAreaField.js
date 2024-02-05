import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import PropTypes from "prop-types";

export const TextAreaField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const [focusState, setFocusState] = useState(false);
  const {
    title,
    isHighLight = false,
    style,
    type,
    errors,
    defaultValue,
    disabled = false,
    showTextLimit,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  return (
    <div className="mb-5">
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <textarea
            {...field}
            onChange={(e) => {
              field.onChange(e);
              if (props.onChange) {
                props.onChange(e);
              }
            }}
            style={{ borderRadius: "16px !important" }}
            disabled={disabled}
            onBlurCapture={() => setFocusState(false)}
            onFocus={() => setFocusState(true)}
            rows={props.rows || 2}
            value={field.value}
            placeholder={props.placeholder ? props.placeholder : ""}
            className={`w-full flex p-[0.8rem] border border-paragraph rounded-[16px] focus:outline-none bg-white text-base font-light text-black-300 ${
              disabled && "bg-gray-100"
            }                     ${
              isHighLight && " bg-highLight  "
            }                            `}
          />
        )}
      />

      {props.rules && err && (
        <p className="mt-0.5 text-xs text-red-600 h-3" id="email-error">
          {props.rules && err && props.rules && err.message}
        </p>
      )}
    </div>
  );
});

TextAreaField.displayName = "TextAreaField";
TextAreaField.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  isHighLight: PropTypes.bool,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  disabled: PropTypes.bool, // Added 'isDisabled' prop type validation
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
  showTextLimit: PropTypes.bool,
  onChange: PropTypes.func,
  rows: PropTypes.number,
};
export default TextAreaField;
