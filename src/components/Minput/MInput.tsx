import { useFormContext } from "react-hook-form";

import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormValid";

import "./Minput.scss";
export const MInput = ({
  className,
  label,
  id,
  type,
  placeholder,
  hasLabel,
  validation,
  name,
}: {
  className?: string;
  label: string;
  id: string;
  type: string;
  placeholder: string;
  hasLabel?: boolean;
  validation?: any;
  name: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);
  return (
    <>
      <div>
        {" "}
        {hasLabel ? (
          <div>
            <label className="input__label" htmlFor={id}>
              {label}
            </label>
          </div>
        ) : (
          <></>
        )}
        {isInvalid && (
          <InputError
            message={inputError.error.message}
            key={inputError.error.message}
          />
        )}
        <input
          className={"input " + className}
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
      </div>
    </>
  );
};

const InputError = ({ message }: { message: string }) => {
  return <p className="input__error">error:{message}</p>;
};
