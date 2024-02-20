import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import InputColor from "react-input-color";

const ReactColorInput = React.forwardRef((props, ref) => {
  const {
    title,
    style,
    label,
    type,
    errors,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    menuPlacement,
    ellipses,
    value,
    ...others
  } = props;
  const { field, fieldState, formState } = useController(props);
  const [color, setColor] = useState({});
  console.log("🚀 ~ ReactTagInputComponent ~ color:", field);

  let err = _.get(errors, props.name);
  const handleOnChange = (value) => {
    // field.onChange(value);
    setColor(value);
    field.onChange(value.hex);
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
            <div>
              <InputColor
                initialValue="#5e72e4"
                onChange={handleOnChange}
                placement="bottom"
                name={field.name}
                className="position-absolute "
                style={{ height: "38px" }}
              />
              {/* <div
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 20,
                  backgroundColor: color.rgba,
                }}
              /> */}
              <input
                className="form-control"
                style={{ paddingLeft: "70px" }}
                type="text"
                name={field.name}
                value={color.hex}
              />
            </div>
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

ReactColorInput.displayName = "ReactColorInput";
export default ReactColorInput;
