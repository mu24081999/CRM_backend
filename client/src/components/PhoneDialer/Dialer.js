import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./dialer.css";
import InputField from "../FormFields/InputField";
import { useForm } from "react-hook-form";
import { IoIosKeypad } from "react-icons/io";
import { MdOutlineContacts } from "react-icons/md";

const Dialer = () => {
  const {
    handleSubmit,
    // watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [inputValue, setInputValue] = useState("");
  const [isDial, setIsDial] = useState(true);

  const dialerClick = (type, value) => {
    console.log("dialerClick", type, value);
    console.log("🚀 ~ dialerClick ~ type:", type);
    if (type === "dial") {
      setInputValue((prevValue) => prevValue + value);
    } else if (type === "delete") {
      setInputValue((prevValue) =>
        prevValue.substring(0, prevValue.length - 1)
      );
    } else if (type === "clear") {
      setInputValue("");
    }
  };

  return (
    <div className="container" style={{ margin: "300px" }}>
      <Popup
        trigger={
          <button className="btn btn-icon btn-floating btn-primary btn-lg btn-rounded ">
            {" "}
            {<FaPhone />}
          </button>
        }
        position="bottom center"
      >
        {isDial && (
          <table id="dialer_table">
            <tr>
              <td>
                {/* <input
               type="number"
               className="form-control"
               placeholder="Number"
               value={inputValue}
             /> */}
                <div className="w-100 ">
                  <InputField
                    style={{ height: "70px", fontSize: "25px" }}
                    name="subject"
                    placeholder="Phone Number"
                    control={control}
                    errors={errors}
                    value={inputValue}
                  />
                </div>
              </td>
            </tr>
            <tr class="dialer_num_tr">
              <td class="dialer_num" onClick={() => dialerClick("dial", 1)}>
                <span>1</span>
                <span className="fs-6 px-3"></span>
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 2)}>
                2
                <span className=" px-2 text-light" style={{ fontSize: "12px" }}>
                  ABC
                </span>
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 3)}>
                3
                <span className=" px-2 text-light" style={{ fontSize: "12px" }}>
                  DEF
                </span>
              </td>
            </tr>
            <tr class="dialer_num_tr">
              <td class="dialer_num" onClick={() => dialerClick("dial", 4)}>
                4
                <span className=" px-2 text-light" style={{ fontSize: "12px" }}>
                  GHI
                </span>
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 5)}>
                5
                <span className=" px-2 text-light" style={{ fontSize: "12px" }}>
                  JKL
                </span>
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 6)}>
                6
                <span className=" px-2 text-light" style={{ fontSize: "12px" }}>
                  MNO
                </span>
              </td>
            </tr>
            <tr class="dialer_num_tr">
              <td class="dialer_num" onClick={() => dialerClick("dial", 7)}>
                7
                <span className=" px-1 text-light" style={{ fontSize: "12px" }}>
                  PQRS
                </span>
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 8)}>
                8
                <span className=" px-2 text-light" style={{ fontSize: "12px" }}>
                  TUV
                </span>
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 9)}>
                9
                <span className=" px-1 text-light" style={{ fontSize: "12px" }}>
                  WXYZ
                </span>
              </td>
            </tr>
            <tr class="dialer_num_tr">
              <td class="dialer_del_td">
                <img
                  alt="clear"
                  onClick={() => dialerClick("clear", "clear")}
                  src="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJlcmFzZXIiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWVyYXNlciBmYS13LTE2IGZhLTd4Ij48cGF0aCBmaWxsPSIjYjFiMWIxIiBkPSJNNDk3Ljk0MSAyNzMuOTQxYzE4Ljc0NS0xOC43NDUgMTguNzQ1LTQ5LjEzNyAwLTY3Ljg4MmwtMTYwLTE2MGMtMTguNzQ1LTE4Ljc0NS00OS4xMzYtMTguNzQ2LTY3Ljg4MyAwbC0yNTYgMjU2Yy0xOC43NDUgMTguNzQ1LTE4Ljc0NSA0OS4xMzcgMCA2Ny44ODJsOTYgOTZBNDguMDA0IDQ4LjAwNCAwIDAgMCAxNDQgNDgwaDM1NmM2LjYyNyAwIDEyLTUuMzczIDEyLTEydi00MGMwLTYuNjI3LTUuMzczLTEyLTEyLTEySDM1NS44ODNsMTQyLjA1OC0xNDIuMDU5em0tMzAyLjYyNy02Mi42MjdsMTM3LjM3MyAxMzcuMzczTDI2NS4zNzMgNDE2SDE1MC42MjhsLTgwLTgwIDEyNC42ODYtMTI0LjY4NnoiIGNsYXNzPSIiPjwvcGF0aD48L3N2Zz4="
                  width="22px"
                  title="Clear"
                />
              </td>
              <td class="dialer_num" onClick={() => dialerClick("dial", 0)}>
                0<span className="px-3"></span>
              </td>
              <td class="dialer_del_td">
                <img
                  alt="delete"
                  onClick={() => dialerClick("delete", "delete")}
                  src="data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhciIgZGF0YS1pY29uPSJiYWNrc3BhY2UiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNjQwIDUxMiIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWJhY2tzcGFjZSBmYS13LTIwIGZhLTd4Ij48cGF0aCBmaWxsPSIjREMxQTU5IiBkPSJNNDY5LjY1IDE4MS42NWwtMTEuMzEtMTEuMzFjLTYuMjUtNi4yNS0xNi4zOC02LjI1LTIyLjYzIDBMMzg0IDIyMi4wNmwtNTEuNzItNTEuNzJjLTYuMjUtNi4yNS0xNi4zOC02LjI1LTIyLjYzIDBsLTExLjMxIDExLjMxYy02LjI1IDYuMjUtNi4yNSAxNi4zOCAwIDIyLjYzTDM1MC4wNiAyNTZsLTUxLjcyIDUxLjcyYy02LjI1IDYuMjUtNi4yNSAxNi4zOCAwIDIyLjYzbDExLjMxIDExLjMxYzYuMjUgNi4yNSAxNi4zOCA2LjI1IDIyLjYzIDBMMzg0IDI4OS45NGw1MS43MiA1MS43MmM2LjI1IDYuMjUgMTYuMzggNi4yNSAyMi42MyAwbDExLjMxLTExLjMxYzYuMjUtNi4yNSA2LjI1LTE2LjM4IDAtMjIuNjNMNDE3Ljk0IDI1Nmw1MS43Mi01MS43MmM2LjI0LTYuMjUgNi4yNC0xNi4zOC0uMDEtMjIuNjN6TTU3NiA2NEgyMDUuMjZDMTg4LjI4IDY0IDE3MiA3MC43NCAxNjAgODIuNzRMOS4zNyAyMzMuMzdjLTEyLjUgMTIuNS0xMi41IDMyLjc2IDAgNDUuMjVMMTYwIDQyOS4yNWMxMiAxMiAyOC4yOCAxOC43NSA0NS4yNSAxOC43NUg1NzZjMzUuMzUgMCA2NC0yOC42NSA2NC02NFYxMjhjMC0zNS4zNS0yOC42NS02NC02NC02NHptMTYgMzIwYzAgOC44Mi03LjE4IDE2LTE2IDE2SDIwNS4yNmMtNC4yNyAwLTguMjktMS42Ni0xMS4zMS00LjY5TDU0LjYzIDI1NmwxMzkuMzEtMTM5LjMxYzMuMDItMy4wMiA3LjA0LTQuNjkgMTEuMzEtNC42OUg1NzZjOC44MiAwIDE2IDcuMTggMTYgMTZ2MjU2eiIgY2xhc3M9IiI+PC9wYXRoPjwvc3ZnPg=="
                  width="25px"
                  title="Delete"
                />
              </td>
            </tr>
            <tr>
              <td colspan="p-3">
                <button className="btn btn-primary rounded-pill btn-lg">
                  Call
                </button>
                <div className="w-100 d-flex flex-wrap gap-2">
                  <p className="fs-6 pt-3">Call From</p>
                  <InputField
                    name="subject"
                    placeholder="Phone Number"
                    control={control}
                    errors={errors}
                    value={inputValue}
                  />
                </div>
              </td>
            </tr>
          </table>
        )}
        <footer className="w-100 d-flex p-1 gap-1">
          <button type="button" class="btn btn-primary btn-lg ">
            <MdOutlineContacts />
            Contacts
          </button>
          <button
            type="button"
            class="btn btn-primary btn-lg w-50"
            onClick={() => setIsDial(!isDial)}
          >
            <IoIosKeypad className="mb-1" />
            Dial
          </button>
        </footer>
      </Popup>
    </div>
  );
};

export default Dialer;
