import { useFormContext } from "react-hook-form";

import { findInputError } from "../../utils/findInputError";
import { isFormInvalid } from "../../utils/isFormValid";

export const MInput = ({
  label,
  id,
  type,
  placeholder,
  hasLabel,
  validation,
  name,
}: {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  hasLabel?: boolean;
  validation: any;
  name: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  console.log(name, errors);
  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);
  return (
    <>
      <div>
        {" "}
        {hasLabel ? (
          <div>
            <label htmlFor={id}>{label}</label>
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
  return <p>error:{message}</p>;
};
