import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export const MForm = <T extends FieldValues>({
  children,
  title,
  className,
  defaultValues,
  onSubmit,
}: {
  children: React.ReactNode;
  title: string;
  className: string;
  defaultValues: T;
  onSubmit: SubmitHandler<T>;
}) => {
  const methods = useForm<T>(defaultValues);
  return (
    <div className={"form__wrapper" + `${className}__wrapper`}>
      <h1 className={"from__title " + `${className}__title`}>{title}</h1>
      <FormProvider {...methods}>
        <form
          className={"form " + `${className}`}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormProvider>
    </div>
  );
};
