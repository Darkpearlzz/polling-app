import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1">
        {label && (
          <label htmlFor={props.id} className="text-sm font-medium">
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={`border rounded-md p-2 ${
            error ? "border-red-500" : ""
          } ${className}`}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
