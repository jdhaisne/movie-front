import { useParams, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { TUser } from "../../type";
import { Descriptions } from "antd";

export const MOtherUser = () => {
  const [userData, setUserData] = useState<TUser>({
    id: "",
    firstName: "",
    lastName: "",
    mail: "",
    birthday: "",
    isAdmin: false,
  });
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/user/${id}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUserData(data);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la valeur par défaut :",
          error
        );
      });
  }, [id]);
  return (
    <>
      {" "}
      <div className="user">
        <div className="div-nav">
          <nav>
            <ul>
              <li>
                <NavLink to={`/user/${id}/suivi`} activeClassName="active">
                  Subscribed movies
                </NavLink>
              </li>
              <li>
                <NavLink to={`/user/${id}/CritiquesC`} activeClassName="active">
                  Reviews
                </NavLink>
              </li>
              <li>
                <NavLink to={`/user/${id}/Avis`} activeClassName="active">
                  Opinion
                </NavLink>
              </li>
              {/* <li>
                <NavLink to={`/user/${id}/contact`} activeClassName="active">
                  contact
                </NavLink>
              </li> */}
            </ul>
          </nav>
        </div>
        <div className="div-nav-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};
