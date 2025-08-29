import React from "react";

type InputProps = React.ComponentProps<"input">;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className = "", ...rest } = props;
  return (
    <input
      ref={ref}
      {...rest}
      className={`px-3 py-2 border rounded-md focus:outline-none ${className}`}
    />
  );
});

Input.displayName = "Input";
export default Input;
