import React, { MouseEventHandler } from "react";

import classes from "./styles/TheButton.module.css";

type ButtonProps = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  height?: string;
  width?: string;
  disabled?: boolean;
};
export default function TheButton({
  label,
  onClick,
  height,
  width,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`${classes.btn} ${width}  ${
        disabled ? "opacity-20" : "opacity-100"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
