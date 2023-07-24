import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TUser } from "../../type";

import "./MUser.scss";
import { Descriptions } from "antd";

export const MUser = () => {
  const [userData, setUserData] = useState<TUser>({
    id: "",
    firstName: "",
    lastName: "",
    mail: "",
    birthday: "",
    isAdmin: false,
  });
  const id = localStorage.getItem("id");
  const { otherUserId } = useParams();
  useEffect(() => {
    if (id) {
      const userData = localStorage.getItem("user");
      if (userData) setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (otherUserId) {
      fetch(`http://localhoost:3000/user/${otherUserId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de la valeur par défaut :",
            error
          );
        });
    }
  }, [otherUserId]);
  console.log("mu", userData);
  return (
    // <div className="user__wrapper">
    //   {userData && (
    //     <>
    //       <h2>
    //         {userData.firstName} {userData.lastName}
    //       </h2>
    //       <div className="user__info">
    //         <table>
    //           <tbody>
    //             <tr>
    //               <td>firstname:</td>
    //               <td>{userData.firstName}</td>
    //             </tr>
    //             <tr>
    //               <td>lastname:</td>
    //               <td>{userData.lastName}</td>
    //             </tr>
    //             <tr>
    //               <td>mail:</td>
    //               <td>{userData.mail}</td>
    //             </tr>
    //             {/* <tr>
    //               <td>birthday:</td>
    //               <td>{userData.birthday}</td>
    //             </tr> */}
    //           </tbody>
    //         </table>
    //       </div>
    //     </>
    //   )}
    // </div>
    <div className="user">
      <Descriptions
        title={`${userData.firstName} ${userData.lastName}`}
        bordered
      >
        <Descriptions.Item label="firstname">
          {userData.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="lastname">
          {userData.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="mail">{userData.mail}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
