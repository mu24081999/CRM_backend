import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const ReactSelectField = React.forwardRef((props, ref) => {
  const [focusState, setFocusState] = useState(false);
  const [inputValue, setInputValue] = useState();
  const {
    title,
    style,
    label,
    type,
    errors,
    defaultValue,
    onChange,
    isMulti = false,
    onFocus,
    onBlur,
    capitalize = true,
    menuPlacement,
    isHighLight = false,
    ellipses,
    ...others
  } = props;
  const { field, fieldState, formState } = useController(props);

  let err = _.get(errors, props.name);
  const handleInputChange = (e) => {
    if (props.onInputChange) {
      props.onInputChange(e);
    }
    setInputValue(e);
    if (props.handleSelectOption) {
      props.handleSelectOption(e);
    }
  };
  const customStyles = {
    control: (base, state) => ({
      ...base,
      maxHeight: "100%",
      boxShadow: "none",
      cursor: props.isDisabled ? "not-allowed" : "default",

      border: props.rules && err ? "1px solid #DC2626" : "1px solid #C6C4C4",
      backgroundColor: props?.backgroundColor
        ? props?.backgroundColor
        : "#ffffff",
      borderTopLeftRadius: props?.borderTopLeftRadius
        ? props?.borderTopLeftRadius
        : "",
      borderBottomLeftRadius: props?.borderBottomLeftRadius
        ? props?.borderBottomLeftRadius
        : "",
      borderTopRightRadius: props?.borderTopRightRadius
        ? props?.borderTopRightRadius
        : "",
      borderBottomRightRadius: props?.borderBottomRightRadius
        ? props?.borderBottomRightRadius
        : "",
      padding: props?.padding ? props?.padding : "0.13rem",
    }),
    menu: (provided, state) => ({
      ...provided,
      zIndex: 50,
      color: "black",
    }),
  };
  const getOptionLabel = (e) => {
    if (props.getOptionLabel) {
      return props.getOptionLabel(e);
    } else {
      return e[props.showLabel || "label"];
    }
  };

  const onCrossHandler = (event) => {
    // console.log(
    //   "🚀 ~ file: ReactSelectField.js:47 ~ onCrossHandler ~ event",
    //   event
    // );
  };

  return (
    <div className="mb-5">
      <Controller
        name={props?.name}
        rules={props?.rules}
        control={props?.control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <>
            {label && (
              <label
                for={props?.name}
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                {label}
              </label>
            )}
            <Select
              {...field}
              {...others}
              ref={ref || field.ref}
              components={
                props?.CustomOption && { Option: props?.CustomOption }
              }
              isLoading={props.isLoading || false}
              noOptionsMessage={() => null}
              getOptionLabel={getOptionLabel}
              styles={customStyles}
              isSearchable={true}
              options={props?.optionData}
              placeholder={props?.placeHolder ? props?.placeHolder : ""}
              menuPlacement={menuPlacement || "auto"}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                capitalize && "capitalize"
              }`}
              isClearable={true}
              defaultOptions
              onChange={(val, action) => {
                onChange(val);
                if (props.onChange) {
                  props.onChange(val, action);
                }
              }}
              value={field.value}
              menuIsOpen={props.menuIsOpen || undefined}
              onFocus={(e) => {
                setFocusState(true);
                if (props.onFocus) {
                  props.onFocus(e);
                }
              }}
              onBlur={(e) => {
                // field.onBlur;
                setFocusState(false);
                if (props.onBlur) {
                  props.onBlur(e);
                }
              }}
              isDisabled={props.isDisabled}
              onInputChange={handleInputChange}
              getOptionValue={(option) => option[props.showLabel || "label"]} // changes here!!!
              style={customStyles}
              onMenuClose={() => onCrossHandler()}
              isOptionDisabled={(option) => option.disabled}
              isMulti={isMulti}
              {...others}
            />
          </>
        )}
      />
      {props.rules && err && props.rules && err?.message ? (
        <p className=" fs-6 p-1 text-danger" id="email-error">
          {props.rules && err && props.rules && err?.message}
        </p>
      ) : (
        ""
      )}
    </div>
  );
});

ReactSelectField.displayName = "ReactSelectField";
ReactSelectField.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderTopLeftRadius: PropTypes.string,
  borderBottomLeftRadius: PropTypes.string,
  borderTopRightRadius: PropTypes.string,
  borderBottomRightRadius: PropTypes.string,
  CustomOption: PropTypes.string,
  getOptionLable: PropTypes.func,
  padding: PropTypes.number,
  getOptionLabel: PropTypes.func,
  optionData: PropTypes.array,
  showLabel: PropTypes.bool,
  isLoading: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  customStyles: PropTypes.object,
  showLabel: PropTypes.bool,
  placeHolder: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  errors: PropTypes.object,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.bool,
  onFocus: PropTypes.bool,
  ellipses: PropTypes.bool,
  capitalize: PropTypes.bool,
  name: PropTypes.string.isRequired,
  menuPlacement: PropTypes.string,
  isHighLight: PropTypes.string,
  onInputChange: PropTypes.func,
  handleSelectOption: PropTypes.func,
  rules: PropTypes.object.isRequired,
  control: PropTypes.object.isRequired, // Added 'control' prop type validation
  min: PropTypes.number, // Added 'min' prop type validation
  isDisabled: PropTypes.bool, // Added 'isDisabled' prop type validation
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default ReactSelectField;
