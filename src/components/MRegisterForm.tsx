import { mailValidation } from "../validation/mailValidation";
import { nameValidation } from "../validation/nameValidation";
import { passwordValidation } from "../validation/passwordValidation";
import { dobValidation } from "../validation/dobValidation";
import { MButton } from "./MButton";
import { MInput } from "./MInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Mselect } from "./MSelect";

type Inputs = {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  confirmPassword: string;
};

export const MRegisterForm = () => {
  const methods = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      mail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("register with:", data);
  };
  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <MInput
            label="first name"
            id="firstName"
            type="text"
            placeholder=""
            hasLabel={true}
            name="firstName"
            {...nameValidation}
          ></MInput>
          <MInput
            label="last name"
            id="lastName"
            type="text"
            placeholder=""
            hasLabel={true}
            name="lastName"
            {...nameValidation}
          ></MInput>
          <MInput
            label="mail"
            id="mail"
            type="text"
            placeholder=""
            hasLabel={true}
            {...mailValidation}
          ></MInput>
          <MInput
            label="password"
            id="password"
            type="password"
            placeholder=""
            hasLabel={true}
            {...passwordValidation}
          ></MInput>
          <MInput
            label="confirm password"
            id="confirmPassword"
            type="password"
            placeholder=""
            hasLabel={true}
            name="confirm"
            validation={{
              ...passwordValidation.validation,
              // validate: {                   DONT WORK TO BE DONE
              //   value: (val: string) => {
              //     methods.watch("password")[0] == val || "password does not +";
              //   },
              //   message: "macthes",
              // },
            }}
          ></MInput>
          <MInput
            label="birth date"
            id="birthDate"
            type="date"
            placeholder=""
            hasLabel={true}
            {...dobValidation}
          ></MInput>
          {/* <Mselect>
            <option>director</option>
            <option>member</option>
          </Mselect> */}
        </form>
      </FormProvider>
    </div>
  );
};
