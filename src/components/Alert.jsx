import { Icon } from "@iconify/react";
import React from "react";

const Alert = ({ error, text, index }) => {
  const topPosition = 16 + index * 80;
  return (
    <div
      className={`alert ${
        error ? "alert-error" : "alert-success"
      } fixed w-80 md:w-auto z-50 flex`}
      style={{ top: `${index ? topPosition : 16}px`, right: "10px" }}
    >
      <Icon
        icon={error ? "mingcute:alert-fill" : "icon-park-solid:success"}
        width={30}
      />
      <p>{text}</p>
    </div>
  );
};

export default Alert;
