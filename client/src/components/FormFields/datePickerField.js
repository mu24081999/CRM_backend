import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import "./DatePickerStyles.css";
import { FaCalendarAlt } from "react-icons/fa";

const DatePickerFeild = React.forwardRef((props, ref) => {
  const [focusState, setFocusState] = useState(false);
  const [newDate, setNewDate] = useState("");
  const {
    title,
    label,
    showTime,
    style,
    type,
    errors,
    defaultValue,
    isDisabled,
    dateTime = true,
    customStyles,
    onChange,
    maxDate,
    isHighLight = false,
    showYearPicker,
    ...others
  } = props;
  const { field, fieldState } = useController(props);
  let err = _.get(errors, props.name);

  return (
    <div className="mb-5">
      <Controller
        autoFocus={false}
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field }) => {
          function validDate(x) {
            let y = new Date(x);
            return y instanceof Date && !isNaN(y);
          }
          let updateDate = new Date(field?.value);
          if (!validDate(field?.value)) {
            updateDate = "";
          }
          return (
            <>
              <label
                for={props?.name}
                className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                {label}
              </label>
              <DatePicker
                {...field}
                ref={ref}
                autoComplete="off"
                showIcon={true}
                // icon={<FaCalendarAlt />}
                isClearable
                showTimeSelect={showTime}
                shouldCloseOnSelect
                autoFocus={false}
                onChange={(e) => {
                  field.onChange(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                  setNewDate(moment(e).format("YYYY-MM-DD HH:mm:ss"));
                  if (onChange) {
                    onChange(e, props?.name);
                  }
                }}
                selected={updateDate}
                //new change for handling reset (start)
                value={newDate}
                //(end)
                onFocus={() => setFocusState(true)}
                onBlur={() => {
                  field.onBlur;
                  setFocusState(false);
                }}
                dateFormat={showYearPicker ? "yyyy" : "yyyy-MM-dd HH:mm:ss"}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  isDisabled ? "opacity-50" : ""
                }                     ${
                  isHighLight && " focus:bg-highLight   "
                }                `}
                placeholderText={
                  props.placeholder ? props.placeholder : "Select a DateTime"
                }
                disabled={isDisabled}
                maxDate={props?.maxDate}
                minDate={props?.minDate}
                // placeholderText="Select a date"
                showYearPicker={showYearPicker ? showYearPicker : false}
                {...others}
              />
            </>
          );
        }}
      />
      {/* </div> */}
      {props.rules && err && (
        <p className=" text-xs text-red-600 h-3 m-2" id="email-error">
          {props.rules && err && props.rules && err.message}
        </p>
      )}
    </div>
  );
});

DatePickerFeild.displayName = "DatePickerFeild";
DatePickerFeild.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  showTime: PropTypes.bool,
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
  dateTime: PropTypes.bool,
  showYearPicker: PropTypes.bool,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
  placeholder: PropTypes.string, // Added 'placeholder' prop type validation
};
export default DatePickerFeild;
