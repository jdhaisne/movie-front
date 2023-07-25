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
    console.log("e", otherUserId);
    if (id && !otherUserId) {
      const userData = localStorage.getItem("user");
      if (userData) setUserData(JSON.parse(userData));
    }
  }, []);

  console.log("mu", userData);
  return (
    <div className="global">
      <div className="global2">
        <p className="title">User Infos</p>
        <div className="userInfo">
          <div className="userFirstName">
            <p className="firstNameM">First name :&nbsp; </p>
            <p className="firstName">{userData.firstName}</p>
          </div>
          <div className="userLastName">
            <p className="lastNameM">Last name :&nbsp; </p>
            <p className="lastName">{userData.lastName}</p>
          </div>
          <div className="userMail">
            <p className="mailNameM">Mail :&nbsp; </p>
            <p className="mailName">{userData.mail}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
