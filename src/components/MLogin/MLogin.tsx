import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler } from "react-hook-form";
import { MForm } from "../MForm/MForm";
import "./MLogin.scss";
import { Form, Input, Button, DatePicker, Select } from "antd";
import { useRef } from "react";
import { mailValidation } from "../../validation/mailValidation";
type Inputs = {
  Mail: string;
  Password: string;
};

const defaultValues: Inputs = {
  Mail: "",
  Password: "",
};

export const MLoginForm = () => {
  const formRef = useRef();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("register with:", data);
    const url = `http://localhost:3000/user/signin`; // route du back
    const body = await JSON.stringify(data);
    let response = undefined;
    try {
      response = await fetch(url, {
        method: "POST",
        body: body,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.success) {
          // Connexion réussie
          console.log("Connexion réussie");

          // Récupération des informations utilisateur
          const user = responseData.user;

          // Stockage des informations de l'utilisateur dans le localStorage
          localStorage.setItem("id", user.id);
          localStorage.setItem("lastName", user.lastName);
          localStorage.setItem("firstName", user.firstName);
          localStorage.setItem("mail", user.mail);
          localStorage.setItem("role", user.role);
          localStorage.setItem("user", JSON.stringify(user));

          // Redirection vers une autre page, par exemple, la page d'accueil
          window.location.href = "/home";
          //Si utilisateur non trouvé ou mp incorrect
        } else if (responseData.message == "Utilisateur non enregistré") {
          alert("Utilisateur non enregistré");
        } else if (responseData.message == "Mot de passe incorrect") {
          alert("Mot de passe incorrect");
        }
      } else {
        // Gérer les erreurs de la requête
        console.error("Erreur de requête:", response.status);
      }
    } catch (error) {
      // Gérer les erreurs de la requête
      console.error("Erreur de requête:", error);
    }
  };

  return (
    <div className="login__wrapper">
      <Form
        title="login"
        className="login"
        onFinish={onSubmit}
        layout="vertical"
        style={{ maxWidth: "30%", width: "100%" }}
        ref={formRef}
      >
        <Form.Item
          label="mail"
          className="div-first"
          name="mail"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="password"
          className="div-first"
          name="password"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item></Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
};
