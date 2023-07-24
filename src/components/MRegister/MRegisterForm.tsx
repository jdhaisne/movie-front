import { mailValidation } from "../../validation/mailValidation";
import { nameValidation } from "../../validation/nameValidation";
import { passwordValidation } from "../../validation/passwordValidation";
import { dobValidation } from "../../validation/dobValidation";
import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler } from "react-hook-form";

import "./MRegister.scss";
import { MForm } from "../MForm/MForm";
import { Mselect } from "../MSelect/MSelect";
import { NavLink } from "react-router-dom";

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
      });
      console.log("test23");
    } catch (error) {}

    if (res.ok) {
      alert("Inscription réussie ! Connectez-vous pour explorer Movie Talk. ");
      resetForm();
    }
    console.log(res);
  };

  const resetForm = () => {
    const formInputs = document.querySelectorAll(".register__text");
    formInputs.forEach((input) => (input.value = ""));

    // Réinitialiser la valeur de l'input du Mselect (s'il est utilisé comme un champ du formulaire)
    const selectInput = document.getElementById("profil");
    if (selectInput) {
      selectInput.value = "Director"; // Remettez la valeur par défaut de l'option souhaitée
    }
    const birthDateInput = document.getElementById("birthDate");
    if (birthDateInput) {
      birthDateInput.value = "jj/mm/aaaa"; // Remettez la valeur par défaut de l'option souhaitée
    }
  };

  return (
    <MForm<Inputs>
      className="register"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      <p className="register__title">
        Please, fill this form to register.{" "}
        <NavLink to="/login">Already an account ? sign in here.</NavLink>
      </p>
      <div className="border">
        <div className="register__input-group">
          <label className="register__label" htmlFor="firstName">
            First Name:
          </label>
          <MInput
            className=" register__text"
            id="firstName"
            type="text"
            placeholder=""
            name="firstName"
            {...nameValidation}
          />
        </div>

        <div className="register__input-group">
          <label className="register__label" htmlFor="lastName">
            Last Name:
          </label>
          <MInput
            className="register__text"
            id="lastName"
            type="text"
            placeholder=""
            name="lastName"
            {...nameValidation}
          />
        </div>

        <div className="register__input-group">
          <label className="register__label" htmlFor="mail">
            Mail:
          </label>
          <MInput
            className="register__text"
            id="mail"
            type="text"
            placeholder=""
            hasLabel={true}
            {...mailValidation}
          />
        </div>

        <div className="register__input-group">
          <label className="register__label" htmlFor="password">
            Password:
          </label>
          <MInput
            className="register__text"
            id="password"
            type="password"
            placeholder=""
            hasLabel={true}
            {...passwordValidation}
          />
        </div>

        <div className="register__input-group">
          <label className="register__label" htmlFor="confirmPassword">
            Confirm Password:
          </label>
          <MInput
            className="register__text"
            id="confirmPassword"
            type="password"
            placeholder=""
            hasLabel={true}
            name="confirm"
            validation={{
              ...passwordValidation.validation,
            }}
          />
        </div>

        <div className="register__input-group">
          <label className="register__label" htmlFor="birthDate">
            Birth Date:
          </label>
          <MInput
            className="register__text"
            id="birthDate"
            type="date"
            placeholder=""
            hasLabel={true}
            {...dobValidation}
          />
        </div>

        <div className="register__input-group">
          <label className="register__label" htmlFor="profil">
            Profil:
          </label>
          <Mselect id="profil">
            <option>Director</option>
            <option>Member</option>
          </Mselect>
        </div>

        <MButton>Register</MButton>
      </div>
    </MForm>
  );
};
