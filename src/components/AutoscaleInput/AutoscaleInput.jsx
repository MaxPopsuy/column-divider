import React, { useState, useRef, useEffect } from "react";
import styles from "./AutoscaleInput.module.scss";

const AutoscaleInput = ({handlerFn, value, type, placeholder}) => {
  const [width, setWidth] = useState(10);

  const changeHandler = (e) => {
    setWidth(e.target.value.length > 5 ? e.target.value.length * 2 : 10);
    handlerFn(e)
  };

  return (
    <input
      className={styles.input}
      style={{ width: width + "ch" }}
      value={value}
      type={type}
      placeholder={placeholder}
      autoFocus
      onChange={changeHandler}
    />
  );
};

export default AutoscaleInput;
