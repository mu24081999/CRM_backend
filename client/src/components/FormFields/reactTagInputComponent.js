import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import { TagsInput } from "react-tag-input-component";

const ReactTagInputComponent = React.forwardRef((props, ref) => {
  const [selected, setSelected] = useState([]);
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

  let err = _.get(errors, props.name);
  const handleOnChange = (value) => {
    // field.onChange(value);
    setSelected(value);
    field.onChange(value);
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
            <TagsInput
              {...field}
              {...others}
              ref={ref}
              value={selected}
              onChange={handleOnChange}
              name={props.name}
              placeHolder="input tags"
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

ReactTagInputComponent.displayName = "ReactTagInputComponent";
export default ReactTagInputComponent;
