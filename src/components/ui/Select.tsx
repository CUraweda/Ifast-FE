import { Option } from "@/type/comon";
import { forwardRef, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { Message } from "./error.field";
import { FieldError } from "react-hook-form";

type SelectProps = {
  data: Array<Option>;
  error?: string | FieldError;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { data, defaultValue, placeholder, className, error, ...rest },
    ref
  ) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="w-full">
        <select
          ref={ref}
          className={twMerge("select select-bordered w-full", className)}
          defaultValue={defaultValue ?? ""}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data?.map((item: Option ) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <Message isError={Boolean(errorMessage)} message={errorMessage} />
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;