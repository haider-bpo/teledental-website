import React from "react";
import Style from "./Step.module.css";
function Step({ title, description, icon }) {
  return (
    <div className={Style.hiw_box}>
      <span>{title}</span>
      <div>{description}</div>
    </div>
  );
}
export default Step;
