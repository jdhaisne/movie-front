import { useEffect, useState } from "react";
import { TUser } from "../../type";

export const MHeaderUser = () => {
  const [user, setUser] = useState<TUser>({
    id: "",
    firstName: "",
    lastName: "",
    mail: "",
    birthday: "",
    isAdmin: false,
  });
  useEffect(() => {
    const userLocale = localStorage.getItem("user");
    console.log(userLocale);
    if (userLocale) setUser(Object(userLocale));
  }, []);
  return (
    <div>
      <span>{`${user.firstName} ${user.lastName}`}</span>
    </div>
  );
};
