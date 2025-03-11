import { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { Message } from "./error.field";

type PasswordProps = {
  className?: string;
  error?: string | FieldError;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Password = forwardRef<HTMLInputElement, PasswordProps>(
  ({ error, className, placeholder, ...rest }, ref) => {
    const [show, setShow] = useState(false);
    const isError = Boolean(error);
    const toggle = () => setShow((prev) => !prev);
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="w-full">
        <label
          className={twMerge("form-control w-full relative group", className)}
        >
          <input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            className={twMerge(
              `group input input-bordered flex items-center ${
                isError ? "border-red-600" : ""
              }`
            )}
            {...rest}
            ref={ref}
          />
          <div className="right-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2">
            {show ? (
              <RiEyeLine
                size={20}
                onClick={toggle}
                className="fill-slate-500 group-focus-within:fill-primary"
              />
            ) : (
              <RiEyeOffLine
                size={20}
                onClick={toggle}
                className="fill-slate-500 group-focus-within:fill-primary"
              />
            )}
          </div>
        </label>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Password.displayName = "Password";

export default Password;