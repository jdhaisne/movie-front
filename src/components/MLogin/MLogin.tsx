import { MButton } from "../MButton/MButton";
import { MInput } from "../Minput/MInput";
import { SubmitHandler } from "react-hook-form";
import { MForm } from "../MForm/MForm";
import "./MLogin.scss";

type Inputs = {
  Mail: string;
  Password: string;
};

const defaultValues: Inputs = {
  Mail: "",
  Password: "",
};

export const MLoginForm = () => {
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
    <MForm<Inputs>
      title="login"
      className="login"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    >
      <MInput
        className="login__text"
        label="mail"
        id="mail"
        type="text"
        placeholder=""
        name="mail"
      ></MInput>
      <MInput
        className="login__text"
        label="password"
        id="password"
        type="password"
        placeholder=""
        hasLabel={true}
        name="password"
      ></MInput>
      <MButton>Connexion</MButton>
    </MForm>
  );
};
