import { NavLink } from "react-router-dom";
import { MLoginForm } from "../../components/MLogin/MLogin";
import "../../components/MLogin/MLogin.scss";

export const MLogin = () => {
  return (
    <div className="register__wrapper">
      <NavLink to="/register">Need an account ? sign up here.</NavLink>
      <MLoginForm></MLoginForm>
    </div>
  );
};
