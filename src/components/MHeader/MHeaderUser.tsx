import { useEffect, useState } from "react";
import { TUser } from "../../type";
import { NavLink, useNavigate } from "react-router-dom";

export const MHeaderUser = () => {
  const [user, setUser] = useState<TUser>({
    id: "",
    firstName: "",
    lastName: "",
    mail: "",
    birthday: "",
    isAdmin: false,
  });
  const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);
  useEffect(() => {
    const userLocale = localStorage.getItem("user");
    console.log(userLocale);
    if (userLocale) setUser(JSON.parse(userLocale));
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          setIsShowingMenu(!isShowingMenu);
        }}
      >
        <span>{`${user.firstName} ${user.lastName}`} &darr;</span>
      </div>
      <div className={isShowingMenu ? "header-menu--showing" : "header-menu "}>
        <NavLink className={"header-menu__link"} to={`/user/${user.id}`}>
          My profil
        </NavLink>
        <div
          className={"header-menu__link header-menu__link--last"}
          onClick={() => {
            localStorage.clear();
            navigate(0);
          }}
        >
          logout
        </div>
      </div>
    </>
  );
};
