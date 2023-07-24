import { MRegisterForm } from "../../components/MRegister/MRegisterForm";
import "../../components/MRegister/MRegister.scss";
import { NavLink } from "react-router-dom";

export const MRegister = () => {
  return (
    <div className="register__wrapper">
      {/* <NavLink to="/login">Already an account ? sign in here.</NavLink> */}
      <MRegisterForm></MRegisterForm>
    </div>
  );
};
