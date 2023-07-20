import { mailValidation } from "../../validation/mailValidation";
import { nameValidation } from "../../validation/nameValidation";
import { passwordValidation } from "../../validation/passwordValidation";
import { dobValidation } from "../../validation/dobValidation";
import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler } from "react-hook-form";

import "./MRegister.scss";
import { MForm } from "../MForm/MForm";

type Inputs = {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
  confirmPassword: string;
};

const defaultValues: Inputs = {
  firstName: "",
  lastName: "",
  mail: "",
  password: "",
  confirmPassword: "",
};

export const MRegisterForm = () => {
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("register with:", data);
    const url = `http://localhost:3000/user/signup`;
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
      
      }
     )
     console.log('test23')} catch (error) {}

    console.log(res);
  };
  return (
    <MForm<Inputs>
      title="register"
      className="register"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
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
    </MForm>
  );
};
