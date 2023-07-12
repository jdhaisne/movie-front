import { mailValidation } from "../../validation/mailValidation";
import { nameValidation } from "../../validation/nameValidation";
import { passwordValidation } from "../../validation/passwordValidation";
import { dobValidation } from "../../validation/dobValidation";
import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Mselect } from "../MSelect/MSelect";

import "./MRegister.scss";

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("register with:", data);
    const url = `http://localhost:3000/signup`;
    let res = {};
    const body = await JSON.stringify(data);
    // const body = data;
    console.log("body", body);
    try {
      res = await fetch(url, {
        method: "POST",
        body: body,
        mode: "cors",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
          "Access-Control-Allow-Origin": "*", // Update this based on your CORS requirements
        },
      });
    } catch (error) {}

    console.log(res);
  };
  return (
    <div className="register">
      <h1 className="register__title">Register</h1>
      <FormProvider {...methods}>
        <form
          className="register__form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <MInput
            className="register__text"
            label="first name"
            id="firstName"
            type="text"
            placeholder=""
            hasLabel={true}
            name="firstName"
            {...nameValidation}
          ></MInput>
          <MInput
            className="register__text"
            label="last name"
            id="lastName"
            type="text"
            placeholder=""
            hasLabel={true}
            name="lastName"
            {...nameValidation}
          ></MInput>
          <MInput
            className="register__text"
            label="mail"
            id="mail"
            type="text"
            placeholder=""
            hasLabel={true}
            {...mailValidation}
          ></MInput>
          <MInput
            className="register__text"
            label="password"
            id="password"
            type="password"
            placeholder=""
            hasLabel={true}
            {...passwordValidation}
          ></MInput>
          <MInput
            className="register__text"
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
          <MButton>Register</MButton>
        </form>
      </FormProvider>
    </div>
  );
};
