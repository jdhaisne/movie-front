import { MButton } from "../MButton/MButton";
import { NavLink } from "react-router-dom";

import "./MHeader.scss";
import { useEffect, useState } from "react";
import { MHeaderUser } from "./MHeaderUser";

export const MHeader = () => {
  const [isLogged, setIsLogged] = useState<string>("");
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) setIsLogged(id);
  });
  return (
    <div className="header">
      <h1 className="header__title">social movie</h1>
      {isLogged && <MHeaderUser />}
      {!isLogged && (
        <NavLink to={"/register"} className="header__link">
          login/register
        </NavLink>
      )}
    </div>
  );
};
