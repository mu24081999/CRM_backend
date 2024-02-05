import React from "react";
import { useController, Controller } from "react-hook-form";
import PropTypes from "prop-types";

const Checkbox = React.forwardRef((props, ref) => {
  const {
    field,
    // fieldState
  } = useController(props);
  const {
    label,
    style,
    // type,
    // errors,
    defaultValue,
    // labelClass,
    disabled,
    // ...others
  } = props;
  // let err = _.get(errors, props.name);

  return (
    <>
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div className=" form-check form-check-sm mb-3 p-0">
            <label className="form-check-lable">{label}</label>

            <input
              {...field}
              ref={ref}
              checked={
                field.value === "1" || field.value === true ? true : false
              }
              type="checkbox"
              disabled={disabled}
              onChange={(e) => {
                onChange(e.target.checked);
                if (props.onChange) {
                  props.onChange(e);
                }
              }}
              style={style ? style : {}}
              className={`form-check-input`}
            />
          </div>
        )}
      />
    </>
  );
});

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
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
  labelClass: PropTypes.string,
  disabled: PropTypes.bool, // Added 'isDisabled' prop type validation

  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default Checkbox;
