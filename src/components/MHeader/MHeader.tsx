import { MButton } from "../MButton/MButton";
import { NavLink } from "react-router-dom";

import "./MHeader.scss";

export const MHeader = () => {
  return (
    <div className="header">
      <h1 className="header__title">social movie</h1>
      <NavLink to={"/register"} className="header__link">
        login/register
      </NavLink>
    </div>
  );
};
